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
import PartnersNew from "./PartnersNew";
import OverviewDataGrowthNew from "./OverviewDataGrowthNew";
import OnboardedDataTableNew from "./OnboardedDataTableNew";
import { CLIENTS_WITH_DEALS_FIXTURE } from "@root/fixtures/clients-with-deals";
import SectionGraphByRegion from "./SectionGraphByRegion";

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
  const clientsTableData = CLIENTS_WITH_DEALS_FIXTURE;

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

  let totalClientsWithDeals = 0;

  totalClients.map((client) => {
    if (client.dealCount > 1) {
      totalClientsWithDeals += 1;
    }
  });

  let clientsWithDeals = [];
  let shouldStop = false;

  totalClients.forEach((client) => {
    if (shouldStop) return;

    if (client.dealCount > 1) {
      clientsWithDeals.push(client);
    }

    if (clientsWithDeals.length >= 16) {
      shouldStop = true;
    }
  });

  return (
    <div className={styles.body}>
      {Object.keys(allData).length > 0 && (
        <OverviewDataGrowthNew
          totalClientCount={totalClientsWithDeals}
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
        {allDataFiltered.length > 0 &&
          Object.keys(allDataFiltered).length > 0 && (
            <div>
              <div
                className={`${styles.headingContainer} ${styles.graphMobile}`}
              >
                <GutterContainer>
                  <h2
                    style={{
                      color: "var(--color-black)",
                      paddingBottom: "1rem",
                    }}
                  >
                    Data Stored by Industry
                  </h2>
                  <p>
                    Leading industries choose Filecoin to protect their most
                    important data.
                  </p>
                </GutterContainer>
                <div className={styles.graph}>
                  <SectionGraphByIndustry allData={allDataFiltered} />
                </div>
              </div>
              <div>
                <GutterContainer>
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
                      Filecoin provides a range of storage solutions for a
                      global client.
                    </p>
                  </div>
                </GutterContainer>
                <div className={styles.graph}>
                  <SectionGraphByRegion allData={allDataFiltered} />
                </div>
              </div>
            </div>
          )}

        <div
          style={{
            paddingBottom: "6rem",
            paddingTop: "6rem",
            background: "var(--color-light-blue)",
          }}
        >
          <div className={styles.backgroundTable}>
            <GutterContainer>
              <div className={styles.headingContainer}>
                <div className={styles.backgroundTableTitle}>
                  <h2 style={{ color: "var(--color-black)" }}>
                    Data Onboarding Details
                  </h2>
                </div>

                <p style={{ paddingBottom: "2rem" }}>
                  Get additional details about the client data that’s being
                  stored on Filecoin.
                </p>
                <p className={styles.totalClientsWithDeals}>
                  Total Clients: {totalClientsWithDeals}
                </p>
                <div className={styles.reference}>
                  <strong>Reference:</strong> 1 Pib data is ={"  "}
                  <img
                    src="https://user-images.githubusercontent.com/28320272/231327138-355178af-c631-4954-92a2-c0bbfd606f40.png"
                    className={styles.referenceIcon}
                  />
                  {"  "}1 million high resolution movies.
                </div>
              </div>
            </GutterContainer>

            <OnboardedDataTableNew clients={clientsTableData} />
          </div>
        </div>
      </div>
    </div>
  );
}
