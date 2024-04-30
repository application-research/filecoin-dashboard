import styles from "@root/components/SectionGraphByRegion.module.scss";

import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  updateClientRegions,
} from "@root/resolvers/client-regions";
import { graphIntervalsEnum } from "@root/common/types";
import { useState } from "react";
import FilterSelection from "./FilterSelection";
import { BreakpointEnum, useBreakpoint } from "@root/common/use-breakpoint";
import { RegionChartTimeFiltered } from "./RegionChartTimeFiltered";

export default function SectionGraphByRegion({ allData }) {
  const [selectedInterval, setSelectedInterval] = useState<graphIntervalsEnum>(graphIntervalsEnum.allTime);
  const breakpoint = useBreakpoint();
  const isMobile =
    breakpoint === BreakpointEnum.XS || breakpoint === BreakpointEnum.SM;

  const clientsArray = Array.from(allData);
  const updatedKnownClientsRegions = updateClientRegions(clientsArray);

  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
  };

  const groupedClients = groupClientsByWeekAndRegion(
    updatedKnownClientsRegions,
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
    <div>
      <div
        style={{
          paddingRight: "1.6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        <div style={{ width: "100%" }}>
          <FilterSelection
            options={options}
            value={selectedInterval}
            onChange={handleIntervalChange}
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        {isMobile && (
          <RegionStackedBarChart
            showMobileLedger={true}
            showDesktopLedger={false}
            graphData={sortedData}
          />
        )}
        {!isMobile && (
          <RegionChartTimeFiltered
            graphData={sortedData}
            showDesktopLedger={true}
            showMobileLedger={false}
          />
        )}
      </div>
    </div>
  );
}
