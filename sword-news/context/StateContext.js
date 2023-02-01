import React,{createContext, useContext, useState} from 'react';


const Context = createContext();

export const StateContext = ({children}) => { 

  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  
  return (
    <Context.Provider
      value={{
        showDropdown,
        setShowDropdown,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  )
} 

export const useStateContext = () => useContext( Context)
