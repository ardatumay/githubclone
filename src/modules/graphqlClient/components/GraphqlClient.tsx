
import * as React from "react"
import { GraphqlClientContext } from "../context"

interface IGraphqlClientProps {
    url?: string
    personalAccessToken?: string
}

export const GraphqlClient: React.FunctionComponent<IGraphqlClientProps> = (props) => {

    const [url, setUrl] = React.useState<string | undefined>(props.url)
    const [personalAccessToken, setPersonalAccessToken] = React.useState<string | undefined>(props.personalAccessToken)

    return (
        <GraphqlClientContext.Provider value={{ url, personalAccessToken, setUrl, setPersonalAccessToken }} >
            {props.children}
        </GraphqlClientContext.Provider>
    )
}