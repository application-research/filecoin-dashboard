"use client";

import "@root/global.scss";

// import * as Utilities from "@common/utilities";

import DefaultLayout from "@components/DefaultLayout";
// import Navbar from "@root/components/Navbar";
// import OverviewStatistics from "@root/components/OverviewStatistics";
// import Footer from "@root/components/Footer";
// import Hero from "@root/components/Hero";
// import { useEffect, useState } from "react";

// const getItems = async () => {
//   const response = await fetch(
//     "api.filplus.d.interplanetary.one/public/api/getVerifiedDeals?limit=25&page=1"
//   );
//   const json = await response.json();
//   return json;
// };

export default async function Page() {
  // const [deals, setDeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchDeals() {
  //     try {
  //       const res = await fetch(
  //         "https://api.filplus.d.interplanetary.one/public/api/getVerifiedDeals?limit=25&page=1"
  //       );
  //       const data = await res.json();
  //       console.log(data, "data");
  //       // setDeals(data);
  //       // setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchDeals();
  // }, []);
  // console.log(deals, "deals");
  return (
    <DefaultLayout>
      {/* <Navbar />
      <Hero /> */}

      {/* <OverviewStatistics data={deals} /> */}

      {/* <Footer /> */}
    </DefaultLayout>
  );
}
// console.log("testttt", getItems());
// let data = getItems();
