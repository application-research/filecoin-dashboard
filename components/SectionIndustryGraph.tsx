"use client";

import styles from "@components/SectionDataNew.module.scss";
import { AllData } from "@root/common/types";
import { formatDataToCamelCase } from "@root/common/utilities";
import clientRegionIndustryResolver from "@root/resolvers/client-industry-region";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import SectionGraphByIndustry from "./SectionGraphByIndustry";

export default function SectionIndustryGraph() {
  const [allData, setAllData] = useState<{ data: AllData[] }>({ data: [] });

  useEffect(() => {
    fetch("/api/db")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const camelCaseData = data.map((item) => formatDataToCamelCase(item));
        setAllData(camelCaseData as any);
      })
      .catch((error) => {
        console.error("Error getting data", error.message);
      });
  }, []);

  let allDataFiltered;

  if (Object.keys(allData).length > 0) {
    allDataFiltered = clientRegionIndustryResolver(allData as any);
  }

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
              {allDataFiltered.length > 0 &&
                Object.keys(allDataFiltered).length > 0 && (
                  <SectionGraphByIndustry allData={allDataFiltered} />
                )}
            </div>
          </div>
        </GutterContainer>
      </div>
    </div>
  );
}
