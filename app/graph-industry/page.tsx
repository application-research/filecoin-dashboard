import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import SectionIndustryGraph from "@root/components/SectionIndustryGraph";

export default async function Page() {
  return (
    <DefaultLayout>
      <div style={{ position: "relative" }}>
        <SectionIndustryGraph />
      </div>
    </DefaultLayout>
  );
}
