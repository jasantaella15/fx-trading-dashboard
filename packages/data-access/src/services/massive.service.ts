import {
  restClient,
  type DefaultApiGetForexAggregatesRequest,
  type DefaultApiListExchangesRequest,
  type DefaultApiListTickersRequest,
} from "@massive.com/client-js";
import { AxiosError } from "axios";
import { store } from '../state/store'

const rest = restClient(
  import.meta.env.VITE_MASSIVE_API_TOKEN,
  "https://api.massive.com",
);

export async function getTickets(
  signal: AbortSignal,
  params: DefaultApiListTickersRequest = {},
) {
  const response = await rest.listTickers(params, { signal }).catch(catchApiLimitReachedError);
  return response;
}

export async function getExchanges(
  signal: AbortSignal,
  params: DefaultApiListExchangesRequest = {},
) {
  const response = await rest.listExchanges(params, { signal }).catch(catchApiLimitReachedError);
  return response;
}

export async function getForexAggregate(
  signal: AbortSignal,
  params: DefaultApiGetForexAggregatesRequest,
) {
  const response = await rest.getForexAggregates(params, { signal }).catch(catchApiLimitReachedError);
  return response;
}

function catchApiLimitReachedError(error: unknown) {
  if( error instanceof AxiosError){
    const statusCode = error.response?.status;
    if (statusCode === 429) store.onRateLimitReached();
  }
  throw error;
}
