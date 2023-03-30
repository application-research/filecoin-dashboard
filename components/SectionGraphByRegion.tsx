import { AllData } from "@root/common/types";
import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  updateClientRegions,
} from "@root/resolvers/client-regions";

interface SectionGraphByRegionProps {
  allData: AllData[];
}

interface GraphByRegionProps extends SectionGraphByRegionProps {
  date: string;
}

export default function SectionGroupedGraphByRegion({ allData }) {
  const clientsArray = Array.from(allData);

  const updatedKnownClientsRegions = updateClientRegions(clientsArray);
  const groupedClients = groupClientsByWeekAndRegion(
    updatedKnownClientsRegions
  );

  const sortedEightWeeks = groupedClients
    .sort((a: GraphByRegionProps, b: GraphByRegionProps) => {
      const dateA = new Date(a.date.replace(",", ""));
      const dateB = new Date(b.date.replace(",", ""));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(2)
    .slice(-15);

  return <RegionStackedBarChart graphData={sortedEightWeeks} />;
}
