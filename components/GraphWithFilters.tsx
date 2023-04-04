import { AllData } from "@root/common/types";
import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  updateClientRegions,
} from "@root/resolvers/client-regions";
import { useState } from "react";
import { StackedBarChart } from "./StackedBarChart";

interface SectionGraphByRegionProps {
  allData: AllData[];
}

interface GraphByRegionProps extends SectionGraphByRegionProps {
  date: string;
}

export default function GraphWithFilters({ allData }) {
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3months" | "6months" | "12months"
  >("month");

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const clientsArray = Array.from(allData);
  const updatedKnownClientsRegions = updateClientRegions(clientsArray);
  const groupedClients = groupClientsByWeekAndRegion(
    updatedKnownClientsRegions,
    selectedInterval
  );

  // const sortedEightWeeks = groupedClients
  //   .sort((a: GraphByRegionProps, b: GraphByRegionProps) => {
  //     const dateA = new Date(a.date.replace(",", ""));
  //     const dateB = new Date(b.date.replace(",", ""));
  //     return dateA.getTime() - dateB.getTime();
  //   })
  //   .slice(2)
  //   .slice(-15);

  return (
    <>
      <div>
        Interval:
        <select value={selectedInterval} onChange={handleIntervalChange}>
          <option value="month"> 1 month</option>
          <option value="3month"> 3 month</option>
          {/* <option value="6month"> 6 month</option>
          <option value="12month"> 12 month</option> */}
        </select>
      </div>
      <StackedBarChart graphData={groupedClients} />
    </>
  );
}
