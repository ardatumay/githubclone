
import * as React from "react";

export const GlobalStorageContext = React.createContext<{ state: object, dispatch: Function }>({ state: {}, dispatch: () => { } });
