import { Client } from "@root/common/types";
import {
  byteInPetabyte,
  changeIntervalToCurrentDate,
  formatKeywordForComparison,
} from "@root/common/utilities";
import {
  CLIENT_ADDRESS_BY_REGION_FIXTURE,
  REGIONS_KEYWORDS_MAP_FIXTURE,
} from "@root/fixtures/regions-fixtures";

export function getCategorizedRegion(region) {
  if (!region) return "Uncategorized";

  const lowerCaseRegion = region?.toLowerCase();

  for (const [key, keywords] of Object.entries(REGIONS_KEYWORDS_MAP_FIXTURE)) {
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

export function updateClientRegions(clients) {
  if (!Array.isArray(clients)) {
    return clients;
  }

  const updatedClients = clients.map((client) => {
    const updatedRegion = updateClientRegion(client.region, client.name);
    return { ...client, region: (updatedRegion as any).region };
  });
  return updatedClients;
}

export function updateClientRegion(region, address) {
  if (!region || typeof region !== "string") {
    if (address) {
      const formattedAddress = formatKeywordForComparison(address);
      let matchedRegion = null;

      Object.entries(CLIENT_ADDRESS_BY_REGION_FIXTURE).forEach(
        ([key, value]) => {
          if (
            value.map(formatKeywordForComparison).includes(formattedAddress)
          ) {
            matchedRegion = key;
          }
        }
      );

      if (matchedRegion) {
        return { region: matchedRegion };
      }
    }
    return { region: "Uncategorized" };
  }

  const lowerCaseRegion = region.toLowerCase();

  for (const [key, keywords] of Object.entries(REGIONS_KEYWORDS_MAP_FIXTURE)) {
    if (
      keywords.some((keyword) =>
        lowerCaseRegion.includes(keyword.toLowerCase())
      )
    ) {
      return { region: key };
    }
  }

  return "Uncategorized";
}

export function groupClientsByWeekAndRegion(clients, interval) {
  const groupedData = {};

  const startDate = changeIntervalToCurrentDate(interval);

  clients?.forEach((client) => {
    if (!client.usedDc || client.usedDc.length === 0) {
      return;
    }

    const regionKey = getCategorizedRegion(client.region);

    client.usedDc.forEach((record) => {
      const week = record.week;
      const year = record.year;

      const clientReadableDate = new Date(year, 0, 1 + (week - 1) * 7);
      if (clientReadableDate < startDate) {
        return;
      }

      const dateString = clientReadableDate.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      });

      if (!groupedData[dateString]) {
        groupedData[dateString] = {
          date: dateString,
          Asia: 0,
          Europe: 0,
          "North America": 0,
          Oceania: 0,
          "South America": 0,
          Uncategorized: 0,
        };
      }
      const dataOutgoing = BigInt(record.incomingDatacap);
      const dataOutgoingInPetabytes = BigInt(dataOutgoing) / byteInPetabyte;

      groupedData[dateString][regionKey] += Number(dataOutgoingInPetabytes);
    });
  });

  return Object.values(groupedData);
}
