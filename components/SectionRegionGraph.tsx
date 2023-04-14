"use client";

import styles from "@components/SectionDataNew.module.scss";
import { AllData } from "@root/common/types";
import { formatDataToCamelCase } from "@root/common/utilities";
import clientRegionIndustryResolver from "@root/resolvers/client-industry-region";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import SectionGraphByRegion from "./SectionGraphByRegion";

export default function SectionRegionGraph() {
  const [regionData, setRegionData] = useState({ data: [] });

  useEffect(() => {
    fetch("/api/fil-user-explorer-region")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const camelCaseData = data.map((item) => formatDataToCamelCase(item));
        setRegionData(camelCaseData as any);
      })
      .catch((error) => {
        console.error("Error getting data", error.message);
      });
  }, []);

  return (
    <div className={styles.body}>
      <div
        style={{
          display: "grid",
          rowGap: "var(--p-large-xxl)",
          background: "white",
        }}
      >
        <GutterContainer>
          <div>
            <div className={`${styles.headingContainer} ${styles.graphMobile}`}>
              <SectionGraphByRegion allData={regionData} />
            </div>
          </div>
        </GutterContainer>
      </div>
    </div>
  );
}
