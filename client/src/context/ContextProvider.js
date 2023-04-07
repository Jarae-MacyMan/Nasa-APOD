import { useState } from "react";
import Context from "./context";
import * as React from 'react';


const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);


  const state = {
    user,
    setUser
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default ContextProvider;
