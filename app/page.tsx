import "@root/global.scss";

import DefaultLayout from "@components/DefaultLayout";
import Hero from "@root/components/Hero";
import Navbar from "@root/components/Navbar";
import Statistics from "@root/components/Statistics";
import Footer from "@root/components/Footer";

export default async function Page() {
  return (
    <DefaultLayout>
      <Navbar />
      <Hero />

      <Statistics />

      <Footer />
    </DefaultLayout>
  );
}
