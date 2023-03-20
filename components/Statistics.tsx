"use client";

import styles from "@components/Statistics.module.scss";
import GutterContainer from "./GutterContainer";
import { useEffect, useState } from "react";
import OnboardedDataTable from "./OnboardedDataTable";

const startTimestamp = 1673882814;
const currentTimestamp = Math.floor(Date.now() / 1000);

const date = (timestamp) => {
  const newDate = new Date(timestamp * 1000);
  return newDate;
};

const todayDate = date(currentTimestamp);
const startDate = date(startTimestamp);

export default function Statistics() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [totalClients, setTotalClients] = useState(0);

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

  return (
    <div className={styles.body}>
      <GutterContainer>
        <div style={{ display: "grid", rowGap: "2.5rem" }}>
          <div>
            <div className={styles.headingContainer}>
              <h3 className={styles.colorBlue}>
                Data Onboarded by Regions (wip)
              </h3>
            </div>
          </div>

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
