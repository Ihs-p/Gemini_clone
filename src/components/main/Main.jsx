import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    input,
    setInput,
    onsend,
    recentPrompt,
    showResult,
    loading,
    resultData,
  } = useContext(Context);

  const cardDatas = [
    {
      text: "suggest beautifull places to see on an upcoming road trip",
      image: assets.compass_icon,
    },
    {
      text: "Briefly summarize this concept:urban planning",
      image: assets.bulb_icon,
    },
    {
      text: "Brainstorm team bonding ideas for a work retreat",
      image: assets.message_icon,
    },
    { text: "improve readability of following code", image: assets.code_icon },
  ];

  return (
    <div className="main flex-[1] min-h-screen pb-[15vh] relative ">
      <div className="nav flex items-center justify-between text-[22px] p-5 text-[#585858]">
        <p>Gemini</p>
        <img
          src={assets.user_icon}
          alt=""
          width={40}
          className="rounded-[50%]"
        />
      </div>
      <div className="main-container max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className="greet my-12 mx-0 text-6xl text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="custom-gradient">Hello, Dev.</span>
              </p>
              <p>How Can I Help You Today</p>
            </div>
            <div className="cards grid [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
              {cardDatas.map((card, index) => (
                <div className="card h-[200px] p-4 bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={()=>setInput(card.text)}>
                  <p className="text-[#585858] text-lg">
                    {card.text}
                  </p>
                  <img
                    src={card.image}
                    alt=""
                    width={35}
                    className="p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
                  />
                </div>
              ))}

              {/* <div className="card h-[200px] p-4 bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  Briefly summarize this concept:urban planning{" "}
                </p>
                <img
                  src={assets.bulb_icon}
                  alt=""
                  width={35}
                  className="p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
                />
              </div>
              <div className="card h-[200px] p-4 bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  Brainstorm team bonding ideas for a work retreat
                </p>
                <img
                  src={assets.message_icon}
                  alt=""
                  width={35}
                  className="p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
                />
              </div>
              <div className="card h-[200px] p-4 bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  improve readability of following code
                </p>
                <img
                  src={assets.code_icon}
                  alt=""
                  width={35}
                  className="p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
                />
              </div> */}
            </div>
          </>
        ) : (
          <>
            <div className="result py-0 px-[5%] max-h-[70vh]  overflow-y-scroll hide-scrollbar  ">
              <div className="resulttitle my-10 mx-0 flex items-center gap-5 ">
                <img
                  src={assets.user_icon}
                  alt=""
                  width={40}
                  className="rounded-[50%]"
                />
                <p>{recentPrompt}</p>
              </div>

              <div className="resdata flex items-start gap-5 ">
                <img
                  src={assets.gemini_icon}
                  alt=""
                  width={40}
                  className="rounded-[50%]"
                />
                {loading ? (
                  <div className="loader flex flex-col gap-[10px] w-full ">
                    <hr className="rounded-[4px] border-none bg-[#f6f7f8] bg-[linear-gradient(to_right,#9ed7ff,#ffffff,#9ed7ff)] [background-size:800px_50px] h-5 animate-loader" />
                    <hr className="rounded-[4px] border-none bg-[#f6f7f8] bg-[linear-gradient(to_right,#9ed7ff,#ffffff,#9ed7ff)] [background-size:800px_50px] h-5 animate-loader" />
                    <hr className="rounded-[4px] border-none bg-[#f6f7f8] bg-[linear-gradient(to_right,#9ed7ff,#ffffff,#9ed7ff)] [background-size:800px_50px] h-5 animate-loader" />
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: resultData }}
                    className="text-base font-light leading-[1.8]"
                  ></p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="mainbottom absolute bottom-0 w-full max-w-[900px] py-0 px-5 m-auto ">
          <div className="search flex items-center justify-between  md:gap-5 bg-[#f0f4f9] py-1 px-2  md:py-[10px] md:px-5  rounded-[50px]">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="enter a prompt here"
              className="flex-none md:flex-[1] w-[200px]  bg-transparent border-none outline-0 p-2 text-lg"
            />
            <div className="flex items-center gap-1 md:gap-[15px]">
              <img
                src={assets.gallery_icon}
                alt=""
                className="cursor-pointer w-5 md:w-6"
              />
              <img
                src={assets.mic_icon}
                alt=""
                className="cursor-pointer w-5 md:w-6"
              />
              {input ? (
                <img
                  onClick={() => onsend()}
                  src={assets.send_icon}
                  alt=""
                  className="cursor-pointer w-5 md:w-6"
                />
              ) : null}
            </div>
          </div>

          <p className="btminfo text-xs my-4 mx-auto text-center font-light">
            Gemini may display incorrect info
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
