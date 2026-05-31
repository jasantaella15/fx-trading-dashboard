import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { getExchanges } from "../services/massive.service";
import {
  ListExchangesAssetClassEnum,
  type DefaultApiListExchangesRequest,
} from "@massive.com/client-js";

const DEFAULT_PARAMS: DefaultApiListExchangesRequest = {
  assetClass: ListExchangesAssetClassEnum.Fx,
};

export function useListExchangesQuery(
  params: MaybeRefOrGetter<DefaultApiListExchangesRequest> = DEFAULT_PARAMS,
) {
  const resolvedParams = computed(() => ({
    ...DEFAULT_PARAMS,
    ...toValue(params),
  }));

  return useQuery({
    queryKey: ["exchanges", resolvedParams],
    queryFn: ({ signal }) => getExchanges(signal, resolvedParams.value),
  });
}
