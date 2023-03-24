"use client";

import styles from "@components/SectionData.module.scss";
import { PARTNERS_FIXTURE } from "@root/fixtures/partners-fixtures";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import OnboardedDataTable from "./OnboardedDataTable";
import OverviewDataGrowth from "./OverviewDataGrowth";
import Partners from "./Partners";
import SectionGraphByRegion from "./SectionGraphByRegion";
import clientRegionIndustryResolver from "@root/resolvers/client-industry-region";
import SectionGraphByIndustry from "./SectionGraphByIndustry";

export default function SectionData() {
  const [allData, setAllData] = useState({ data: [] });
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const partners = PARTNERS_FIXTURE;
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

        let resolvedClients = clientRegionIndustryResolver(data);
        setClients(resolvedClients);

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

  let allDataFiltered;

  Object.keys(allData).length > 0 &&
    (allDataFiltered = clientRegionIndustryResolver(allData.data));

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
          {Object.keys(allData).length > 0 && (
            <>
              <div>
                <div className={styles.headingContainer}>
                  <h3 className={styles.colorBlue}>
                    Onboarded Data by Regions
                  </h3>
                </div>
              </div>
              <SectionGraphByRegion allData={allDataFiltered} />
              <div>
                <div className={styles.headingContainer}>
                  <h3 className={styles.colorBlue}>
                    Onboarded Data by Industries
                  </h3>
                </div>
              </div>
              <SectionGraphByIndustry allData={allDataFiltered} />
            </>
          )}
          <div style={{ paddingBottom: "4rem" }}>
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
