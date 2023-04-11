import { AllData } from "@root/common/types";
import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  groupClientsByWeekAndRegionWithUsedDc,
  updateClientRegions,
  updateClientRegionsWithUsedDc,
} from "@root/resolvers/client-regions";
import { useState } from "react";
import FilterSelection from "./FilterSelection";

interface SectionGraphByRegionProps {
  allData: AllData[];
}

interface GraphByRegionProps extends SectionGraphByRegionProps {
  date: string;
}

export default function SectionGraphByRegion({ allData }) {
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3month" | "6month" | "12month"
  >("6month");

  const clientsArray = Array.from(allData);
  const updatedKnownClientsRegions =
    updateClientRegionsWithUsedDc(clientsArray);

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };
  const groupedClients = groupClientsByWeekAndRegion(
    updatedKnownClientsRegions,
    selectedInterval
  );

  const sortedEightWeeks = groupedClients.sort(
    (a: GraphByRegionProps, b: GraphByRegionProps) => {
      const dateA = new Date(a.date.replace(",", ""));
      const dateB = new Date(b.date.replace(",", ""));
      return dateA.getTime() - dateB.getTime();
    }
  );

  const options = [
    {
      text: "last month",
      value: "month",
    },
    {
      text: "3 months",
      value: "3month",
    },
    {
      text: "6 months",
      value: "6month",
    },
  ];

  return (
    <>
      <div
        style={{
          paddingRight: "1.6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        Filter
        <FilterSelection
          options={options}
          value={selectedInterval}
          onChange={handleIntervalChange}
        />
      </div>
      <RegionStackedBarChart graphData={sortedEightWeeks} />
    </>
  );
}
