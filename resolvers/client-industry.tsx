import {
  byteInPetabyte,
  formatKeywordForComparison,
} from "@root/common/utilities";
import { INDUSTRY_KEYWORDS_MAP_FIXTURE } from "@root/fixtures/industry-fixtures";

export function updateClientIndustry(industry) {
  if (!industry) {
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

export function groupClientsByWeekAndIndustry(clients) {
  const groupedData = {};

  clients.forEach((client) => {
    const weekDate = new Date(client.createMessageTimestamp * 1000);
    weekDate.setDate(weekDate.getDate() - weekDate.getDay());
    const dateString = weekDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
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

    const dataAmountInPetabytes =
      (BigInt(client.initialAllowance) - BigInt(client.allowance)) /
      byteInPetabyte;

    // Only add the dataAmountInPetabytes if it's not negative
    if (dataAmountInPetabytes >= 0) {
      groupedData[dateString][client.industry] += Number(dataAmountInPetabytes);
    }
  });

  return Object.values(groupedData);
}
