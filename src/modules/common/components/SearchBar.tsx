
import * as React from "react"
import { Input } from "antd";
import { globalStorageActions, useGlobalStorage } from "..";

const { Search } = Input;

export const SearchBar: React.FunctionComponent = () => {

    const { dispatch } = useGlobalStorage()

    const [searchText, setSearchText] = React.useState("")

    React.useEffect(() => {
        dispatch({ type: globalStorageActions.UPDATE_SEARCH_TEXT, searchText })
    }, [searchText])

    return (
        <Search style={{ width: "25vw" }} placeholder="Search something" onSearch={setSearchText} allowClear enterButton />
    )
}