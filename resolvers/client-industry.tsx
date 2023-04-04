import { Client } from "@root/common/types";
import {
  byteInPetabyte,
  formatKeywordForComparison,
} from "@root/common/utilities";
import {
  CLIENT_ADDRESS_BY_INDUSTRY_FIXTURE,
  INDUSTRY_KEYWORDS_MAP_FIXTURE,
} from "@root/fixtures/industry-fixtures";

export function updateClientIndustry(industry, address) {
  if (!industry || typeof industry !== "string") {
    if (address) {
      const formattedAddressId = formatKeywordForComparison(address);
      let matchedIndustry = null;

      Object.entries(CLIENT_ADDRESS_BY_INDUSTRY_FIXTURE).forEach(
        ([key, value]) => {
          if (
            value.map(formatKeywordForComparison).includes(formattedAddressId)
          ) {
            matchedIndustry = key;
          }
        }
      );
      if (matchedIndustry) {
        return { industry: matchedIndustry };
      }
    }

    return { industry: "Other" };
  }

  const formattedInputIndustry = formatKeywordForComparison(industry);

  for (const [category, keywords] of Object.entries(
    INDUSTRY_KEYWORDS_MAP_FIXTURE
  )) {
    const formattedCategory = formatKeywordForComparison(category);

    if (formattedInputIndustry === formattedCategory) {
      return { industry: category };
    }

    // Check if any keyword is present in the formattedInputIndustry
    const foundKeyword = keywords.find((keyword) =>
      formattedInputIndustry.includes(formatKeywordForComparison(keyword))
    );

    if (foundKeyword) {
      return { industry: category };
    }
  }

  return { industry: "Other" };
}

export function groupClientsByWeekAndIndustry(clients: Client[], interval) {
  // if (!clients) return;

  const groupedData = {};

  clients?.forEach((client) => {
    if (!client.usedDc || client.usedDc.length === 0) {
      return;
    }

    client.usedDc.forEach((record: any) => {
      const week = record.week;
      const year = record.year;

      // const date = new Date(Date.UTC(year, 0, (week - 1) * 7));
      let date;

      if (interval === "month") {
        date = new Date(Date.UTC(year, 0, week - 1, 1));
      } else if (interval === "3month") {
        const monthIndex = Math.floor((week - 1) / 3); //round to nearest integer, group by month index
        date = new Date(Date.UTC(year, monthIndex * 3, 1));
      } else if (interval === "6months") {
        const monthIndex = Math.floor((week - 1) / 6);
        date = new Date(Date.UTC(year, monthIndex * 6, 1));
      } else if (interval === "12months") {
        const monthIndex = Math.floor((week - 1) / 12);
        date = new Date(Date.UTC(year, monthIndex));
      }

      const dateString = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      });

      if (!groupedData[dateString]) {
        groupedData[dateString] = {
          date: dateString,
          Education: 0,
          "Financial Services": 0,
          Environment: 0,
          Web3: 0,
          "Information, Media & Telecommunications": 0,
          "IT & Technology Services": 0,
          "Life Science / Healthcare": 0,
          Other: 0,
        };
      }

      const dataOutgoing = BigInt(record.incomingDatacap);
      const dataOutgoingInPetabytes = BigInt(dataOutgoing) / byteInPetabyte;

      groupedData[dateString][client.industry] += Number(
        dataOutgoingInPetabytes
      );
    });
  });

  return Object.values(groupedData);
}
