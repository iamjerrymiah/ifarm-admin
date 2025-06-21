import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher, customFormdataMutationRequest, deleteRequest } from '../../utils/api';

const key = 'products-images'

export const useGetProductImages = (id: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const res: any = await fetcher(`/products/images/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateProductImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any[]) => {
            return customFormdataMutationRequest(`/products/images/${data[0]}`, 'POST', data[1]).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useDeleteProductImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return deleteRequest(`/products/images/${data?.id}`).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};