import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

interface GlobalState{
    isLoggedIn: boolean,
    isLoading: boolean,
    user?: User
}

export type GlobalContextType = {
    isLoggedIn: boolean,
    isLoading: boolean,
    user?: User,
    setUser: (user: User) => void,
    setIsLoggedIn: (loading: boolean) => void
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
    const [state, setState] = useState<GlobalState>({ isLoading: true, isLoggedIn: false });

    useEffect(() => {
        getUser().then((res) => {
            if(res){
                setState(init => { return { ...init, isLoggedIn: true, user: res } }); 
            }else{
                setState(init => { return { ...init, isLoggedIn: false, user: undefined } }); 
            }
           
        }).catch((error) => {
            console.log(error)
        }).finally(() => setState(init => { return { ...init, isLoading: true } }));
    }, []);

    const setUser = (user: User) => setState(init => { return { ...init, isLoggedIn: true, user } });
    const setIsLoggedIn = (loggedIn: boolean) => setState(init => { return { ...init, isLoggedIn: loggedIn } });

    return(
        <GlobalContext.Provider value={{ ...state, setUser, setIsLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider