
import * as React from "react"
import { GraphqlClientContext } from "../context"

export const useGraphqlClientContext = () => {
    return React.useContext(GraphqlClientContext)
}