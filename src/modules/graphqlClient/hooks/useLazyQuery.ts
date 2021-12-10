

import * as React from "react"
import axios from "axios"
import { print } from 'graphql/language/printer'
import { GraphqlClientContext } from ".."
import { ErrorType } from "../types"

export const useLazyQuery = (query, variables = {}) => {

    const { uri, authToken } = React.useContext(GraphqlClientContext)

    const [data, setData] = React.useState<null | object>(null)
    const [error, setError] = React.useState<any>(null)
    const [loading, setLoading] = React.useState<boolean>(false)

    // Convert gql string to raw query string to use in axios request body.
    query = print(query)

    let req: Function = (variablesParam) => {
        if (!!variablesParam)
            variables = variablesParam

        if (!!uri) {
            setLoading(true)
            axios({
                method: 'post',
                url: uri!,
                headers: {
                    Authorization: "Bearer " + authToken
                },
                data: { query, variables }
            }).then((res) => {
                if (!!res.data.errors && res.data.errors.length > 0) {
                    // If previos request was successful but current one is not, set data to null and set error
                    setData(null)
                    setError({ errorType: ErrorType.API_SERVER_ERROR, errors: res.data.errors })
                }
                else {
                    // If previos request was not successful but current one is successful, set error to null and set data
                    setData(res.data.data)
                    setError(null)
                }
            }).catch((errors) => {
                // If previos request was not successful but current one is successful, set error to null and set data
                setData(null)
                setError({ errorType: ErrorType.REQUEST_ERROR, errors })
            }).finally(() => {
                setLoading(false)
            });
        }
        else {
            let err = "No uri defined for grapql client. Please provide it via GraphqlClientContext."
            setError(err)
        }
    }

    const reset = () => {
        setLoading(false)
        setError(null)
        setData(null)
    }

    return [req, data, loading, error, reset]
}