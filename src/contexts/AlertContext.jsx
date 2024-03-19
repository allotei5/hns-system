import { createContext, useState } from "react";

//actual value to access
export const AlertContext = createContext({
  alert: null,
  setAlert: () => null
});


export const AlertProvider = ({ children }) => {
	
  const [ alert, setAlert ] = useState(null);
  const value = { alert, setAlert }

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>

}