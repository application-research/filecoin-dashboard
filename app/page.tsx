import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import Footer from "@root/components/Footer";
import SectionData from "@root/components/SectionData";
import HeroNew from "@root/components/HeroNew";
import NavbarNew from "@root/components/NavbarNew";
import Hero from "@root/components/Hero";
import SectionDataNew from "@root/components/SectionDataNew";
import FooterNew from "@root/components/FooterNew";
import Resources from "@root/components/Resources";
import PlausibleAnalyticsScript from "@root/components/PlausibleAnalyticsScript";

export default async function Page() {
  return (
    <DefaultLayout>
      <PlausibleAnalyticsScript />
      <NavbarNew />
      <div style={{ position: "relative" }}>
        <SectionDataNew />
      </div>

      <Resources />
      <FooterNew />
    </DefaultLayout>
  );
}
