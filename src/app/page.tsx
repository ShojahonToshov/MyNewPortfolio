import CustomCursor from "../components/CustomCursor";
import HeroVariantsSwitcher from "../components/HeroVariants";
import FloatingNavbar from "../components/FloatingNavbar";
import EntryExperience from "../components/EntryExperience";
import StickyStack from "../components/StickyStack";
import { FooterMinimalistMono } from "../components/Footers";
import About from "../components/About";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-[300vh] font-sans selection:bg-white selection:text-black overflow-clip relative">
      <EntryExperience>
        <div className="hidden md:block">
           <CustomCursor />
        </div>
        <FloatingNavbar />
        <HeroVariantsSwitcher />
        <About />
        <StickyStack />
        <FooterMinimalistMono />
      </EntryExperience>
    </div>
  );
}
