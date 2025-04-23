import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { userStore, executionGraphStore } from "@/recoil";
import {useRecoilValue} from "recoil"
import { workflowApi } from "@/lib/api/workflow";
import { IoIosCloseCircle } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";


export default function Toolbar({ workflow,setOpenLog}: any) {
  const currentUser = useRecoilValue(userStore);
  const executionGraph = useRecoilValue(executionGraphStore);
  const [name, setName] = useState<string>(workflow?.name);
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSave, setSave] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  console.log(workflow,"ww")
  useEffect(() => {
    setName(workflow?.name);
  }, [workflow?.id]);

  const editName = async () => {
    setEditing(true);
    try {
      const res = await workflowApi.EditName(name, workflow?.id);
      setEditing(false);
    } catch (e) {
      console.log(e);
      setEditing(false);
    }
  };

  const publish = async () => {
       setLoading(true);
    try {
      const res = await workflowApi.publishWorkflow(
        workflow?.name,
        executionGraph,
        workflow?.id
      );
     res&& setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };


  const run = async () => {
    setProcessing(true);
    // if(workflow?.executionGraph) return
    try {
      const res = await workflowApi.queueWorkflow(
        workflow?.executionGraph,
        workflow?.id,
        workflow?.assets
      );
      console.log(res,"res")
      res&&setProcessing(false);
      setOpenLog(true)
    } catch (e) {
      console.log(e);
      setProcessing(false);
    }
  };


  const saveChanges = async () => {
    setSave(true);
    try {
      const res = await workflowApi.saveChanges(workflow?.name,executionGraph, workflow?.id);
      setSave(false);
    } catch (e) {
      console.log(e);
      setSave(false);
    }
  };

  return (
    <div className="w-full flex px-10 py-8 border-b justify-between">
      <div className="flex w-1/2 ">
        <div className="flex items-center border-r-2 border-slate-700 px-4 ">
          <input
            className="w-36 border-0 outline-none"
            placeholder="Unnamed project"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {edit ? (
            <div className="flex space-x-2 items-center">
              <button
                className="text-xs border py-2 px-4 rounded-sm border-purple-500 font-semibold text-purple-500"
                onClick={editName}
              >
                {isEditing ? "Updating..." : "Update"}
              </button>
              <IoIosCloseCircle
                onClick={() => setEdit(false)}
                className="text-xl"
              />
            </div>
          ) : (
            <MdEdit
              className="text-gray-600 font-bold text-xl"
              onClick={() => setEdit(true)}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-6">
        <button className="text-sm bg-gray-200 px-4 py-2" onClick={saveChanges}>
          {isSave ? "Saving..." : "Save changes"}
        </button>
        {workflow?.publish ? (
          <button
            className="flex items-center bg-[#e6dffd] px-4 py-2 rounded-sm text-black text-sm space-x-2"
            onClick={run}
          > 
              {isProcessing ? "Processing..." : 
                       
                      <span>Run Queue</span>
              }
   
          </button>
        ) : (
          <button
            className="flex items-center bg-[#e6dffd] px-4 py-2 rounded-sm text-black text-sm"
            onClick={publish}
          >
            {isLoading ?"Publishing..." : "Pubish"}
          </button>
        )}

        {/* <BsThreeDotsVertical />  */}
      </div>
    </div>
  );
}
