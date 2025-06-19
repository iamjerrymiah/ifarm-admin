import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../utils/api";
import queryString from "query-string";

const key = 'transactions'

export const useGetTransaction = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const res: any = await fetcher(`/transactions?${queries}`);
            return res;
        }
    });
};

export const useGetTransactionStat = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [`${key}-stat`, params],
        queryFn: async () => {
            const res: any = await fetcher(`/transactions/stats?${queries}`);
            return res;
        }
    });
};
