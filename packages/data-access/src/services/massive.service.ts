import { ListTickersMarketEnum, restClient, type DefaultApiListTickersRequest } from '@massive.com/client-js';

const rest = restClient(import.meta.env.VITE_MASSIVE_API_TOKEN, 'https://api.massive.com');

export async function getTickets({market, ...params}: DefaultApiListTickersRequest = {} ){
    const response = await rest.listTickers({market: market ?? ListTickersMarketEnum.Fx ,...params});
    return response;
}
