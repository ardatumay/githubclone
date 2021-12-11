
import * as React from "react";

export const GraphqlClientContext = React.createContext<{ uri: string | null, authToken: string | null }>({ uri: null, authToken: null });
GraphqlClientContext.displayName = "GraphqlClientContext";
