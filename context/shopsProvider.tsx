import React, { createContext, useState, useEffect, Children, useContext, PropsWithChildren, useCallback, useMemo } from "react";
import { Credentials, Store, StoreCategory } from "./models";
import { supabase } from "lib/supabase";

interface StoresState {
    stores: Store[]
    storeCats: StoreCategory[]
}

export interface StoresContextType extends StoresState {
    loading: boolean,
    error?: any,
    isError: boolean
    refresh: () => Promise<void>
}

export const StoresContext = createContext<StoresContextType | undefined>(undefined);
export const useStoresContext = () => {
    const value = useContext(StoresContext);
    if (!value) {
        throw new Error('useStores must be wrapped inside StoresContextProvider');
    }

    return value;
}

const StoresContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<Omit<StoresContextType, "refresh">>({ storeCats: [], stores: [], loading: true, isError: false });

    const load = async (): Promise<StoresState> => {
        const { data: store_categories, error: categoriesError } = await supabase.from('store_categories').select('*');
        if(categoriesError !== null){
            throw categoriesError;
        }

        let { data: stores, error: storeError } = await supabase.from('stores').select('*');
        if(storeError !== null){
            throw storeError;
        }

        return { stores: stores!, storeCats: store_categories };
    };

    const fetch = async () =>{
        try{
            const response = await load();
            setState(init => { return { ...init, ...response } });
        }catch(error){
            console.error(error);
            setState(init => { return { ...init, isError: true, error: "unable to fetch Stores, please check network connection" } });
        }finally{
            setState(init => { return { ...init, loading: false } })
        }
    }

    const init = useCallback(fetch, []);
    useEffect(() => {
        init()
    }, [init]);

    return (
        <StoresContext.Provider value={{ ...state, refresh: fetch }}>
            {children}
        </StoresContext.Provider>
    )
}

export default StoresContextProvider;