import {
    createUserWithEmailAndPassword,
     signInWithEmailAndPassword ,
     GoogleAuthProvider,
     signInWithPopup,
     sendPasswordResetEmail,
     signOut,} from "firebase/auth";
    
import { doc,getDoc,setDoc,updateDoc }  from "firebase/firestore";
import {auth,db} from "../../firebase/config"

export const authApi= {

    googleAuth:async function (account) {
     console.log(account,"acccount")
    
       try{ 
             const provider = new GoogleAuthProvider();
             provider.addScope("https://www.googleapis.com/auth/userinfo.profile","email")
             const res =  await signInWithPopup(auth,provider)
             const credential = GoogleAuthProvider.credentialFromResult(res);
             const token = credential.accessToken;
             const user = res.user;
             console.log(user,"user....")
             const ref =doc(db,"users",user?.uid)
             const docSnap1 = await getDoc(ref);
             if(docSnap1.exists()){
                throw new Error("Email already used")
             }

             await setDoc(ref,{
                 id:user?.uid,
                 email:user?.email,
              })

           const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                return {
                    id:docSnap?.id,
                    ...docSnap?.data()
                 }
              }  
         }catch(e){
             console.log(e)
             throw new Error(e);
         }


     },

     resetEmail:async function (email) {
         try{
           const res=await sendPasswordResetEmail(auth, email)
           console.log(res,"ressss")
           return true
          }catch(e){
             console.log(e)
             throw new Error(e);
          }

     },
     googleLogin:async function () {
        try{

             const provider = new GoogleAuthProvider();
             const res =  await signInWithPopup(auth,provider)
             const credential = GoogleAuthProvider.credentialFromResult(res);
             const token = credential.accessToken;
             const user = res.user;
             const ref =doc(db,"users",user?.uid)

               const docSnap = await getDoc(ref);
               console.log(docSnap.data(),"user data")
                 if (docSnap.exists()) {          
                     const docUser = await getDoc(ref);
                     return {id:docUser?.id,...docUser?.data()}
           
                   } else {
                   throw new Error("You are not signed up")
                   console.log("No such document!");
                 }

          }catch(e){
         console.log(e)
         throw new Error(e)
          }

     },

}