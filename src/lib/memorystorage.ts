// lib/memoryStore.js
const sessionStore = {} as any;

// Add a helper to interact with the store
const memoryStore = {
  storeSession: (id:string, session:any) => {
    sessionStore[id] = session;
  },
  getSession: (id:string) => {
    return sessionStore[id] || null;
  },
  deleteSession: (id:string) => {
    delete sessionStore[id];
  },
};


console.log(sessionStore,"store")
export default memoryStore;
