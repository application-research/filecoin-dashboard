import {
  byteInPetabyte,
  formatKeywordForComparison,
} from "@root/common/utilities";
import {
  CLIENT_NAME_BY_REGION_FIXTURE,
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

export function updateClientRegions(clients: any) {
  clients.map((client) => {
    const updatedRegion = updateClientRegion(client.region, client.name);

    return { ...client, region: (updatedRegion as any).region };
  });

  return clients;
}

export function updateClientRegion(region, clientName = null) {
  if (!region || typeof region !== "string") {
    if (clientName) {
      const formattedClientName = formatKeywordForComparison(clientName);
      let matchedRegion = null;
      Object.entries(CLIENT_NAME_BY_REGION_FIXTURE).forEach(([key, value]) => {
        if (
          value.map(formatKeywordForComparison).includes(formattedClientName)
        ) {
          matchedRegion = key;
        }
      });

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

export function groupClientsByWeekAndRegion(clients) {
  const groupedData = {};

  clients.forEach((client) => {
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
        "North America": 0,
        Oceania: 0,
        "South America": 0,
        Uncategorized: 0,
      };
    }

    const dataAmountInPetabytes =
      (BigInt(client.initialAllowance) - BigInt(client.allowance)) /
      byteInPetabyte;

    if (dataAmountInPetabytes >= 0) {
      groupedData[dateString][regionKey] += Number(dataAmountInPetabytes);
    }
  });

  return Object.values(groupedData);
}
