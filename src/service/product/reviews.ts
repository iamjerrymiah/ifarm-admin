import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher, customMutationRequest, deleteRequest } from '../../utils/api';

const key = 'products'

export const useGetProductReviews = (id: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const res: any = await fetcher(`/products/reviews/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateProductReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customMutationRequest(`/products/reviews/${data?.id}`, 'POST', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useDeleteProductReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return deleteRequest(`/products/reviews/${data?.id}`).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};