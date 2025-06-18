import { useState } from 'react';
import Notify from '../utils/notify';
import { formAltController } from '../utils/utils';

export function useCustomFormState(handleSubmit: Function, initialState: any, extraFn?: Function) {

    const [ formState, setFormStatus ] = useState({ pending: false, success: undefined} as {pending: boolean, success?: undefined | boolean, errors?: any, message?: string, response?: any});
    const [data, setData] = useState({...initialState} as any);

    const onChange = (name: string, value: any, type: string = '', capCased = true) => {

        let errorObj: any = Object.assign({}, formState.errors);
        delete errorObj[name] ;
        setFormStatus((prevState) => {return {...prevState, errors: {...errorObj}, success: undefined}})
        formAltController(name, value, type, setData, capCased);
    }

    const setFormData = (initData?: any, error?: {errors: {}, message: string}) => {
        if(initData)
        {
            setData((prevState: any) => {return {...prevState, ...initData}});
        }
        if(error){
            setFormStatus((prevState) => {return {...prevState, errors: error.errors, message: error.message}})
        }
    }

    const clearFormData = () => {
        setData((prevState: any) => {return {}});
    }

    const inlineAction = async(handleAction: Function) => {
        try{

            setFormStatus((prevState) => {return {...prevState, errors: {}, message: "", pending: true}})

            const res: any = await handleAction(data);

            if(res?.hasError != true){

                setFormStatus((prevState) => {return {...prevState, response: res, success: true, pending: false}})

                Notify.success(res?.message || 'success');

                if(extraFn)
                {
                    extraFn(res);
                }
                return
            }else{
                if(res.message){    
                    Notify.error(res.message);
                }
                if(res.status === 422)
                {
                    setFormStatus((prevState) => {return {...prevState, errors: res.errors, message: res.message, pending: false}})
                    Notify.error('Missing fields');
                }else{
                    setFormStatus((prevState) => {return {...prevState, message: res.message, pending: false}})
                }

                setFormStatus((prevState) => {return {...prevState, success: false, pending: false}})
                return;
            }
            
        }catch(err: any){
            if(err.message){    
                Notify.error(err.message);
            }
            if(err.status === 422)
            {
                setFormStatus((prevState) => {return {...prevState, errors: err.errors, message: err.message, pending: false}})
                Notify.error('Missing fields');
            }else{
                setFormStatus((prevState) => {return {...prevState, message: err.message, pending: false}})
            }

        }
    }

    const formAction = async(e: any) => {
        if(e)
        {
            e?.preventDefault();
            e?.stopPropagation();
        }
        try{
            setFormStatus((prevState) => {return {...prevState, errors: {}, message: "", pending: true}})

            const res: any = await handleSubmit(data);

            if(res?.hasError != true){

                setFormStatus((prevState) => {return {...prevState, response: res, success: true, pending: false}})

                if(extraFn)
                {
                    extraFn(res);
                }
                return
            }else{
                if(res.message){    
                    Notify.error(res.message);
                }
                if(res.status === 422)
                {
                    setFormStatus((prevState) => {return {...prevState, errors: res.errors, message: res.message, pending: false}})
                    Notify.error('Missing fields');
                }else{
                    setFormStatus((prevState) => {return {...prevState, message: res.message, pending: false}})
                }

                setFormStatus((prevState) => {return {...prevState, success: false, pending: false}})
                return;
            }

        }catch(err: any){
            if(err.message){    
                Notify.error(err.message);
            }
            if(err.status === 422)
            {
                setFormStatus((prevState) => {return {...prevState, errors: err.errors, message: err.message, pending: false}})
                Notify.error('Missing fields');
            }else{
                setFormStatus((prevState) => {return {...prevState, message: err.message, pending: false}})
            }

        }

    }

    

  return { data, onChange, formAction, inlineAction, formState, clearFormData, setFormData, setData};
}