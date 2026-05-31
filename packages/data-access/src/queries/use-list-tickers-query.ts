import { useQuery } from "@tanstack/vue-query";
import { getTickets } from "../services/massive.service";
import {
  ListTickersMarketEnum,
  type DefaultApiListTickersRequest,
} from "@massive.com/client-js";

const DEFAULT_PARAMS: DefaultApiListTickersRequest = {
  market: ListTickersMarketEnum.Fx,
  limit: 1000
};

export function useListTickersQuery(
  params: DefaultApiListTickersRequest = DEFAULT_PARAMS,
) {
  return useQuery({
    queryKey: ["tickers", params],
    queryFn: ({ signal }) => getTickets(signal, params),
  });
}
