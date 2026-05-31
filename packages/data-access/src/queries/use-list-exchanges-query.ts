import { useQuery } from "@tanstack/vue-query";
import { getExchanges } from "../services/massive.service";
import {
  ListExchangesAssetClassEnum,
  type DefaultApiListExchangesRequest,
} from "@massive.com/client-js";

const DEFAULT_PARAMS: DefaultApiListExchangesRequest = {
  assetClass: ListExchangesAssetClassEnum.Fx,
};

export function useListExchangesQuery(
  params: DefaultApiListExchangesRequest = DEFAULT_PARAMS,
) {
  return useQuery({
    queryKey: ["exchanges", params],
    queryFn: ({ signal }) => getExchanges(signal, params),
  });
}
