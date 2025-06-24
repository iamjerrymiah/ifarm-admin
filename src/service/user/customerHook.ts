import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queryString from 'query-string';
import { customFormdataMutationRequest, customMutationRequest, deleteRequest, fetcher } from '../../utils/api';

const key = 'support-ticket';

export const useGetSupportTickets = (params:any) => {
    let queries = !!params ? queryString.stringify(params) : '';
    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const res: any = await fetcher(`/support-tickets?${queries}`);
            return res;
        }
    });
};

export const useGetSupportTicket = (id: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const res: any = await fetcher(`/support-tickets/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateSupportTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customMutationRequest(`/support-tickets`, 'POST', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useUpdateSupportTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customMutationRequest(`/support-tickets/${data?.id}`, 'PATCH', data).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};

export const useDeleteSupportTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return deleteRequest(`/support-tickets/${data?.id}`).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
        },
    });
};


//Attachmnents
export const useGetTicketAttachments = (id: any) => {
    return useQuery({
        queryKey: [`${key}-attach`, id],
        queryFn: async () => {
            const res: any = await fetcher(`/support-tickets/attachments/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateTicketAttachment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customFormdataMutationRequest(`/support-tickets/attachments/${data[0]}`, 'POST', data[1]).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${key}-attach`] });
        },
    });
};

export const useDeleteTicketAttachment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return deleteRequest(`/support-tickets/attachments/${data?.id}`).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${key}-attach`] });
        },
    });
};


//Communication
export const useGetTicketCommunications = (id: any) => {
    return useQuery({
        queryKey: [`${key}-comm`, id],
        queryFn: async () => {
            const res: any = await fetcher(`/support-tickets/communications/${id}`);
            return res;
        },
        enabled: !!id,
    });
};

export const useCreateTicketCommunication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return customFormdataMutationRequest(`/support-tickets/communications/${data[0]}`, 'POST', data[1]).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${key}-comm`] });
        },
    });
};

export const useDeleteTicketCommunication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return deleteRequest(`/support-tickets/communications/${data?.id}`).then((res:any) => res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${key}-comm`] });
        },
    });
};

