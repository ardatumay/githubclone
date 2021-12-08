
import * as React from "react"
import { useLazyQuery } from "../../graphqlClient";

export const useFetchListWithPagination = (requestVariables, query, pageSize, fetchDataOnMount) => {

    const defaultParameters = React.useRef({
        first: pageSize,
        last: null,
        after: null,
        before: null
    }).current

    const [nextPageParameters, setNextPageParameters] = React.useState<object>(defaultParameters)
    const [prevPageParameters, setPrevPageParameters] = React.useState<object>(defaultParameters)

    const [req, data, loading, error] = useLazyQuery(query, {
        ...requestVariables,
        ...nextPageParameters,
    })

    React.useEffect(() => {
        if (fetchDataOnMount)
            req()
    }, [])

    React.useEffect(() => {
        if (!!data) {
            let pageInfo = data.search.pageInfo

            let nextPageParameters = {
                first: pageSize,
                last: null,
                after: pageInfo.endCursor,
                before: null
            }
            setNextPageParameters(nextPageParameters)

            let prevPageParameters = {
                first: null,
                last: pageSize,
                after: null,
                before: pageInfo.startCursor
            }
            setPrevPageParameters(prevPageParameters)
        }
    }, [data])

    let requestNextPage = (customVariables) => req({
        ...requestVariables,
        ...nextPageParameters,
        ...customVariables
    })

    let requestPreviousPage = (customVariables) => req({
        ...requestVariables,
        ...prevPageParameters,
        ...customVariables
    })

    return [requestNextPage, requestPreviousPage, data, loading, error]

}