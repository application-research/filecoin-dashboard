import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import Footer from "@root/components/Footer";
<<<<<<< HEAD
import SectionData from "@root/components/SectionData";
import HeroNew from "@root/components/HeroNew";
import NavbarNew from "@root/components/NavbarNew";
import Hero from "@root/components/Hero";
import SectionDataNew from "@root/components/SectionDataNew";
import FooterNew from "@root/components/FooterNew";
import Resources from "@root/components/Resources";
=======
import Hero from "@root/components/Hero";
import SectionData from "@root/components/SectionData";
>>>>>>> e1487f8 (added fonts)

export default async function Page() {
  return (
    <DefaultLayout>
      <NavbarNew />
      <div style={{ position: "relative" }}>
        <SectionDataNew />
      </div>

      <Resources />
      <FooterNew />
    </DefaultLayout>
  );
}
