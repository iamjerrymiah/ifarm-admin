import { QueryObserver, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthStateEnum } from "../../utils/axios-setup";
import { customMutationRequest, deleteRequest, fetcher, SECHTTP } from "../../utils/api";
import { storeToken } from "../../constants/constants";
import { useEffect, useState } from "react";

const key = 'auth';

export interface AuthState {
    isAuthenticated: boolean | null;
    authToken: string | null | undefined;
    ifarm_admin_id: string | null | undefined;
    authState: AuthStateEnum;
    user: any | null | undefined | object;
    isLoading: boolean;
    networkFailure: boolean;
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials:any) => {
            queryClient.setQueryData<any>([key], (prevAuth: any) => prevAuth ? {...prevAuth, isLoading: true} : { isLoading: true});

            return customMutationRequest(`/auth/login`, 'POST', credentials).then((res:any) => {
                localStorage.setItem('ifarm_admin_id', res?.data?.id);
                localStorage.setItem(storeToken, res?.data?.token);
                [SECHTTP].forEach(instance => {
                    instance.defaults.headers.common['Authorization'] = `Bearer ${res?.data?.token}`;
                });
                console.log('login', res)
                return res;
            })
        },
        onSuccess: (data) => {
            console.log('log-succ', data)
            const auth: AuthState = {
                isAuthenticated: true,
                authToken: data?.data?.token,
                ifarm_admin_id: data?.data?.id,
                authState: AuthStateEnum.Authenticated,
                user: {...data?.data, fullName: `${data?.data?.firstName} ${data?.data?.lastName}`},
                isLoading: false,
                networkFailure: false,
            };
            queryClient.setQueryData<AuthState>([key], (prevAuth) => prevAuth ? {...prevAuth, ...auth} : auth);

        },onError: () => {
            localStorage.removeItem('ifarm_admin_id');
            localStorage.removeItem(storeToken);
            [SECHTTP].forEach(instance => {
                instance.defaults.headers.common['Authorization'] = '';
            });
            const auth: Partial<AuthState> = {
                isAuthenticated: false,
                authToken: null,
                ifarm_admin_id: null,
                authState: AuthStateEnum.Unauthenticated,
                user: null,
            };
            queryClient.setQueryData<AuthState>([key], (prevAuth) => prevAuth ? {...prevAuth, ...auth} : auth as AuthState);
        }
    });
};


export const useGetAuthState = () => {

    const queryClient = useQueryClient();
    const [auth, setAuth] = useState<AuthState>(() => {
        return queryClient.getQueryData<AuthState>([key]) ?? {
            isAuthenticated: null,
            authToken: null,
            ifarm_admin_id: null,
            authState: AuthStateEnum.Unauthenticated,
            user: null,
            isLoading: false,
            networkFailure: false,
        };
    });

    useEffect(() => {
        const observer = new QueryObserver<AuthState>(queryClient, { queryKey: [key] });

        const unsubscribe = observer.subscribe((result:any) => { if (result.data) setAuth(result.data); });
        return () => { unsubscribe(); };
    }, [queryClient]);

    return auth;
}


export const useGetAuthUser = (execute: boolean = false) => {
    const queryClient = useQueryClient();
    return useQuery<any, Error>({
        queryKey: [`${key}`],
        queryFn: async () => {
            queryClient.setQueryData<any>([key], (prevAuth: any) => prevAuth ? {...prevAuth, isLoading: true} : { isLoading: true});
            const res: any = await fetcher('/user');
            const user: any = {
                ...res,
                fullName: `${res?.data?.firstName} ${res?.data?.lastName}`
            };

            console.log('get-auth', res)

            // Update the auth state with the new user data
            queryClient.setQueryData([`${key}`], user?.data);

            // Update the main auth state
            queryClient.setQueryData<any>([key], (oldData:any) => ({
                ...oldData,
                user: user?.data,
                authToken: localStorage.getItem(storeToken),
                isAuthenticated: true,
                authState: AuthStateEnum.Authenticated,
                ifarm_admin_id: user?.id,
                isLoading: false,
            }));

            return user;
        },
        retry: false,
        enabled: execute,
    });
};


export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            return deleteRequest(`/logout`).then((res:any) => {
                localStorage.removeItem('ifarm_admin_id')
                localStorage.removeItem(storeToken)
                return res;
            })
        },
        onSuccess: () => {
            localStorage.removeItem('ifarm_admin_id')
            localStorage.removeItem(storeToken)
            const auth: Partial<AuthState> = {
                isAuthenticated: false,
                authToken: null,
                ifarm_admin_id: null,
                authState: AuthStateEnum.Unauthenticated,
                user: null,
            };
            queryClient.setQueryData<AuthState>([key], (prevAuth) => prevAuth ? {...prevAuth, ...auth} : auth as AuthState);
        },onError: () => {
            localStorage.removeItem('ifarm_admin_id')
            localStorage.removeItem(storeToken)
            const auth: Partial<AuthState> = {
                isAuthenticated: false,
                authToken: null,
                ifarm_admin_id: null,
                authState: AuthStateEnum.Unauthenticated,
                user: null,
            };
            queryClient.setQueryData<AuthState>([key], (prevAuth) => prevAuth ? {...prevAuth, ...auth} : auth as AuthState);
        }
    });
};