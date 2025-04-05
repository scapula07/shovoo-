import React,{useState,useEffect} from 'react'
import { BiBadgeCheck } from "react-icons/bi";
import { VscPieChart } from "react-icons/vsc";
import { PiChartDonutDuotone } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link';
import { userStore } from '@/recoil';
import { useRecoilValue } from 'recoil';
import {workflowApi} from "../../lib/api/workflow"
import { useRouter } from "next/router";
import {
   doc,
   getDoc,
   setDoc,
   addDoc,
   collection,
   onSnapshot,
   query,
   where,
   orderBy,
 } from "firebase/firestore";
 import { db } from "@/firebase/config";
 import { MdDelete } from "react-icons/md";
import { Controls } from 'reactflow';


export default function Home() {
   const { replace } = useRouter();

   const currentUser=useRecoilValue(userStore)
   const [isLoading,setLoading]=useState(false)
   const create=async()=>{
        setLoading(true)
       try{
           const res:string=await workflowApi.create(currentUser)
           setLoading(false);
           replace(`/editor/${res}`);

        }catch(e){
         setLoading(false)
        }
   }
  return (
    <div className='h-full w-full '>
          <div className='bg-white w-full flex items-center justify-between px-10 py-10'>
                 <div className='flex flex-col w-full space-y-2'>
                      <h5 className='text-2xl font-bold'>Dashboard</h5>
                      <h5 className='text-slate-700'>Create & manage all of your automation workflows in one place. Learn more</h5>
                 </div>
                 <div className='w-1/4 justify-end flex'>
                      <Link href={"/editor/rty5643dtw2rbd6"}>
                         <button className='flex items-center bg-[#e6dffd] px-4 py-2 rounded-sm text-black text-sm font-bold'
                           onClick={()=>!isLoading&&create()}
                          >
                           {isLoading?
                            "Creating..."
                            :
                             "Create Workflow"
                           }
                          
                        </button>        
                      </Link>
                 
                 </div>   
          </div>

          <div className='w-full flex flex-col py-10 px-10'>
               <TaskMetrics currentUser={currentUser}/>

               <div className='w-full flex py-10 space-x-6'>
                   {/* <Folders /> */}
                   <RecentWorkflows currentUser={currentUser} create={create} />
               </div>
          </div>

    </div>
  )
}



const TaskMetrics=({currentUser}:any)=>{
     return(
        <div className='w-full flex space-x-8'>
            {[
               {
                label:'CREDITS ALLOTTED',
                value:currentUser?.totalCredits,
                icon:<BiBadgeCheck />,
                color:'text-yellow-600',
                bg:'bg-yellow-100'
               },
               {
                label:'CREDITS CONSUMED',
                value:currentUser?.usedCredits,
                icon:<VscPieChart />,
                color:'text-blue-600',
                 bg:'bg-blue-100'
               },
               {
                label:'CREDITS REMAINING',
                value:currentUser?.totalCredits -currentUser?.usedCredits,
                icon:<PiChartDonutDuotone />,
                color:'text-green-600',
                bg:'bg-green-100'
               }
             ].map((item)=>{
                return(
                  <div className='bg-white rounded-lg rounded-sm flex px-6 py-4 items-center space-x-2 shadow border hover:border-purple-500'>
                       <h5 className={`text-2xl ${item?.color} ${item?.bg}  rounded-full h-10 w-10 flex items-center justify-center`}>
                            {item?.icon}
                       </h5>
                       <h5 className='flex flex-col'>
                          <span className='font-bold'>{item?.label}</span>
                          <span className='font-bold'>{item?.value}</span>
                       </h5>    
                  </div>
                )
            })

            }
        </div>
     )
}




const Folders=()=>{
     return(
        <div className='w-1/3 bg-white h-44 '>
             <div className='flex items-center justify-between  border-b border-purple-200 px-4 py-3'>
                    <h5 className='font-bold text-lg'>Folders</h5>
                    <h5 className='border border-purple-600 h-6 w-6 flex items-center justify-center rounded-lg'>
                        <FaPlus className=''/>
                    </h5>
             </div>

             <div className='flex flex-col py-3'>
                {[
                   {
                     label:"Active",
                     value:0
                   },
                   {
                    label:"Trash",
                    value:0
                  }
                  ].map((item)=>{
                     return(
                       <div className='flex items-center hover:border-l-2 text-gray-600 text-sm border-purple-300 hover:bg-[#e6dffd] hover:font-semibold hover:text-purple-600 py-2 px-4 hover:'>
                           <h5>{item?.label} ({item?.value})</h5>
                       </div>
                     )
                })

                }

             </div>

        </div>
     )
}


const RecentWorkflows=({currentUser,create}:any)=>{
   const [workflows, setWorkflows] = useState([]);

   useEffect(() => {
     workflowApi
       .getGateways(currentUser?.id)
       .then((res: any) => {
         setWorkflows(res);
       })
       .catch();
   });

   console.log(workflows,"w")
 
    return(
       <div className='w-[80%] bg-white'>
            <div className='flex items-center justify-between border-b border-purple-200 px-4 py-3 w-full'>
                    <h5 className='font-bold text-lg'>Home</h5>
             </div>

             <div className='w-full flex px-4 py-4 space-x-6 items-center'>
                <img 
                  src={'/assets/workflow.png'}
                />
                {workflows?.length ==0?
                       <div className='flex flex-col space-y-4'>
                             <h5 className='text-2xl font-bold'>No workflows found!</h5>
                             <button className='flex items-center bg-[#e6dffd] px-3 py-2 rounded-sm text-black text-sm font-bold space-x-2'
                               onClick={create}
                               >
                                   <FaPlus />
                                   <span> Add a workflow</span>
                             </button>        
                         </div>
                         :
                         <div className='flex flex-col space-y-4 w-full'>
                             {workflows?.map((w)=>{
                                return(
                                   <Workflow w={w} />
                                )
                             })

                             }
                         </div>

                }
       

             </div>

       </div>
    )
}


const Workflow=({w}:any)=>{
   const date = new Date(w?.createdAt?.seconds * 1000);
   const formattedDate = date.toLocaleString();
   const [loading,setLoading]=useState(false)

   const deleteWorkflow=async()=>{
        try{
           setLoading(true)
           const res =await workflowApi.deleteWorkflow(w?.id)
           setLoading(false)
        }catch(e){
            console.log(e)
            setLoading(false) 
        }
   }
    return(
        <div className='flex w-full hover:bg-purple-100 cursor justify-between items-center border-b px-4 py-2 border-purple-400'>
         <Link href={`/editor/${w?.id}`} className="w-full">
           <div className='flex flex-col   w-full'>
                <h5 className='text-lg'>{w?.name}</h5>
                <h5 className='text-xs'>{formattedDate}</h5>
             </div>
         </Link>
      
             {loading?
                "Deleting"
                :
                <MdDelete className='text-xl text-red-600' onClick={deleteWorkflow}/>
             }
         
        </div>
    )
}