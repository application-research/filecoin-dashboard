import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import SectionIndustryGraph from "@root/components/SectionIndustryGraph";
import SectionRegionGraph from "@root/components/SectionRegionGraph";

export default async function Page() {
  return (
    <DefaultLayout>
      <div style={{ position: "relative" }}>
        <SectionRegionGraph />
      </div>
    </DefaultLayout>
  );
}
