import React, { createContext, useState } from "react";


const Context = createContext({}as any);

function Provider(props: any) {
  const [currentAccount, setCurrentAccount] = useState({});
  
  return (
    <Context.Provider
      value={{ currentAccount, setCurrentAccount }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };