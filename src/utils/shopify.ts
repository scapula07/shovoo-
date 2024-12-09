// utils/shopify.ts
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';



export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY as string,
  apiSecretKey: process.env.SHOPIFY_API_SECRET as string,
  scopes: ['read_products','write_products'], // Add your app's scopes
  hostName: '5480-2a09-bac5-4e01-be-00-13-2b6.ngrok-free.app',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false, // true for embedded apps

});
