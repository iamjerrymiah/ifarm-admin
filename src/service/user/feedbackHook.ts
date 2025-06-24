import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queryString from 'query-string';
import { customMutationRequest, fetcher } from '../../utils/api';

const key = 'feedback';

export const useGetFeedbacks = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const res: any = await fetcher(`/feedbacks?${queries}`);
            return res;
        }
    });
};

export const useGetFeedback = (id: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const res: any = await fetcher(`/feedbacks/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useHideFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customMutationRequest(`/feedbacks/hide/${data?.id}`, 'POST', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};