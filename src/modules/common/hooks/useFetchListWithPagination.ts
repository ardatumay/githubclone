
import * as React from "react"
import { useLazyQuery } from "../../graphqlClient";

export const useFetchListWithPagination = (requestVariables, query, pageSize, fetchDataOnMount) => {

    const defaultParameters = React.useRef({
        first: pageSize,
        last: null,
        after: null,
        before: null
    }).current

    const initialRequestMade = React.useRef(false)

    const [nextPageParameters, setNextPageParameters] = React.useState<object>(defaultParameters)
    const [prevPageParameters, setPrevPageParameters] = React.useState<object>(defaultParameters)
    const [reloadAllPagesParameters, setReloadAllPagesParameters] = React.useState<object>(defaultParameters)

    const [req, data, loading, error, resetQuery] = useLazyQuery(query, {
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
                after: pageInfo.endCursor,
            }
            setNextPageParameters(nextPageParameters)

            let prevPageParameters = {
                last: pageSize,
                before: pageInfo.startCursor
            }
            setPrevPageParameters(prevPageParameters)

            if (!initialRequestMade.current) {
                initialRequestMade.current = true
                let reloadAllPagesParameters = {
                    first: pageSize,
                    after: pageInfo.startCursor,
                }
                setReloadAllPagesParameters(reloadAllPagesParameters)
            }

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

    let reloadAllPages = (customVariables) => req({
        ...requestVariables,
        ...reloadAllPagesParameters,
        ...customVariables
    })

    const reset = () => {
        resetQuery()
        setNextPageParameters(defaultParameters)
        setPrevPageParameters(defaultParameters)
        initialRequestMade.current = false
    }

    return [requestNextPage, requestPreviousPage, reloadAllPages, data, loading, error, reset]

}