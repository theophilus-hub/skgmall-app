import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getUser, signInWithEmail, supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { Credentials, RegistrationDetails } from "./models";

interface GlobalState{
    isLoading: boolean,
    user?: User,
    error?: any
}

export interface GlobalContextType extends GlobalState {
    isLoggedIn: boolean,
    login: (details: Credentials) => Promise<void>,
    register: (details: RegistrationDetails)=> Promise<void>
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
    const init = useContext(GlobalContext);
    if(init === null){
        throw Error("Component has to be wrapped by GlobalProver in oder to call GlobalContext");
    }
    return init;
}

const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<GlobalState>({ isLoading: false });

    useEffect(() => {
        if(state.user === undefined){
            getUser().then((res) => {
                if(res){
                    setState(init => { return { ...init, user: res } }); 
                }else{
                    setState(init => { return { ...init, user: undefined } }); 
                }
            }).catch((error) => {
                console.log(error)
            }).finally(() => setState(init => { return { ...init, isLoading: false } }));
        }
    }, [state.user]);

    const isLoggedIn = useMemo(()=> state.user !== null, [state.user]);

    const login = async(details: Credentials) =>{
        setState(init => { return { ...init, isLoading: true } });
        const { data, error } = await supabase.auth.signInWithPassword({email: details.email, password: details.password});
//  console.log(`I am logging in as ${JSON.stringify(data.user)}`);
        setState(init => { return { ...init, user: data.user === null ? undefined :  data.user, isLoading: false, error: error } });
        if(data.user === null){
            console.log(error)
            throw error;
        }
    }

    const register = async(details: RegistrationDetails)=> {
        setState(init => { return { ...init, isLoading: true } });

        const response = await supabase.auth.signUp({
            email: details.email,
            password: details.password,
            options: {
                data: { ...details },
            },
        });

        setState(init => { return { ...init, user: response.data.user === null ? undefined :  response.data.user, isLoading: false, error: response.error } });
        if(response.error){
            console.log(response.error);
            throw response.error;            
        }
    }

    return(
        <GlobalContext.Provider value={{ ...state, login, register, isLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider