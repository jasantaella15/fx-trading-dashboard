import { useQuery } from "@tanstack/vue-query";
import { getForexAggregate } from "../services/massive.service";
import { type DefaultApiGetForexAggregatesRequest } from "@massive.com/client-js";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export function useGetForexAggregatesQuery(
  params: MaybeRefOrGetter<DefaultApiGetForexAggregatesRequest>,
) {
  const resolvedParams = computed(() => toValue(params));

  return useQuery({
    queryKey: ["aggregates", "forex", resolvedParams],
    queryFn: ({ signal }) => getForexAggregate(signal, resolvedParams.value),
    enabled: computed(() => !!resolvedParams.value.forexTicker),
  });
}
