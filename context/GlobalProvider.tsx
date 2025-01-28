import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getUser, signInWithEmail, supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { Credentials, RegistrationDetails } from "./models";
import { locations } from "lib/utils";

interface GlobalState{
    isLoading: boolean,
    user?: User
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
    const [state, setState] = useState<GlobalState>({ isLoading: true });

    useEffect(() => {
        getUser().then((res) => {
            if(res){
                setState(init => { return { ...init, user: res } }); 
            }else{
                setState(init => { return { ...init, user: undefined } }); 
            }
           
        }).catch((error) => {
            console.log(error)
        }).finally(() => setState(init => { return { ...init, isLoading: true } }));
    }, []);

    const isLoggedIn = useMemo(()=> state.user !== null, [state.user]);

    const login = async(details: Credentials) =>{
        console.log(details)
        const result = await supabase.auth.signInWithPassword({email: details.email, password: details.password});
        if(result){
            console.log(result)
            if(result.data.user){
                setState({isLoading: false, user: result.data?.user})
            }
            
            return { isLoading: false, user: result.data }; 
        }else{
            console.log(result)
            throw new Error("wrong credentias");
        }
    }

    const register = async(details: RegistrationDetails)=> {
        console.log(details)
        const { data, error } = await supabase.auth.signUp({
            email: details.email,
            password: details.password,
            options: {
                
                data: { ...details },
            },
        });

        if(error){
            console.log(details)
              console.log(error)
            throw error;
            
        }

        if(data.user){
            setState(init => { return { ...init, user: data.user! } }); 
        }
    }

    return(
        <GlobalContext.Provider value={{ ...state, login, register, isLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider