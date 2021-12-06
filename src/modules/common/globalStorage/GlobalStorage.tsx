

import * as React from "react";
import { GlobalStorageContext } from "./GlobalStorageContext";

export enum globalStorageActions {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

const initialState = {
    authToken: null,
    isLoggedIn: false
}

function reducer(state, action) {
    let newState;
    switch (action.type) {
        case globalStorageActions.LOGIN:
            newState = { ...state, authToken: action.authToken, isLoggedIn: !!action.authToken };
            break;
        case globalStorageActions.LOGOUT:
            newState = { ...state, authToken: null, isLoggedIn: false };
            break;
        default:
            break;
    }
    return newState;
}

export const GlobalStorage: React.FC = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <GlobalStorageContext.Provider value={{ state, dispatch }}>
            {props.children}
        </GlobalStorageContext.Provider>
    )
}