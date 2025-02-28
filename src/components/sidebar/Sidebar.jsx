import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {

const [extended, setExtended] = useState(false);
const {onsend, previosPrompt, setRecentPrompt, newchat } = useContext(Context);

const loadPrompt = async (prompt) => {
  setRecentPrompt(prompt)
  await onsend(prompt)
  
}



  return (
    <div className="sidebar hidden   min-h-screen md:inline-flex flex-col justify-between bg-[#f0f4f9] py-6 px-4">
      <div className="top">
        <img onClick={()=> setExtended( prev => !prev )}
         src={assets.menu_icon} alt="" className="w-5  block ml-[10px] cursor-pointer "/>
        <div onClick={()=>newchat()}
         className="newchat mt-[50px] inline-flex items-center gap-[10px] py-2 px-4 bg-[#e6eaf1] rounded-[50px] text-sm text-gray-500 cursor-pointer">
          <img src={assets.plus_icon} alt="" className="w-5"/>
          {
            extended ? <p>New Chat</p> : null
          }
          
        </div>
        {
            extended ? (
                <div className="recent flex flex-col animate-fadeIn ">

                <p className="recent-title mt-[30px] mb-5 ">Recent</p>
                <div className="max-h-[50vh]  overflow-y-scroll hide-scrollbar">
                  {
                   previosPrompt.map((item, index) => (

                      <div onClick={()=> loadPrompt(item)}
                       className="recent-entry  flex items-start gap-[10px] p-[10px] pr-10  rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img src={assets.message_icon} alt="" className="w-5"/>
                    <p>{ item.length > 18 ? item.slice(0,18) +'...' : item }</p>
    
                </div>

                  ))
}
                </div>
                
              
    
            </div>

            ):null
        }
       
      </div>

      <div className="bottom flex flex-col ">
        <div className="bottom-item recent-entry flex items-start gap-[10px] p-[10px] pr-10  rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]
        ">
            <img src={assets.question_icon} alt="" className="w-5"/>
            {extended ? <p>Help</p>: null}
            
        </div>

        <div className="bottom-item recent-entry flex items-start gap-[10px] p-[10px] pr-10  rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
            <img src={assets.history_icon} alt="" className="w-5"/>
            {extended ?  <p>Acitivity</p>: null}

           
        </div>

        <div className="bottom-item recent-entry flex items-start gap-[10px] p-[10px] pr-10  rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
            <img src={assets.setting_icon} alt="" className="w-5"/>
            {extended ?   <p>Settings</p>: null}

           
        </div>

      </div>

    </div>
  );
};

export default Sidebar;
