
import * as React from "react"
import { List } from 'antd'
import { DocumentNode } from "graphql";
import { useFetchListWithPagination } from "..";
import "./BasicList.scss"

interface IBasicListProps {
    renderItem: (item) => React.ReactNode;
    itemLayout: "horizontal" | "vertical"
    size: "default" | "large" | "small"
    listQuery: DocumentNode
    dataSource?: any[]
    loading?: boolean
    className?: string
    listPageSize?: number
    pageSizeToFetchFromServer?: number
    fetchDataOnMount?: boolean
    defaultRequestParameters?: object
    customNoDataText?: string
    customRequestVariable?: object
    reloadList?: number
    filterData?: (data: any[]) => any[]
    updateDataOnPageChange?: (data: any[], setData: Function) => void
    getRequestResult?: (data: any) => void
}

// Common basic list component to serve common list requirements
// Common requirements can be handled here
// Entity specific list requirements can be handled entity's list component by using this component as compositon
export const BasicList: React.FunctionComponent<IBasicListProps> = (props) => {

    const listPageSize = React.useRef(props.listPageSize || 10).current
    const pageSizeToFetchFromServer = React.useRef(props.pageSizeToFetchFromServer || 50).current

    const [listData, setListData] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

    const [requestNextPage, , reloadAllPages, data, loading, , reset] = useFetchListWithPagination(
        props.defaultRequestParameters, // Supply default request paremeters that does not change after render
        props.listQuery,
        pageSizeToFetchFromServer, // If pageSizeToFetchFromServer is not supplied, fetch 50 items from api by default
        !!props.dataSource ? false : props.fetchDataOnMount // If true, fetch first 50 items on initial page mount, can be useful when the list is not totally depend on a search query. If data source supplied no need to fetch data
    )

    React.useEffect(() => {
        if (!!props.reloadList && props.reloadList > 0) {
            reset()
            reloadAllPages({ first: listData.length, ...props.customRequestVariable })
            setCurrentPage(1)
            setListData([])
        }
    }, [props.reloadList])

    React.useEffect(() => {
        if (!!props.customRequestVariable && Object.keys(props.customRequestVariable).length) {
            reset()
            setListData([])
            setCurrentPage(1)
            requestNextPage(props.customRequestVariable)
        }
    }, [props.customRequestVariable])

    React.useEffect(() => {
        if (!!data) {
            // Data from api can be filtered or modified outside of component
            setListData(prevState => prevState.concat(props.filterData ? props.filterData(data) : data))
            props.getRequestResult && props.getRequestResult(data)
        }
    }, [data])

    React.useEffect(() => {
        if (!!props.customNoDataText && (!listData || !listData.length)) {
            let element = document.querySelector((props.className ? "." + props.className : "") + " .ant-empty-description")
            if (!!element)
                element.innerHTML = props.customNoDataText
        }
    })

    const getListData = () => {
        // List data can be customized outside of component
        if (props.dataSource)
            return props.dataSource

        return listData
    }

    const requestNewPageOnPageChange = (page, pageSize) => {
        !!props.updateDataOnPageChange && props.updateDataOnPageChange(listData, setListData)
        setCurrentPage(page)
        if (page * pageSize >= listData.length)
            requestNextPage(props.customRequestVariable)
    }

    return (
        <List
            className={props.className}
            itemLayout={props.itemLayout}
            size={props.size}
            pagination={{
                onChange: requestNewPageOnPageChange,
                hideOnSinglePage: true,
                pageSize: listPageSize,
                showSizeChanger: false,
                current: currentPage
            }}
            dataSource={getListData()}
            renderItem={props.renderItem}
            loading={loading || props.loading} // if desired, list loading can be controlled independent from its api request
        />
    )
}