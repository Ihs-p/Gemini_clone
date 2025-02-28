import { Children, createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()


const ContextProvider = ({children})=>{

    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [previosPrompt,setPreviosPrompt] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultData,setResultData] = useState("")


    const delayPara  = async (index,nextword) => {

        setTimeout(() => {
            setResultData(prev=>prev+nextword)
        }, 75*index );
        
    }

    const newchat = async () => {
        setLoading(false)
        setShowResult(false)


        
    }


    const onsend = async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response ;
        if(prompt !== undefined ){
            response = await run(prompt)
            setRecentPrompt(prompt)

        }else{

            setPreviosPrompt(prev => [...prev,input])
            setRecentPrompt(input)
            response = await run(input)
            
        }

        let responseArray = response.split("**")
        let newResponse ="";
        for(let i = 0; i < responseArray.length;i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i]
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }

        let newResponse2  = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i<newResponseArray.length;i++){
           const nextword = newResponseArray[i]
           delayPara(i,nextword+" ")
        }


        setLoading(false)
        setInput("")

    }


    // const onsend = async (prompt) => {
    //     setResultData("");
    //     setLoading(true);
    //     setShowResult(true);
    //     setRecentPrompt(prompt);
    //     setPreviosPrompt((prev) => [...prev, prompt]); // ✅ Correct state update
    
    //     const response = await run(prompt);
    //     setResultData(response);
    
    //     // ✅ Initialize newResponse
    //     let responseArray = response.split("**");
    //     let newResponse = "";
    
    //     for (let i = 0; i < responseArray.length; i++) {
    //         if (i === 0 || i % 2 !== 1) {
    //             newResponse += responseArray[i];
    //         } else {
    //             newResponse += "<b>" + responseArray[i] + "</b>";
    //         }
    //     }
    
    //     // ✅ Fix line breaks handling
    //     let newResponse2 = newResponse.split("*").join("</br>");
    //     let newResponseArray = newResponse2.split(" ");
    
    //     for (let i = 0; i < newResponseArray.length; i++) {
    //         const nextword = newResponseArray[i];
    //         delayPara(i, nextword + " "); // ✅ Ensure delayPara is handling async properly
    //     }
    
    //     setLoading(false);
    //     setInput("");
    // };
    


   const  value = {
      input, 
      setInput,
      onsend,
      recentPrompt,
      setRecentPrompt,
      previosPrompt,
      setPreviosPrompt,
      showResult,
      setShowResult,
      loading,
      setLoading,
      resultData,
      setResultData,
      newchat
    }

    return(
        <Context.Provider value={value}>
                {children}
            </Context.Provider>

    )
}


export default ContextProvider;
