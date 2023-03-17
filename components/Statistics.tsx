"use client";

import styles from "@components/Statistics.module.scss";
import GutterContainer from "./GutterContainer";
import { useEffect, useState } from "react";
import { MixBarChart } from "./MixBarChart";
import OnboardedDataTable from "./OnboardedDataTable";

const dataRegions = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Statistics() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const RATE_LIMIT_DELAY = 80000; // 1 second

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch(
          `https://api.datacapstats.io/api/getVerifiedClients?limit=${itemsPerPage}&page=${currentPage}`
        );
        const data = await res.json();

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

    fetchClients();

    return () => clearInterval(intervalId);
  }, []);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    setItemsPerPage(10);
  }

  return (
    <div className={styles.body}>
      <GutterContainer>
        <OnboardedDataTable
          currentPage={currentPage}
          data={clients}
          itemsPerPage={itemsPerPage}
          setCurrentPage={handlePageChange}
          setItemsPerPage={setItemsPerPage}
        />
      </GutterContainer>
    </div>
  );
}
