"use client";

import styles from "@components/SectionDataNew.module.scss";
import { AllData } from "@root/common/types";
import { formatDataToCamelCase } from "@root/common/utilities";
import clientRegionIndustryResolver from "@root/resolvers/client-industry-region";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import SectionGraphByIndustry from "./SectionGraphByIndustry";

export default function SectionIndustryGraph() {
  const [industryData, setIndustryData] = useState({ data: [] });

  useEffect(() => {
    fetch("/api/fil-user-explorer-industry")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const camelCaseData = data.map((item) => formatDataToCamelCase(item));
        setIndustryData(camelCaseData as any);
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
              <SectionGraphByIndustry allData={industryData} />
            </div>
          </div>
        </GutterContainer>
      </div>
    </div>
  );
}
