import React,{useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import {authApi} from "../../lib/api/auth"
import { useRouter } from "next/router";

export default function Auth() {
      const [isLoading, setLoading] = useState<boolean>(false);
      const [errorMsg,setErrorMessage]=useState(null)

    const { replace } = useRouter()
      const signup=async()=>{
         try{
            const res= await authApi.googleAuth()
            console.log(res,"r")
            localStorage.clear();
            localStorage.setItem('user',JSON.stringify(res));
            res&&setLoading(false)
            replace('/app/home')
         }catch(e:any){
          console.log(e)
          setErrorMessage(e.message)
         }
      }

      const login=async()=>{
        try{
           const res= await authApi.googleLogin()
           console.log(res,"r")
           localStorage.clear();
           localStorage.setItem('user',JSON.stringify(res));
           res&&setLoading(false)
           replace('/app/home')
        }catch(e:any){
         console.log(e)
         setErrorMessage(e.message)
        }
     }
  return (
    <div className='w-full h-screen flex items-center justify-center '
       style={{background: "rgba(242, 242, 242, 0.6)"}}>
         <h5 className='font-semibold poppins-bold text-6xl'>Shovoo<span className=' text-[#a42569] rounded-full'>!</span></h5>
        <div className='w-1/2 flex justify-center'>
            <div className='w-4/5 flex bg-white rounded-lg  border flex-col items-center py-8 space-y-6 ' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold '>Register</h5>
                  {errorMsg && <div className='px-8 py-1 '>
                    <p className='text-red-600'>{errorMsg}</p>
                        
                    </div>
                  }
      
                    <button className='flex items-center space-x-6 px-4 w-2/5 border py-3 rounded-lg cursor '
                      onClick={signup}
                     >
                             <FcGoogle />
                             <h5 className="font-light text-sm">Sign up with Gmail</h5>

                    </button>
       


                 <div className='flex flex-col space-y-4 items-center w-full'>
                    <h5 className='h-0.5  w-1/3 text-black border '></h5>
                    <div className='flex flex-col space-y-2 items-center w-full'>
                      <h5>Already have an account?</h5>
             
                        <button className='border border-blue-700 text-blue-700 rounded-full px-10 py-1' onClick={login}>Log in with Gmail</button>
                    </div>
                 </div>
            </div>
       </div>
    </div>

  )
}
