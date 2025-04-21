"use server";

import { tasks, configure } from "@trigger.dev/sdk/v3";
import { getPersistedImages } from "@/utils";

configure({
  secretKey: "tr_dev_j0McrUUIiFQOtBokPDoH",
});

import { auth, db } from "@/firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  where,
  or,
  query,
  orderBy,
} from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


const uploadFile=async(file,workflowfile)=>{
  console.log("Uploading")
  const storage = getStorage();
  const fileId=Math.random().toString(36).substring(2,8+2);
  const storageRef = ref(storage, `/${fileId}`);
  console.log(storageRef,"shote")
  const snapshot=await uploadBytes(storageRef, file)

  return `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`

}


export const workflowApi = {
  create: async function (user) {
    try {
      const snap = await addDoc(collection(db, "workflows"), {
        name: "Untitled",
        user: user?.id,
        created: Number(new Date()),
        publish: false,
      });
      return snap?.id;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
  getGateways: async function (userId) {
    const instances = [];
    try {
      const q = query(
        collection(db, "workflows"),
        where("user", "==", userId),
        orderBy("created", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        instances.push({ ...doc.data(), id: doc.id });
      });

      return instances;
    } catch (e) {
      console.log(e);
    }
  },
  EditName: async function (name, id) {
    try {
      const ref = doc(db, "workflows", id);
      const docSnap = await getDoc(ref);
      await updateDoc(doc(db, "workflows", id), {
        name,
      });

      return true;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
  publishWorkflow: async function (workflowName,executionGraph, id) {
    const files = await getPersistedImages();
   
    if (files.length === 0) {
       throw new Error("No images found");
      } else {
        const workflowfile = `workflow_${workflowName}`; // or whatever naming you want
        const uploadedURLs = [];
    
        for (const file of files) {
          const url = await uploadFile(file, workflowfile);
          uploadedURLs.push(url);
        }
    
      try {
        const ref = doc(db, "workflows", id);
        const docSnap = await getDoc(ref);
        await updateDoc(doc(db, "workflows", id), {
          executionGraph,
          publish: true,
          assets: uploadedURLs, 
        });

        return true;
      } catch (e) {
        throw new Error(e.message);
      }
    }
    
  },
  saveChanges: async function (executionGraph, id) {
    try {
      const ref = doc(db, "workflows", id);
      const docSnap = await getDoc(ref);
      await updateDoc(doc(db, "workflows", id), {
        executionGraph,
      });
      return true;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
  deleteWorkflow: async function (id) {
    try {
      await deleteDoc(doc(db, "workflows", id));
      return true;
    } catch (e) {
      console.log(e);
    }
  },
  queueWorkflow: async function (executionGraph, id,assets) {
     const files = await getPersistedImages();
   
     if (files.length === 0) {
      throw new Error("No images found");
       } else {
       try{
           const handle = await tasks.trigger("process-image-workflow", {
                executionGraph,
                workflowId: id,
                files:assets,
              });
            await updateDoc(doc(db, "workflows", id), {
               runId:handle?.id,
               accessToken:handle?.publicAccessToken,
            });
            
            
              return handle;
            
            }catch(e){
              console.log(e);
          }
    }
  }
};
