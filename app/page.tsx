import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import Navbar from "@root/components/Navbar";
import Footer from "@root/components/Footer";
import Hero from "@root/components/Hero";
import { MixBarChart } from "@root/components/MixBarChart";
import OnboardedDataTable from "@root/components/OnboardedDataTable";
import Statistics from "@root/components/Statistics";

export default async function Page() {
  return (
    <DefaultLayout>
      <Navbar />
      <Hero />

      <Statistics />

      {/* <Footer /> */}
    </DefaultLayout>
  );
}
// console.log("testttt", getItems());
// let data = getItems();
