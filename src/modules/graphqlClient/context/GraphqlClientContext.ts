
import * as React from "react";

interface IGraphqlClientContext {
    url: string | undefined
    personalAccessToken: string | undefined
    setUrl: Function
    setPersonalAccessToken: Function
}

const initialValue = {
    url: "",
    personalAccessToken: "",
    setUrl: () => { },
    setPersonalAccessToken: () => { }
}

export const GraphqlClientContext = React.createContext<IGraphqlClientContext>(initialValue);
GraphqlClientContext.displayName = "GraphqlClientContext";
