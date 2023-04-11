"use client";

import styles from "@components/SectionDataNew.module.scss";
import { AllData } from "@root/common/types";
import {
  CACHE_EXPIRATION_TIME,
  CACHE_KEY,
  isCacheValid,
  saveToLocalStorage,
} from "@root/common/utilities";
import { fetchAllClients } from "@root/pages/api";
import clientRegionIndustryResolver from "@root/resolvers/client-industry-region";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import SectionGraphByRegion from "./SectionGraphByRegion";

export default function SectionRegionGraph() {
  const [allData, setAllData] = useState<{ data: AllData[] }>({ data: [] });
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const intervalEndTimestamp = Math.round(currentDate.getTime() / 1000);
  const secondsInAYear = 31536000;
  const intervalStartTimestamp = intervalEndTimestamp - secondsInAYear;

  useEffect(() => {
    async function fetchAllData() {
      try {
        const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
        // console.log(cachedData, "cached data");
        if (isCacheValid(cachedData, CACHE_EXPIRATION_TIME)) {
          // console.log("Fetching CACHED data");
          setAllData(cachedData.data);

          return;
        }

        // console.log("Fetching new data");

        const allClients = await fetchAllClients(
          intervalStartTimestamp,
          intervalEndTimestamp
        );
        setAllData(allClients as any);

        saveToLocalStorage(CACHE_KEY, allClients);
      } catch (error) {
        setError(error);
      }
    }

    fetchAllData();
  }, [intervalEndTimestamp, intervalStartTimestamp]);

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
              <div className={styles.headingContainer}>
                <h2
                  style={{
                    color: "var(--color-black)",
                    paddingTop: "4rem",
                  }}
                >
                  Data Stored by Where the Owner Lives
                </h2>
                <p>
                  Filecoin provides a range of storage solutions for a global
                  client.
                </p>
              </div>
              {allDataFiltered.length > 0 &&
                Object.keys(allDataFiltered).length > 0 && (
                  <SectionGraphByRegion allData={allDataFiltered} />
                )}
            </div>
          </div>
        </GutterContainer>
      </div>
    </div>
  );
}
