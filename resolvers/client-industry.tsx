import {
  byteInPetabyte,
  changeIntervalToCurrentDate,
  formatKeywordForComparison,
} from "@root/common/utilities";
import {
  CLIENT_ADDRESS_BY_INDUSTRY_FIXTURE,
  INDUSTRY_KEYWORDS_MAP_FIXTURE,
} from "@root/fixtures/industry-fixtures";

export function updateClientIndustryWithUsedDc(industry, address) {
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

export function groupClientsByWeekAndIndustryWithUsedDc(
  clients,
  selectedInterval
) {
  const groupedData = {};
  const startDate = changeIntervalToCurrentDate(selectedInterval);

  clients?.usedDc.forEach((client) => {
    if (!client.usedDc || client.usedDc.length === 0) {
      return;
    }

    client.forEach((record: any) => {
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
          Research: 0,
          "Financial Services": 0,
          Environment: 0,
          Web3: 0,
          "Information, Media & Telecom.": 0,
          "IT & Technology Services": 0,
          "Life Science / Healthcare": 0,
          Other: 0,
        };
      }

      const dataOutgoing = BigInt(record.outgoingDatacap);
      const dataOutgoingInPetabytes = BigInt(dataOutgoing) / byteInPetabyte;

      groupedData[dateString][client.industry] += Number(
        dataOutgoingInPetabytes
      );
    });
  });

  return Object.values(groupedData);
}

export function groupClientsByWeekAndIndustry(clients, interval) {
  const groupedData = {};
  const startDate = changeIntervalToCurrentDate(interval);

  clients?.forEach((client) => {
    if (!client) {
      return;
    }

    const week = client.week;
    const year = client.year;

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
        Research: 0,
        "Financial Services": 0,
        Environment: 0,
        Web3: 0,
        "Information, Media & Telecom.": 0,
        "IT & Technology Services": 0,
        "Life Science / Healthcare": 0,
        Other: 0,
      };
    }

    const dataOutgoing = BigInt(client.outgoingDatacap);
    const dataOutgoingInPetabytes = BigInt(dataOutgoing) / byteInPetabyte;

    groupedData[dateString][client.industry] += Number(dataOutgoingInPetabytes);
  });

  return Object.values(groupedData);
}

export function updateClientIndustries(clients) {
  if (!Array.isArray(clients)) {
    return clients;
  }
  const updatedClients = clients.map((client) => {
    const updatedIndustry = updateClientIndustry(client.industry);
    return { ...client, industry: (updatedIndustry as any).industry };
  });
  return updatedClients;
}

export function updateClientIndustry(industry) {
  if (!industry || typeof industry !== "string") {
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
