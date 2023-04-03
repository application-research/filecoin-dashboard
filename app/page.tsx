import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import Navbar from "@root/components/Navbar";
import Footer from "@root/components/Footer";
import SectionData from "@root/components/SectionData";
import Hero from "@root/components/Hero";

export default async function Page() {
  return (
    <DefaultLayout>
      <div style={{ background: "black" }}>
        <Navbar />
        <Hero />
        <SectionData />
        <Footer />
      </div>
    </DefaultLayout>
  );
}
