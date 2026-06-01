import { useQuery } from "@tanstack/vue-query";
import { getForexAggregate } from "../services/massive.service";
import {
  GetForexAggregatesTimespanEnum,
  type DefaultApiGetForexAggregatesRequest,
} from "@massive.com/client-js";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export enum ForexAggregatesTimeRangeEnum {
  Day = "1d",
  Week = "1w",
  Month = "1m",
  ThreeMonths = "3m",
  SixMonths = "6m",
  Year = "1y",
  All = "all",
}

export function useGetForexAggregatesQuery(
  params: MaybeRefOrGetter<
    Pick<DefaultApiGetForexAggregatesRequest, "forexTicker"> & {
      timeRange: ForexAggregatesTimeRangeEnum;
    }
  >,
) {
  const resolvedParams = computed(() => {
    const unwrappedParams = toValue(params);
    const forexTicker = unwrappedParams.forexTicker;

    return {
      forexTicker,
      ...buildParams(unwrappedParams.timeRange),
    };
  });

  return useQuery({
    queryKey: ["aggregates", "forex", resolvedParams],
    queryFn: ({ signal }) => getForexAggregate(signal, resolvedParams.value),
    enabled: computed(() => !!resolvedParams.value.forexTicker),
  });
}

function buildParams(timeRange: ForexAggregatesTimeRangeEnum) {
  const from = new Date();
  const to = new Date();
  let timespan = GetForexAggregatesTimespanEnum.Day;
  let multiplier = 1;

  switch (timeRange) {
    case ForexAggregatesTimeRangeEnum.Day:
      from.setDate(from.getDate() - 2);
      timespan = GetForexAggregatesTimespanEnum.Hour;
      break;
    case ForexAggregatesTimeRangeEnum.Week:
      from.setDate(from.getDate() - 7);
      timespan = GetForexAggregatesTimespanEnum.Day;
      break;
    case ForexAggregatesTimeRangeEnum.Month:
      from.setMonth(from.getMonth() - 1);
      timespan = GetForexAggregatesTimespanEnum.Day;
      break;
    case ForexAggregatesTimeRangeEnum.ThreeMonths:
      from.setMonth(from.getMonth() - 3);
      timespan = GetForexAggregatesTimespanEnum.Week;
      break;
    case ForexAggregatesTimeRangeEnum.SixMonths:
      from.setMonth(from.getMonth() - 6);
      timespan = GetForexAggregatesTimespanEnum.Week;
      break;
    case ForexAggregatesTimeRangeEnum.Year:
      from.setFullYear(from.getFullYear() - 1);
      timespan = GetForexAggregatesTimespanEnum.Month;
      break;
    case ForexAggregatesTimeRangeEnum.All:
      from.setFullYear(from.getFullYear() - 2);
      timespan = GetForexAggregatesTimespanEnum.Month;
      multiplier = 2;
      break;
  }
  return {
    to: to.toISOString().split("T")[0],
    from: from.toISOString().split("T")[0],
    timespan,
    multiplier,
  };
}
