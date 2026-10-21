import React from "react";
import '../globals.css'

function Hero() {
  return (
    <div>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-stone-50">
        <div className="text-center maintext  font-lora text-stone-900  text-[7vh] w-[90vw]  text-justify  uppercase">
          {" "}
          <span className="inline-block flex items-center justify-center h-[3vh] w-[3vh]  bg-black rounded-full text-transparent select-none">
            
          </span>
          Al-Kousar an <span className="font-bold font-geistMono">award-winning</span> agency
          helping buyers secure <span className="font-bold font-geistMono">prime</span>{" "}
          properties & <span className="font-bold font-geistMono">maximize returns</span>  <span className="text-right">in DHA Bahawalpur</span> 
        </div>
        <div className="mt-[4vh] w-[40vw] space-y-[0.5vh] text-[2vh]  font-semibold font-geistMono leading-[1.4] text-stone-900">
          {/* <p className="text-justify [text-align-last:justify]">EXCEPTIONAL PROPERTY</p> */}
          <p className="text-justify [text-align-last:justify]">EXPERT INVESTMENT GUIDANCE</p>
          <p className="text-justify [text-align-last:justify]">PROVEN BUYER SUCCESS</p>
          <p className="text-justify [text-align-last:justify]">BUILT FOR LASTING VALUE</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
