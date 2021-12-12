

import * as React from "react";
import { userInitialValue } from "../../user";
import { GlobalStorageContext, initialState } from "../context";

export enum globalStorageActions {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    UPDATE_BREADCRUMB = "UPDATE_BREADCRUMB",
    UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT"
}

function reducer(state, action) {
    let newState;
    switch (action.type) {
        case globalStorageActions.LOGIN:
            newState = { ...state, isLoggedIn: action.isLoggedIn, user: action.user };
            break;
        case globalStorageActions.LOGOUT:
            newState = { ...state, isLoggedIn: false, user: userInitialValue, searchText: "", breadcrumb: "" };
            break;
        case globalStorageActions.UPDATE_BREADCRUMB:
            newState = { ...state, breadcrumb: action.breadcrumb };
            break;
        case globalStorageActions.UPDATE_SEARCH_TEXT:
            newState = { ...state, searchText: action.searchText };
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