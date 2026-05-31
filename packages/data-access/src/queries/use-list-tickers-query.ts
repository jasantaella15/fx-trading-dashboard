import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
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
  params: MaybeRefOrGetter<DefaultApiListTickersRequest> = DEFAULT_PARAMS,
) {
  const resolvedParams = computed(() => ({
    ...DEFAULT_PARAMS,
    ...toValue(params),
  }));

  return useQuery({
    queryKey: ["tickers", resolvedParams],
    queryFn: ({ signal }) => getTickets(signal, resolvedParams.value),
  });
}
