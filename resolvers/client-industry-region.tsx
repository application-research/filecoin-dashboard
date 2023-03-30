import { AllData } from "@root/common/types";
import { updateClientIndustry } from "./client-industry";
import { updateClientRegion } from "./client-regions";

export default function clientRegionIndustryResolver(clients: AllData[]) {
  const clientsArray = Array.from(clients);

  clientsArray.map((client) => {
    const clientsByRegions = updateClientRegion(client?.region, client?.name);
    const clientsByIndustry = updateClientIndustry(client.industry);

    client.industry = clientsByIndustry.industry;
    client.region = (clientsByRegions as any).region;
  });

  return clients;
}
