// const REQUEST_HEADERS = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// const getHeaders = (key) => {
//   return { ...REQUEST_HEADERS, Authorization: `${process.env.API_KEY}` };
// };

// export async function getViewer({ key }) {
//   const response = await fetch(
//     `api.filplus.d.interplanetary.one/public/api/getVerifiedDeals?limit=25&page=1`,
//     {
//       method: "GET",
//       headers: getHeaders(process.env.API_KEY),
//     }
//   );

//   const json = await response.json();
//   return json;
// }

// export async function placeholder(key) {
//   const response = await fetch("/api", {
//     method: "GET",
//     headers: getHeaders(key),
//   });

//   const json = await response.json();
//   return json;
// }
