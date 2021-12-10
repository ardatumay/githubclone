
import * as React from "react"
import { BasicList, Queries } from "../../common"
import { Repository } from "../types";
import { RepositoryListItem } from "./RepositoryListItem";

interface IRepositoryListProps {
    className?: string
    searchTerm?: string
}

export const RepositoryList: React.FunctionComponent<IRepositoryListProps> = (props) => {

    const [customReqVariables, setCustomReqVariables] = React.useState<object>({})
    const [listDataToUpdate, setListDataToUpdate] = React.useState<any[]>([])

    const filterSearchResults = (results) => {
        return results?.search?.edges.map(edge => edge.node)
    }

    React.useEffect(() => {
        let query = !!props.searchTerm ? props.searchTerm + " in:name,description,readme" : ""
        setCustomReqVariables({ query })
    }, [props.searchTerm])

    const updateData = (data, setData) => {

        if (listDataToUpdate.length) {
            let updatedList = data.map(item => {
                return listDataToUpdate.map(updatedItem => {
                    if (item.id == updatedItem.id)
                        return updatedItem

                    return item
                })[0]
            })

            setData(updatedList)
            setListDataToUpdate([])
        }

    }

    return (
        <BasicList
            className={"repository-list"}
            size={"large"}
            itemLayout={"horizontal"}
            renderItem={(item: Repository) => <RepositoryListItem item={item} changedListData={(changedData) => setListDataToUpdate(prevState => prevState.concat(changedData))} />}
            filterData={filterSearchResults}
            listQuery={Queries.GET_REPOSITORY}
            defaultRequestParameters={{
                languageCountToFetch: 3
            }}
            customNoDataText={"Oops, no repository found. Try different search text :)"}
            customRequestVariable={customReqVariables}
            updateDataOnPageChange={updateData}
        />
    )
}
