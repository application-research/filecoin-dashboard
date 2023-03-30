import { groupClientsByWeekAndIndustry } from "@root/resolvers/client-industry";
import { IndustryStackedBarChart } from "./IndustryStackedBarChart";
import { AllData } from "@root/common/types";

interface SectionGraphByIndustryProps {
  allData: AllData[];
}

interface GraphByIndustryProps extends SectionGraphByIndustryProps {
  date: string;
}

export default function SectionGraphByIndustry({
  allData,
}: SectionGraphByIndustryProps) {
  if (!allData) return;
  const clientsArray = Array.from(allData);

  const groupedClients = groupClientsByWeekAndIndustry(clientsArray);

  const sortedEightWeeks = groupedClients
    .sort((a: GraphByIndustryProps, b: GraphByIndustryProps) => {
      const dateA = new Date(a.date.replace(",", ""));
      const dateB = new Date(b.date.replace(",", ""));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(2)
    .slice(-15);
  return <IndustryStackedBarChart graphData={sortedEightWeeks} />;
}
