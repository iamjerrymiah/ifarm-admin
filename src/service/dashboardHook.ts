import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { fetcher } from '../utils/api';

const key = 'dashboard';

export const useGetDashboardStats = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const res: any = await fetcher(`/dashboard/stats?${queries}`);
            return res;
        }
    });
};