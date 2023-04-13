export default function totalClientsWithDealsResolver(totalClients) {
  let totalClientsWithDeals = 0;

  totalClients.map((client) => {
    if (client.dealCount > 1) {
      totalClientsWithDeals += 1;
    }
  });

  return totalClientsWithDeals;
}
