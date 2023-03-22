import { MIX_BAR_CHART_DATA_FIXTURE } from "@root/fixtures/graph-data-fixtures";
import { MixBarChart } from "./MixBarChart";

export default function SectionGraphByIndustry({ allData }) {
  return <MixBarChart graphData={MIX_BAR_CHART_DATA_FIXTURE} />;
}
