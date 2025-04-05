import { Txt2imgInput,GenerationOutput,ImageToTextOutput,ImageToImageOutput } from "./types";
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

export class SDAPI {
    public async txt2img(prompt: string): Promise<GenerationOutput> {
        const url = 'https://dream-gateway.livepeer.cloud/text-to-image';
        const text= prompt?.length>0?prompt :'Livepeer AI'
        const body:Txt2imgInput = {
            model_id:process.env.MODEL_ID as string,
            prompt:text,
            guidance_scale: 2,
            width: 1024 ,
            height: 512,
            safety_check:true,
            num_inference_steps: 6,
            num_images_per_prompt: 2,
          };
        try {
              const response = await axios.post(url,body, {
                headers: {
                  'Authorization': `Bearer <token>`, 
                  'Content-Type': 'application/json',
                },
                timeout: 40000
              });
              const data = response.data;     
              if (data && data.images) {
                return {
                  id: data.id,
                  status: data.status,
                  outputs: data.images.map((item: { url: string, nsfw: boolean, seed?: number }, index: number) => ({
                    id: `${data.id}:${index}`,
                    url: item.url,
                    nsfw: item.nsfw,
                    seed: item.seed
                  }))
                };
              } else {
                throw new Error('Empty data');
              }    
            }catch(error){
                let errorMessage = 'Unknown error';
                if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data;
                errorMessage = data.error?.message || '';
                }
                throw new Error(`Provider Error: ${errorMessage}`);
        
           }
      
       }
     public async imageToText(file: File | Blob): Promise<ImageToTextOutput> {
        const url = 'https://dream-gateway.livepeer.cloud/image-to-text';
        const model_id = 'Salesforce/blip-image-captioning-large';
    
        const form = new FormData();
        form.append('model_id', model_id);
        form.append('image', file);
    
        try {
          const response = await axios.post(url, form, {
            headers: {
              'Authorization': `Bearer <token>`, // optional
            },
            timeout: 40000,
          });
    
          const data = response.data;
          console.log(data,"data")
          if (data && data.caption) {
            return {
              id: data.id,
              status: data.status,
              caption: data.caption,
            };
          } else {
            throw new Error('Empty response data');
          }
        } catch (error:any) {
          let errorMessage = 'Unknown error';
          if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data;
            errorMessage = data.error?.message || '';
          }
           throw new Error(`Provider Error: ${error.message}`);
        }
      }

      public async imageToImage(file: File | Blob, prompt: string): Promise<ImageToImageOutput> {
        const url = 'https://dream-gateway.livepeer.cloud/image-to-image';
        const model_id = 'timbrooks/instruct-pix2pix';
    
        const form = new FormData();
        form.append('model_id', model_id);
        form.append('image', file);
        form.append('prompt', prompt);
    
        try {
          const response = await axios.post(url, form, {
            headers: {
              'Authorization': `Bearer <token>`, // optional
            },
            // timeout: 40000,
          });
    
          const data = response.data;
          console.log(data,"dats")
          if (data && data.images) {
            return {
              id: data.id,
              status: data.status,
              outputs: data.images.map((item: { url: string, nsfw?: boolean, seed?: number }, index: number) => ({
                id: `${data.id}:${index}`,
                url: item.url,
                nsfw: item.nsfw,
                seed: item.seed,
              })),
            };
          } else {
            throw new Error('Empty response data');
          }
        } catch (error:any) {
            console.log(error,"error")
          let errorMessage = 'Unknown error';
          if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data;
            errorMessage = data.error?.message || '';
          }
          throw new Error(`Provider Error: ${error?.message}`);
        }
      }
 }