import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import FooterNew from "@root/components/FooterNew";
import NavbarNew from "@root/components/NavbarNew";
import PlausibleAnalyticsScript from "@root/components/PlausibleAnalyticsScript";
import Resources from "@root/components/Resources";
import SectionDataNew from "@root/components/SectionDataNew";

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
