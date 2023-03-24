import { RegionType } from "@root/common/types";
import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  updateClientRegions,
} from "@root/resolvers/client-regions";

export default function SectionGroupedGraphByRegion({ allData }) {
  const updatedKnownClientsRegions = updateClientRegions(allData);
  const groupedClients = groupClientsByWeekAndRegion(
    updatedKnownClientsRegions
  );

  // Filter data for only 2023
  const data2023 = groupedClients.filter((entry: RegionType) => {
    const entryDate = new Date(entry.date);
    return entryDate.getFullYear() === 2023;
  });

  const lastTwentyWeeks = data2023.slice(-20);

  // Sort from least to greatest (ascending order)
  const sortedLastTwentyWeeks = lastTwentyWeeks.sort(
    (a: RegionType, b: RegionType) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    }
  );

  return <RegionStackedBarChart graphData={sortedLastTwentyWeeks} />;
}
