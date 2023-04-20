import {
  groupClientsByWeekAndIndustry,
  updateClientIndustries,
  updateClientIndustry,
} from "@root/resolvers/client-industry";
import { IndustryStackedBarChart } from "./IndustryStackedBarChart";
import { AllData } from "@root/common/types";
import { useState } from "react";
import FilterSelection from "./FilterSelection";
import { BreakpointEnum, useBreakpoint } from "@root/common/use-breakpoint";

export default function SectionGraphByIndustry({ allData }) {
  if (!allData) return;
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3month" | "6month" | "12month"
  >("6month");
  const breakpoint = useBreakpoint();
  const isMobile =
    breakpoint === BreakpointEnum.XS || breakpoint === BreakpointEnum.SM;

  const clientsArray = Array.from(allData);
  const updatedKnownClientsIndustries = updateClientIndustries(clientsArray);
  const handleIntervalChange = (event) => {
    return setSelectedInterval(event.target.value);
  };

  const groupedClients = groupClientsByWeekAndIndustry(
    updatedKnownClientsIndustries,
    selectedInterval
  );

  const sortedData = groupedClients.sort((a, b) => {
    const dateA = new Date((a as any).date.replace(",", ""));
    const dateB = new Date((b as any).date.replace(",", ""));
    return dateA.getTime() - dateB.getTime();
  });

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
        <FilterSelection
          options={options}
          value={selectedInterval}
          onChange={handleIntervalChange}
        />
      </div>
      {isMobile && (
        <IndustryStackedBarChart
          graphData={sortedData}
          showDesktopLedger={false}
          showMobileLedger={true}
        />
      )}
      {!isMobile && (
        <IndustryStackedBarChart
          graphData={sortedData}
          showDesktopLedger={true}
          showMobileLedger={false}
        />
      )}{" "}
    </>
  );
}
