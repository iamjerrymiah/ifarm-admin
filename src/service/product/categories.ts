import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { fetcher } from '../../utils/api';

const key = 'categories';

export const useGetCategories = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const res: any = await fetcher(`/categories?${queries}`);
            return res;
        }
    });
};

export const useGetCategory = (id: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const res: any = await fetcher(`/categories/${id}`);
            return res;
        },
        enabled: !!id,
    });
};