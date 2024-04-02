import { createContext, useState } from "react";

export const FormDataContext = createContext({
    savedFormData: null,
    setSavedFormData: () => null
});

export const FormDataProvider = ({ children }) => {
    const [ savedFormData, setSavedFormData ] = useState(null)
    const value = { savedFormData, setSavedFormData }

    return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>
}