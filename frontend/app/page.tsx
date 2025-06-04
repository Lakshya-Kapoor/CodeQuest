import Faq from "@/components/section/faq";
import Hero from "@/components/section/hero";
import HowItWorks from "@/components/section/how-it-works";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen 2xl:w-[85%] mx-auto">
      <Hero />
      <HowItWorks />
      <Faq />
    </div>
  );
}
