import {
  groupClientsByWeekAndIndustry,
  updateClientIndustries,
  updateClientIndustry,
} from "@root/resolvers/client-industry";
import { IndustryStackedBarChart } from "./IndustryStackedBarChart";
import { graphIntervalsEnum } from "@root/common/types";
import { AllData } from "@root/common/types";
import { useState } from "react";
import FilterSelection from "./FilterSelection";
import { BreakpointEnum, useBreakpoint } from "@root/common/use-breakpoint";
import { IndustryChartTimeFilter } from "./IndustryChartTimeFilter";

export default function SectionGraphByIndustry({ allData }) {
  if (!allData) return;
  const [selectedInterval, setSelectedInterval] = useState<graphIntervalsEnum>(graphIntervalsEnum.allTime);
  const breakpoint = useBreakpoint();
  const isMobile =
    breakpoint === BreakpointEnum.XS || breakpoint === BreakpointEnum.SM;

  const clientsArray = Array.from(allData);
  const updatedKnownClientsIndustries = updateClientIndustries(clientsArray);
  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
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
      text: "30D",
      value: graphIntervalsEnum.oneMonth,
    },
    {
      text: "90D",
      value: graphIntervalsEnum.threeMonths,
    },
    {
      text: "180D",
      value: graphIntervalsEnum.sixMonths,
    },
    {
      text: "All time",
      value: graphIntervalsEnum.allTime,
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
          showMobileLedger={true}
          showDesktopLedger={false}
          graphData={sortedData}
        />
      )}
      {!isMobile && (
        <IndustryChartTimeFilter
          graphData={sortedData}
          showDesktopLedger={true}
          showMobileLedger={false}
        />
      )}
    </>
  );
}
