import { updateClientIndustry } from "./client-industry";
import { updateClientRegion } from "./client-regions";

export default function clientRegionIndustryResolver(clients: any) {
  clients.forEach((client) => {
    const clientsByRegions = updateClientRegion(client?.region, client?.name);
    const clientsByIndustry = updateClientIndustry(client.industry);

    client.industry = clientsByIndustry.industry;
    client.region = (clientsByRegions as any).region;
  });

  return clients;
}
