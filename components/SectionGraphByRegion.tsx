import { MixBarChart } from "./MixBarChart";
import { regionsKeywordsMap } from "@root/fixtures/regions";

function groupClientsByWeekAndRegion(clients) {
  const groupedData = {};

  function getCategorizedRegion(region) {
    if (!region) return "Uncategorized";
    const lowerCaseRegion = region.toLowerCase();
    for (const [key, keywords] of Object.entries(regionsKeywordsMap)) {
      if (
        keywords.some((keyword) =>
          lowerCaseRegion.includes(keyword.toLowerCase())
        )
      ) {
        return key;
      }
    }
    return "Uncategorized";
  }

  clients.data.forEach((client) => {
    const weekDate = new Date(client.createMessageTimestamp * 1000);
    weekDate.setDate(weekDate.getDate() - weekDate.getDay());
    const dateString = weekDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });

    const regionKey = getCategorizedRegion(client.region);

    if (!groupedData[dateString]) {
      groupedData[dateString] = {
        date: dateString,
        Asia: 0,
        Europe: 0,
        NorthAmerica: 0,
        Oceania: 0,
        SouthAmerica: 0,
        Uncategorized: 0,
      };
    }

    let byteInPetabyte = BigInt(1125899906842624);

    const dataAmountInPetabytes =
      (BigInt(client.initialAllowance) - BigInt(client.allowance)) /
      byteInPetabyte;

    groupedData[dateString][regionKey] += Number(dataAmountInPetabytes);
  });

  return Object.values(groupedData);
}

export default function SectionGraphByRegion({ allData }) {
  const groupedClients = groupClientsByWeekAndRegion(allData);

  // Filter data for only 2023
  const data2023 = groupedClients.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate.getFullYear() === 2023;
  });

  const lastTwentyWeeks = data2023.slice(-20);

  // Sort from least to greatest (ascending order)
  const sortedLastTwentyWeeks = lastTwentyWeeks.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return <MixBarChart graphData={sortedLastTwentyWeeks} />;
}
