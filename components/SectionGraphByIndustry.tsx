import { groupClientsByWeekAndIndustry } from "@root/resolvers/client-industry";
import { IndustryStackedBarChart } from "./IndustryStackedBarChart";
import { AllData } from "@root/common/types";
import { useState } from "react";
import FilterSelection from "./FilterSelection";

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
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3months" | "6months" | "12months"
  >("6months");

  const clientsArray = Array.from(allData);
  const handleIntervalChange = (event) => {
    return setSelectedInterval(event.target.value);
  };
  const groupedClients = groupClientsByWeekAndIndustry(
    clientsArray,
    selectedInterval
  );

  const sortedEightWeeks = groupedClients.sort(
    (a: GraphByIndustryProps, b: GraphByIndustryProps) => {
      const dateA = new Date(a.date.replace(",", ""));
      const dateB = new Date(b.date.replace(",", ""));
      return dateA.getTime() - dateB.getTime();
    }
  );

  const options = [
    {
      text: "6 months",
      value: "6month",
    },
    {
      text: "3 months",
      value: "3month",
    },
    {
      text: "last month",
      value: "month",
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
      <IndustryStackedBarChart graphData={sortedEightWeeks} />
    </>
  );
}
