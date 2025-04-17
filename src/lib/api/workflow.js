"use server";

import { tasks, configure } from "@trigger.dev/sdk/v3";
import { getPersistedImages } from "@/utils";

configure({
  secretKey: "tr_dev_aAfM9y7tQgO2RqcXnwFE",
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
  publishWorkflow: async function (executionGraph, id) {
    const files = await getPersistedImages();
    if (files.length === 0) {
      throw new Error("No images found");
    } else {
      try {
        const ref = doc(db, "workflows", id);
        const docSnap = await getDoc(ref);
        await updateDoc(doc(db, "workflows", id), {
          executionGraph,
          publish: true,
        });

        await tasks.trigger("process-image-workflow", {
          executionGraph,
          userId: id,
          files,
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
};
