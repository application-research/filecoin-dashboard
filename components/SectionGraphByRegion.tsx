import styles from "@root/components/SectionGraphByRegion.module.scss";

import { RegionStackedBarChart } from "./RegionStackedBarChart";
import {
  groupClientsByWeekAndRegion,
  updateClientRegions,
} from "@root/resolvers/client-regions";
import { useState } from "react";
import FilterSelection from "./FilterSelection";
import { BreakpointEnum, useBreakpoint } from "@root/common/use-breakpoint";

export default function SectionGraphByRegion({ allData }) {
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3month" | "6month" | "12month"
  >("6month");
  const breakpoint = useBreakpoint();
  const isMobile =
    breakpoint === BreakpointEnum.XS || breakpoint === BreakpointEnum.SM;

  const clientsArray = Array.from(allData);
  const updatedKnownClientsRegions = updateClientRegions(clientsArray);

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
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
            graphData={sortedData}
            showDesktopLedger={false}
            showMobileLedger={true}
          />
        )}

        {!isMobile && (
          <RegionStackedBarChart
            graphData={sortedData}
            showDesktopLedger={true}
            showMobileLedger={false}
          />
        )}
      </div>
    </div>
  );
}
