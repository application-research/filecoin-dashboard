export interface AllData extends Client {
  usedDc: [] | UsedDc[];
}

export interface Allowance {
  addressId: string;
  allowance: string;
  allowanceTTD: null | string;
  auditTrail: string;
  createMessageTimestamp: number;
  error: string;
  hasRemainingAllowance: boolean;
  height: number;
  id: number;
  isEFilAllowance: boolean;
  isFromAutoverifier: boolean;
  isLdnAllowance: boolean;
  issueCreateTimestamp: number;
  msgCID: string;
  retries: number;
  searchedByProposal: boolean;
  usedAllowance: string;
  verifierAddressId: string;
}

export interface Client {
  address: string;
  addressId: string;
  allowance: string;
  allowanceArray: [] | Allowance[];
  auditTrail: string;
  createMessageTimestamp: number;
  createdAtHeight: number;
  dealCount: null | number;
  id: number;
  industry: string;
  initialAllowance: string;
  issueCreateTimestamp: null | number;
  name: string;
  orgName: string;
  providerCount: null | number;
  receivedDatacapChange: string;
  region: string | undefined;
  retries: number;
  topProvider: null | string;
  usedDatacapChange: string;
  usedDc: [] | UsedDc[];
  verifierAddressId: string;
  verifierName: string;
  website: string;
}

export interface UsedDc {
  addressId: string;
  id: number;
  incomingDatacap: null | string;
  outgoingDatacap: null | string;
  week: number;
  year: number;
}

export interface RegionType {
  date: string;
  Asia: number;
  Europe: number;
  "North America": number;
  Oceania: number;
  "South America": number;
  Uncategorized: number;
  "Multiple Regions": number;
}

export interface GroupedDataByRegionAndData {
  date: string;
  Asia: { incoming: number; outgoing: number };
  Europe: { incoming: number; outgoing: number };
  "North America": { incoming: number; outgoing: number };
  Oceania: { incoming: number; outgoing: number };
  "South America": { incoming: number; outgoing: number };
  Uncategorized: { incoming: number; outgoing: number };
}

export enum graphIntervalsEnum  {
  oneMonth = "month",
  threeMonths = "3month",
  sixMonths = "6month",
  twelveMonths = "12month",
  allTime = "allTime;"
}
