import React, { createContext, useState, useEffect, Children, useContext, PropsWithChildren, useCallback, useMemo } from "react";
import { Credentials, Store, StoreCategory } from "./models";
import { data, storeCat } from "lib/data";
import { supabase } from "lib/supabase";


interface StoresState {
    stores: Store[]
    storeCats: StoreCategory[]
}


export interface StoresContextType extends Partial<StoresState> {
    loading: boolean,
    error?: any,
    isError: boolean
}

export const StoresContext = createContext<StoresContextType | undefined>(undefined);
export const useStores = () => {
    const value = useContext(StoresContext);

    if (!value) {
        throw new Error('useStores must be wrapped inside StoresContextProvider');
    }
    return value;
}

const StoresContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<StoresState>();
    const [loadingState, setLoadingState] = useState<{ loading: boolean, error?: any, isError: boolean }>({ loading: true, isError: false });


    const load = async (): Promise<StoresState | undefined> => {
        try {
            const delay = (ms: number) => {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }

            await delay(2000);


            const { data: store_categories, error } = await supabase
                .from('store_categories')
                .select('*')

            if (error === null) {
                console.log(store_categories)
                let { data: stores, error: errorstore } = await supabase
                    .from('stores')
                    .select('*')
                if (errorstore === null) {
                    if (store_categories && stores) {
                        console.log(stores)
                        setState({ storeCats: store_categories, stores: stores })
                    }
                } else {
                    console.log(errorstore)
                }
            } else {
                console.log(error)
            }
            if (state?.stores && state.storeCats) {
                return { stores: state?.stores, storeCats: state?.storeCats };
            }
        } catch (e) {
            console.error(e);
        }
    };

    const init = useCallback(async () => {
        if (!state) {
            load().then((savedState) => {
                console.log(JSON.stringify(savedState));
                if (savedState) {
                    setState(savedState);
                    setLoadingState(init => { return { ...init, loading: false } });
                } else {
                    setLoadingState(init => { return { ...init, loading: false, isError: true, error: "unable to fetch Stores, please check network connection" } });
                }
            });
        }
    }, [state]);

    useEffect(() => {
        init();
    }, [state, init]);

    return (
        <StoresContext.Provider value={{ ...state, ...loadingState }}>
            {children}
        </StoresContext.Provider>
    )
}

export default StoresContextProvider;