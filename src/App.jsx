import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Sec1 from "./components/Sec1";
import Sec2 from "./components/Sec2";

export default function App() {
  return (
    <div className="min-h-screen p-[16px] md:p-[32px] lg:p-[40px] bg-[#e8e7e3] transition-colors duration-300">
      <div className="max-w-[1152px] mx-auto flex flex-col gap-[20px]">
        <Hero />
        <Sec1/>
        <Sec2/>
        <Footer />
      </div>
    </div>
  );
}
