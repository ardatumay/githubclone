
import * as React from "react";
import { IUser, userInitialValue } from "../../user";

interface IGlobalStorage {
    isLoggedIn: boolean
    user: IUser
    breadcrumb: string
    searchText: string
}

export const initialState = {
    isLoggedIn: false,
    user: userInitialValue,
    breadcrumb: "",
    searchText: ""
}

export const GlobalStorageContext = React.createContext<{ state: IGlobalStorage, dispatch: Function }>({ state: initialState, dispatch: () => { } });
GlobalStorageContext.displayName = "GlobalStorageContext";