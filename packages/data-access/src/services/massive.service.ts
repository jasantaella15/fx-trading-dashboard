import {
  ListExchangesAssetClassEnum,
  ListTickersMarketEnum,
  restClient,
  type DefaultApiGetForexAggregatesRequest,
  type DefaultApiListExchangesRequest,
  type DefaultApiListTickersRequest,
} from "@massive.com/client-js";

const rest = restClient(
  import.meta.env.VITE_MASSIVE_API_TOKEN,
  "https://api.massive.com",
);

export async function getTickets(
  signal: AbortSignal,
  params: DefaultApiListTickersRequest = {},
) {
  const response = await rest.listTickers(params, { signal });
  return response;
}

export async function getExchanges(
  signal: AbortSignal,
  params: DefaultApiListExchangesRequest = {},
) {
  const response = await rest.listExchanges(params, { signal });
  return response;
}

export async function getForexAggregate(
  signal: AbortSignal,
  params: DefaultApiGetForexAggregatesRequest,
) {
  const response = await rest.getForexAggregates(params, { signal });
  return response;
}
