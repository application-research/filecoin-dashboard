import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";

import Navbar from "@root/components/Navbar";
import Footer from "@root/components/Footer";
import Statistics from "@root/components/Statistics";
import Hero from "@root/components/Hero";

export default async function Page() {
  return (
    <DefaultLayout>
      <Navbar />
      <Hero />
      <div style={{ display: "grid", rowGap: "var(--p-large-xxl)" }}>
        <Statistics />
        <Footer />
      </div>
    </DefaultLayout>
  );
}
