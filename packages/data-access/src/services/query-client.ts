import { QueryClient } from '@tanstack/vue-query'
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";
import { AxiosError } from 'axios';



const persister = experimental_createQueryPersister({
  storage: window.localStorage,
  maxAge: 1000 * 60 * 60 * 24,
  prefix: 'FX-TRADING'
})

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 5,
            persister: persister.persisterFn,
            retry: false
        }
    }
})

export const retryFailedQueries = async () => {
    await queryClient.refetchQueries({
        type: 'active',
        predicate: (query) => {
            if(query.state.error instanceof AxiosError) {
                const statusCode = query.state.error.response?.status;
                return statusCode === 429; 
            }
            return false;
        }
    })
}