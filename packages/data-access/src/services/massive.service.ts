import { ListTickersMarketEnum, restClient, type DefaultApiListTickersRequest } from '@massive.com/client-js';

const apiKey = "rkIgBpWjHzNyPdSyffF3Y5yoip1k6HAz";
const rest = restClient(apiKey, 'https://api.massive.com');

export async function getTickets({market, ...params}: DefaultApiListTickersRequest = {} ){
    const response = await rest.listTickers({market: market ?? ListTickersMarketEnum.Fx ,...params});
    return response;
}