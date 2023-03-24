import { groupClientsByWeekAndIndustry } from "@root/resolvers/client-industry";
import { IndusrtyStackedBarChart } from "./IndustryStackedBarChart";

interface Client {
  date: string;
  [key: string]: any;
}

interface SectionGraphByIndustryProps {
  allData: Array<Client>;
}

export default function SectionGraphByIndustry({
  allData,
}: SectionGraphByIndustryProps) {
  const clients = groupClientsByWeekAndIndustry(allData);

  //Filter data for only 2023
  const data2023 = clients.filter((client: any) => {
    const startDate = new Date((client as Client).date);
    return startDate.getFullYear() === 2023;
  });

  const lastTwentyWeeks = data2023.slice(-20);
  //sort from least to greatest (ascending order)

  const sortedLastWeeks = lastTwentyWeeks.sort((a, b) => {
    const dateA = new Date((a as any).date).getTime();
    const dateB = new Date((b as any).date).getTime();

    return dateA - dateB;
  });

  return <IndusrtyStackedBarChart graphData={sortedLastWeeks} />;
}
