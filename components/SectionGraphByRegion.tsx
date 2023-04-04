import { AllData } from "@root/common/types";
import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  updateClientRegions,
} from "@root/resolvers/client-regions";
import { useState } from "react";

interface SectionGraphByRegionProps {
  allData: AllData[];
}

interface GraphByRegionProps extends SectionGraphByRegionProps {
  date: string;
}

export default function SectionGroupedGraphByRegion({ allData }) {
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3months" | "6months" | "12months"
  >("month");

  const clientsArray = Array.from(allData);
  const updatedKnownClientsRegions = updateClientRegions(
    clientsArray,
    selectedInterval
  );
  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };
  const groupedClients = groupClientsByWeekAndRegion(
    updatedKnownClientsRegions,
    selectedInterval
  );

  // const sortedEightWeeks = groupedClients.sort(
  //   (a: GraphByRegionProps, b: GraphByRegionProps) => {
  //     const dateA = new Date(a.date.replace(",", ""));
  //     const dateB = new Date(b.date.replace(",", ""));
  //     return dateA.getTime() - dateB.getTime();
  //   }
  // );
  const sortedData = groupedClients.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  // .slice(2)
  // .slice(-15);

  return (
    <>
      <div>
        Interval
        <select value={selectedInterval} onChange={handleIntervalChange}>
          <option value="month">month</option>
          <option value="3month">3 months</option>
          {/* <option value="6month">6 months</option>
          <option value="1month">1 year</option> */}
        </select>
      </div>
      <RegionStackedBarChart graphData={sortedData} />
    </>
  );
}
