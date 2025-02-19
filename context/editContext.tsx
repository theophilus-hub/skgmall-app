import React, { createContext, useContext, useState } from "react";

const EditContext = createContext({
  activeEdit: null as string | null,
  setActiveEdit: (id: string | null) => {},
});

export const EditProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [activeEdit, setActiveEdit] = useState<string | null>(null);
  return (
    <EditContext.Provider value={{ activeEdit, setActiveEdit }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
