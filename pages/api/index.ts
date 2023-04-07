import * as Server from "@common/server";

// NOTE(jim):
// CORS API example.
export async function apiIndex(req, res) {
  await Server.cors(req, res);

  res.json({ succes: true });
}

export async function fetchAllClientsLatest(
  intervalStartTimestamp,
  intervalEndTimestamp
) {
  let allClients = [];
  let page = 1;
  const limit = 49;

  while (page < 80) {
    const res = await fetch(
      `https://api.datacapstats.io/api/getVerifiedClientsDatacapUsage?&limit=${limit}&page=${page}&intervalStartTimestamp=${intervalStartTimestamp}&intervalEndTimestamp=${intervalEndTimestamp}`
    );

    const clients = await res.json();

    if (clients.data.length === 0) {
      break;
    }

    allClients = allClients.concat(clients.data);
    page++;

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return allClients;
}

export async function fetchAllClients(
  intervalStartTimestamp,
  intervalEndTimestamp
) {
  let allClients = [];
  let page = 1;
  const limit = 49;

  while (page < 20) {
    const res = await fetch(
      `https://api.datacapstats.io/api/getVerifiedClientsExtended?page=${page}&limit=${limit}&intervalStartTimestamp=${intervalStartTimestamp}&intervalEndTimestamp=${intervalEndTimestamp}`
    );

    const clients = await res.json();

    if (clients.data.length === 0) {
      break;
    }

    allClients = allClients.concat(clients.data);
    page++;

    await new Promise((resolve) => setTimeout(resolve, 1700));
  }

  return allClients;
}

export async function fetchClientsPerPage(itemsPerPage, currentPage) {
  const res = await fetch(
    `https://api.datacapstats.io/api/getVerifiedClients?limit=${itemsPerPage}&page=${currentPage}&count=true`
  );

  const { count, data } = await res.json();

  return { count, data };
}

export async function fetchTotalClients() {
  const res = await fetch(
    `https://api.datacapstats.io/api/getVerifiedClients?limit=none`
  );

  const { count, data } = await res.json();

  return { count, data };
}
