
import * as React from "react";
import { IUser, userInitialValue } from "../user";

interface IGlobalStorage {
    authToken: string
    user: IUser
    breadcrumb: string
    searchText: string
}

export const initialState = {
    authToken: "",
    user: userInitialValue,
    breadcrumb: "",
    searchText: ""
}

export const GlobalStorageContext = React.createContext<{ state: IGlobalStorage, dispatch: Function }>({ state: initialState, dispatch: () => { } });
GlobalStorageContext.displayName = "GlobalStorageContext";