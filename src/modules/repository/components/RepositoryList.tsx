
import * as React from "react"
import { BasicList } from "../../common"
import { Repository } from "../types";
import { RepositoryListItem } from "./RepositoryListItem";

interface IRepositoryListProps {
    data: Repository[]
    loading: boolean
    className?: string
}

export const RepositoryList: React.FunctionComponent<IRepositoryListProps> = (props) => {

    React.useEffect(() => {
        if (!props.data || !props.data.length) {
            let element = document.querySelector(".repository-list .ant-empty-description")
            if (!!element)
                element.innerHTML = "Oops, no repository found. Try different search text :)"
        }
    }, [props.data])

    return (
        <BasicList
            className={"repository-list"}
            size={"large"}
            itemLayout={"horizontal"}
            dataSource={props.data}
            renderItem={(item: Repository) => <RepositoryListItem item={item} />}
            loading={props.loading}
        />
    )
}
