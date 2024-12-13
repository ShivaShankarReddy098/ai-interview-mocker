import Header from "./dashboard/_components/Header";
import HomePage from "@/sections/HomePage";
import Footer from "@/sections/FooterPage";
import Features from "@/sections/InformationPage";
import ContactUs from "@/sections/ContactPage";

export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <Features />
      {/* <ContactUs /> */}
      {/* <Footer /> */}
    </>
  );
}
