import Header from "@/components/Home/header";
import Hero from "@/components/Home/hero";
import Banner from "@/components/Home/banner";
import HowItWorks from "@/components/Home/howitworks";

export default function Home() {
  return (
    <div className="w-full">
         <div className="w-full relative">
             <Header/>
         </div>
         <Hero/>  
         <Banner/>
         <HowItWorks />
    </div>
  );
}
