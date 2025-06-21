import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queryString from 'query-string';
import { customMutationRequest, deleteRequest, fetcher } from '../../utils/api';

const key = 'products';

export const useGetProducts = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params, "products-images"],
        queryFn: async () => {
            const res: any = await fetcher(`/products?${queries}`);
            return res;
        }
    });
};

export const useGetProduct = (id: any) => {
    return useQuery({
        queryKey: [key, id, "products-images"],
        queryFn: async () => {
            const res: any = await fetcher(`/products/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customMutationRequest(`/products`, 'POST', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customMutationRequest(`/products/${data?.id}`, 'PATCH', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return deleteRequest(`/products/${data?.id}`).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};