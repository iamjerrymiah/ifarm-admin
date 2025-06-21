import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queryString from 'query-string';
import { customFormdataMutationRequest, fetcher } from '../../utils/api';

const key = 'users';

export const useGetUsers = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const res: any = await fetcher(`/users?${queries}`);
            return res;
        }
    });
};

export const useGetUser = (id: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const res: any = await fetcher(`/users/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customFormdataMutationRequest(`/users`, 'POST', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customFormdataMutationRequest(`/users/${data?.id}`, 'POST', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};