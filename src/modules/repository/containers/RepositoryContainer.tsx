
import * as React from "react"
import { Queries, useFetchListWithPagination } from "../../common"
import { RepositoryList } from ".."

interface IRepositoryContainerProps {
    searchTerm: string
    listPageSize: number
}

export const RepositoryContainer: React.FunctionComponent<IRepositoryContainerProps> = (props) => {

    const [requestNextPage, requestPreviousPage, data, loading, error] = useFetchListWithPagination(
        {
            languageCountToFetch: 3
        },
        Queries.GET_REPOSITORY,
        props.listPageSize,
        false
    )

    React.useEffect(() => {
        let query = props.searchTerm + " in:name,description,readme"
        requestNextPage({ query })
    }, [props.searchTerm])

    const filterSearchResults = (results) => {
        return results?.search?.edges.map(edge => edge.node)
    }

    return (
        <RepositoryList
            data={filterSearchResults(data)}
            loading={loading}
        />
    )
}