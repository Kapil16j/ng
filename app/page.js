import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import AboutUs from "@/components/homepage/AboutUs";
import Access from "@/components/homepage/Access";
import FaqServices from "@/components/homepage/FaqServices";
import Faqs from "@/components/homepage/Faqs";
import FundsforNGOs from "@/components/homepage/FundsforNGOs_jsx";
import GrantDatabase from "@/components/homepage/GrantDatabase";
import PlatForm from "@/components/homepage/PlatForm";
import Premium from "@/components/homepage/Premium";
import Pricing from "@/components/homepage/Pricing";
import Remaining from "@/components/homepage/Remaining";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PlatForm />
      <AboutUs />
      <FundsforNGOs />
      <Premium />
      <GrantDatabase />
      <Remaining />
      <Access />
      <FaqServices />
      <Pricing />
      <Footer />
    </main>
  );
}
