import { updateClientIndustry } from "./client-industry";
import { updateClientRegion } from "./client-regions";

export default function clientRegionIndustryResolver(clientsArray) {
  if (!Array.isArray(clientsArray)) {
    return [];
  }

  // Flatten the array of objects into a single object
  const clientsObject = clientsArray.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});

  const clients = [];
  Object.keys(clientsObject).forEach((clientAddress) => {
    const client = clientsObject[clientAddress];
    const clientByRegion = updateClientRegion(client.region, clientAddress);
    const clientByIndustry = updateClientIndustry(
      client.industry,
      clientAddress
    );

    if (clientByIndustry && clientByIndustry.industry !== undefined) {
      client.industry = clientByIndustry.industry;
    } else {
      client.industry = "Uncategorized";
    }

    if (clientByRegion && clientByRegion.region !== undefined) {
      client.region = clientByRegion.region;
    } else {
      client.region = "Uncategorized";
    }

    clients.push(client);
  });

  return clients;
}
