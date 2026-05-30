import { useQuery } from '@tanstack/vue-query'
import { getTickets } from '../services/massive.service'


export function useListTickersQuery() {
    return useQuery({
  queryKey: ['tickers'],
  queryFn: () => getTickets(),
  staleTime: 1000 * 60 * 5
})
}