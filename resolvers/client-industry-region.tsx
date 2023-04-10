import { AllData } from "@root/common/types";
import { updateClientIndustry } from "./client-industry";
import {
  updateClientRegion,
  updateClientRegionWithUsedDc,
} from "./client-regions";

export default function clientRegionIndustryResolver(clients: AllData[]) {
  const clientsArray = Array.from(clients);

  clientsArray.map((client) => {
    const clientsByRegions = updateClientRegionWithUsedDc(
      client?.region,
      client?.address
    );
    const clientsByIndustry = updateClientIndustry(
      client.industry,
      client.address
    );
    client.industry = clientsByIndustry.industry;
    client.region = (clientsByRegions as any).region;
  });

  return clients;
}
