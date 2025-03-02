import React, { createContext, useContext, useState } from "react";

interface UserEditState{
    active: String | undefined
}

interface UserEditContextState extends UserEditState{
    makeActive: (id: String) => void,
    done: CallableFunction
}

const UserEditContext = createContext<UserEditContextState | null>(null);
export const useUserEditContext = () => {
    const init = useContext(UserEditContext);
    if(init === null){
        throw Error("Component has to be wrapped by UserEditProvider in oder to call UserEditContext");
    }
    return init;
}

export const UserEditProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [ state, setState] = useState<UserEditState>({ active: undefined });
    
    const makeActive = (id: String) => setState({ active: id })
    const done = async () => setState({ active: undefined })
    
    return (
        <UserEditContext.Provider value={{ ...state, makeActive, done }}>
            {children}
        </UserEditContext.Provider>
    );
};
