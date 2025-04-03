import {atom} from "recoil"

export const userStore=atom({
   key:"userStore",
   default:{} 
})


export const executionGraphStore=atom({
   key:"gatewayStore",
   default:{}
})