"use client";

import styles from "@components/SectionDataNew.module.scss";
import { formatDataToCamelCase } from "@root/common/utilities";
import { CLIENTS_WITH_DEALS_FIXTURE } from "@root/fixtures/clients-with-deals";
import { PARTNERS_FIXTURE } from "@root/fixtures/partners-fixtures";
import { fetchClientsPerPage, fetchTotalClients } from "@root/pages/api";
import totalClientsWithDealsResolver from "@root/resolvers/total-clients";
import { useEffect, useState } from "react";
import GutterContainer from "./GutterContainer";
import OnboardedDataTableNew from "./OnboardedDataTableNew";
import OverviewDataGrowthNew from "./OverviewDataGrowthNew";
import PartnersNew from "./PartnersNew";
import SectionGraphByIndustry from "./SectionGraphByIndustry";
import SectionGraphByRegion from "./SectionGraphByRegion";

export default function SectionDataNew() {
  const [error, setError] = useState(null);
  const [totalClients, setTotalClients] = useState([]);
  const [totalClientCount, setTotalClientCount] = useState(0);
  const [industryData, setIndustryData] = useState({ data: [] });
  const [regionData, setRegionData] = useState({ data: [] });

  const partners = PARTNERS_FIXTURE;
  const clientsTableData = CLIENTS_WITH_DEALS_FIXTURE;
  const itemsPerPage = 15;
  let currentPage = 1;

  useEffect(() => {
    async function fetchPaginatedAndTotalData() {
      try {
        const { count } = await fetchClientsPerPage(itemsPerPage, currentPage);

        const totalClientsFetched = await fetchTotalClients();

        setTotalClientCount(count);
        setTotalClients(totalClientsFetched.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchPaginatedAndTotalData();
  }, [currentPage, itemsPerPage, totalClientCount]);

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
      <OverviewDataGrowthNew
        totalClientCount={"1337"}
        totalClients={totalClients}
      />

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
        <div>
          <div className={`${styles.headingContainer} ${styles.graphMobile}`}>
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
              <SectionGraphByIndustry allData={industryData ?? null} />
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
                  Filecoin provides a range of storage solutions for a global
                  client.
                </p>
              </div>
            </GutterContainer>
            <div className={styles.graph}>
              <SectionGraphByRegion allData={regionData ?? null} />
            </div>
          </div>
        </div>

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
                  Total Clients: {"1337"}
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
