"use client";

import styles from "@components/SectionData.module.scss";
import { bytesToSize } from "@root/common/utilities";
import { MIX_BAR_CHART_DATA_FIXTURE } from "@root/fixtures/graph-data-fixtures";
import { MixBarChart } from "./MixBarChart";
import { PARTNERS_FIXTURE } from "@root/fixtures/partners";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import OnboardedDataTable from "./OnboardedDataTable";
import OverviewDataGrowth from "./OverviewDataGrowth";
import Partners from "./Partners";

const startTimestamp = 1673882814;
const currentTimestamp = Math.floor(Date.now() / 1000);

const date = (timestamp) => {
  const newDate = new Date(timestamp * 1000);
  return newDate;
};

const todayDate = date(currentTimestamp);
const startDate = date(startTimestamp);

export default function SectionData() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [allData, setAllData] = useState([]);

  const itemsPerPage = 15;

  const RATE_LIMIT_DELAY = 80000; // 1 second

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch(
          `https://api.datacapstats.io/api/getVerifiedClients?limit=${itemsPerPage}&page=${currentPage}&count=true`
        );
        const { count, data } = await res.json();
        setTotalClients(count);
        setClients(data);

        const res2 = await fetch(
          `https://api.datacapstats.io/api/getVerifiedClients?limit=none`
        );
        const data2 = await res2.json();
        setAllData(data2);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchClients();

    const intervalId = setInterval(() => {
      fetchClients();
    }, RATE_LIMIT_DELAY);

    return () => clearInterval(intervalId);
  }, [itemsPerPage, currentPage]);

  useEffect(() => {
    const totalPages = Math.ceil(totalClients / itemsPerPage);
    const pageNumbers = Array.from(Array(totalPages).keys()).map(
      (pageNumber) => pageNumber + 1
    );
    setPageNumbers(pageNumbers);
  }, [totalClients]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  console.log(allData, "all data");

  const partners = PARTNERS_FIXTURE;
  console.log("clients", clients);

  return (
    <div className={styles.body}>
      {Object.keys(allData).length > 0 && (
        <OverviewDataGrowth totalClients={totalClients} allData={allData} />
      )}

      <div style={{ paddingBottom: "var(--p-large-xxl)" }}>
        <Partners partners={partners} />
      </div>

      <GutterContainer>
        <div style={{ display: "grid", rowGap: "var(--p-large-x)" }}>
          <div>
            <div className={styles.headingContainer}>
              <h3 className={styles.colorBlue}>
                Data Onboarded by Regions (wip)
              </h3>
            </div>
          </div>
          {/* <MixBarChart graphData={MIX_BAR_CHART_DATA_FIXTURE} /> */}
          {/* <TimeSeries /> */}
          <div>
            <div className={styles.headingContainer}>
              <h3 className={styles.colorBlue}> Onboarded Data</h3>
              <p>{totalClients} clients </p>
            </div>

            <OnboardedDataTable
              clients={clients}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
