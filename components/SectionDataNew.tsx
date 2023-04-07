"use client";

import styles from "@components/SectionDataNew.module.scss";
import { AllData } from "@root/common/types";
import {
  CACHE_EXPIRATION_TIME,
  CACHE_KEY,
  isCacheValid,
  saveToLocalStorage,
} from "@root/common/utilities";
import { PARTNERS_FIXTURE } from "@root/fixtures/partners-fixtures";
import {
  fetchAllClients,
  fetchClientsPerPage,
  fetchTotalClients,
} from "@root/pages/api";
import clientRegionIndustryResolver from "@root/resolvers/client-industry-region";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import SectionGraphByIndustry from "./SectionGraphByIndustry";
import SectionGraphByRegion from "./SectionGraphByRegion";
import PartnersNew from "./PartnersNew";
import OverviewDataGrowthNew from "./OverviewDataGrowthNew";
import OnboardedDataTableNew from "./OnboardedDataTableNew";

export default function SectionDataNew() {
  const [allData, setAllData] = useState<{ data: AllData[] }>({ data: [] });
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [totalClients, setTotalClients] = useState([]);
  const [totalClientCount, setTotalClientCount] = useState(0);
  const partners = PARTNERS_FIXTURE;
  const itemsPerPage = 15;
  const currentDate = new Date();
  const intervalEndTimestamp = Math.round(currentDate.getTime() / 1000);
  const secondsInAYear = 31536000;
  const intervalStartTimestamp = intervalEndTimestamp - secondsInAYear;

  useEffect(() => {
    async function fetchPaginatedAndTotalData() {
      try {
        const { count, data } = await fetchClientsPerPage(
          itemsPerPage,
          currentPage
        );
        let resolvedClients = clientRegionIndustryResolver(data);
        setClients(resolvedClients);
        setTotalClientCount(count);

        const totalClients = await fetchTotalClients();
        setTotalClients(totalClients.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchPaginatedAndTotalData();
  }, [currentPage, itemsPerPage, totalClientCount]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

        if (isCacheValid(cachedData, CACHE_EXPIRATION_TIME)) {
          // console.log("Fetching CACHED data");
          setAllData(cachedData.data);
          setIsLoading(false);
          return;
        }

        // console.log("Fetching new data");

        const allClients = await fetchAllClients(
          intervalStartTimestamp,
          intervalEndTimestamp
        );
        setAllData(allClients as any);
        setIsLoading(false);

        saveToLocalStorage(CACHE_KEY, allClients);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, [intervalEndTimestamp, intervalStartTimestamp]);

  useEffect(() => {
    const totalPages = Math.ceil(totalClientCount / itemsPerPage);
    const pageNumbers = Array.from(Array(totalPages).keys()).map(
      (pageNumber) => pageNumber + 1
    );
    setPageNumbers(pageNumbers);
  }, [totalClientCount]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let allDataFiltered;

  if (Object.keys(allData).length > 0) {
    allDataFiltered = clientRegionIndustryResolver(allData as any);
  }

  return (
    <div className={styles.body}>
      {Object.keys(allData).length > 0 && (
        <OverviewDataGrowthNew
          totalClientCount={totalClientCount}
          totalClients={totalClients}
          allDataFiltered={allDataFiltered}
        />
      )}
      <div style={{ paddingBottom: "var(--p-large-xxl)" }}>
        <PartnersNew partners={partners} />
      </div>

      <div
        style={{
          display: "grid",
          rowGap: "var(--p-large-xxl)",
          background: "white",
        }}
      >
        <GutterContainer>
          {allDataFiltered.length > 0 &&
            Object.keys(allDataFiltered).length > 0 && (
              <div>
                <div
                  className={styles.headingContainer}
                  style={{
                    paddingTop: "4rem",
                  }}
                >
                  <h2 style={{ color: "var(--color-black)" }}>
                    Data Stored by Industry
                  </h2>
                  <p>
                    Leading industries choose Filecoin to protect their most
                    important data.
                  </p>
                  <SectionGraphByIndustry allData={allDataFiltered} />
                </div>
                <div>
                  <div className={styles.headingContainer}>
                    <h2 style={{ color: "var(--color-black)" }}>
                      Data Stored by Region
                    </h2>
                    <p>
                      Filecoin provides a range of storage solutions for a
                      global clientele.
                    </p>
                  </div>

                  <SectionGraphByRegion allData={allDataFiltered} />
                </div>
              </div>
            )}
        </GutterContainer>
        <div
          style={{
            paddingBottom: "4rem",
            paddingTop: "4rem",
            background: "var(--color-light-blue)",
          }}
        >
          <div className={styles.backgroundTable}>
            <GutterContainer>
              <div className={styles.headingContainer}>
                <h2 style={{ color: "var(--color-black)" }}>
                  Data Onboarding Details
                </h2>
                <p>
                  Get additional details about the client data that’s being
                  stored on Filecoin.
                </p>
                <p>{totalClientCount} clients </p>
              </div>
            </GutterContainer>

            <OnboardedDataTableNew
              clients={clients}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
