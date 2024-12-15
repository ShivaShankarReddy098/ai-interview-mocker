import CTASection from "@/sections/CTAPage";
// import Header from "./dashboard/_components/Header";
import HomePage from "@/sections/HomePage";
import Features from "@/sections/InformationPage";
import TestimonialsSection from "@/sections/TestimonialsPage";
import HowItWorksSection from "@/sections/HowItWorksPage";
import FAQSection from "@/sections/FAQPage";
import PricingSection from "@/sections/PricePage";
import TipsSection from "@/sections/TipsPage";
import Gamification from "@/sections/GameHistoryPage";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <HomePage />
      <Features />
      <HowItWorksSection />
      <TipsSection />
      <Gamification />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      {/* <ContactUs /> */}
      {/* <Footer /> */}
    </>
  );
}
