import Header from "@/components/Home/header";
import Hero from "@/components/Home/hero";
import Banner from "@/components/Home/banner";
import HowItWorks from "@/components/Home/howitworks";
import UseCases from "@/components/Home/usecases";
import Features from "@/components/Home/features";
import Fxsector from "@/components/Home/fxsector";
import Testimonials from "@/components/Home/testimonials";
import Consultation from "@/components/Home/consultation";
import Footer from "@/components/Home/footer";
export default function Home() {
  return (
    <div className="w-full">
         <div className="w-full relative">
           <Header/>
         </div>
         <Hero/>  
         <Banner/>
         <UseCases/>
         <HowItWorks />
         <Features/>
         {/* <Fxsector />
         <Testimonials /> */}
         <Consultation/>
         <Footer />
    </div>
  );
}
