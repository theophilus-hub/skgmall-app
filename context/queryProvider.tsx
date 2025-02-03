import React, { createContext, useState, useEffect, Children, useContext, PropsWithChildren, useCallback, useMemo } from "react";
import { Credentials, Store, StoreCategory } from "./models";
import { supabase } from "lib/supabase";

interface QueryState {
    inFocus: boolean, value: string, results: any[]
}

export interface QueryContextType extends QueryState {
    loading: boolean,
    error?: any,
    isError: boolean,
    onQueryChange: (value: string) => void,
    setFocus: (value: boolean) => void
}

export const QueryContext = createContext<QueryContextType | undefined>(undefined);
export const useQueryContext = () => {
    const value = useContext(QueryContext);
    if (!value) {
        throw new Error('useQuery must be wrapped inside QueryContextProvider');
    }

    return value;
}

const QueryContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<Omit<QueryContextType, "onQueryChange" | "setFocus">>({ loading: false, inFocus: false, value: "", results: [],  isError: false });

    const load = async (query: string): Promise<any[]> => {
        setState(init => { return { ...init, loading: true } });
        const delay = async (duration: number) =>{
            return new Promise<void>((resolve, reject)=>{
               setTimeout(()=> { resolve(); }, duration * 100) 
            });
        } 

        await delay(2);

        return [];
    };

    const onQueryChange = async (value: string) =>{
        setState(init => { return { ...init, value } });
        if(!state.loading){
            try{
                const response = await load(value);
                console.log(JSON.stringify(response));
                setState(init => { return { ...init, results: response } });
            }catch(error){
                console.error(error);
                setState(init => { return { ...init, isError: true, error: `unable to fetch results for ${state.value}, please check network connection` } });
            }finally{
                setState(init => { return { ...init, loading: false } });
            }
        }
    }

    const setFocus = (value: boolean) => setState(init => { return { ...init, inFocus: value } });

    return (
        <QueryContext.Provider value={{ ...state, onQueryChange, setFocus }}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider;