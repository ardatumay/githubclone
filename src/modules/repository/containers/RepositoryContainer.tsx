
import * as React from "react"
import { RepositoryList } from ".."
import { GlobalStorageContext } from "../../common"

// If there will be forms and different lists about repository entity, their rendering process and conditions can be managed in this component
export const RepositoryContainer: React.FunctionComponent = () => {

    const { state } = React.useContext(GlobalStorageContext)

    return (
        <RepositoryList searchTerm={state.searchText} />
    )
}