
import * as React from "react"
import { List, Avatar, Space } from 'antd';

interface IBasicListProps {
    renderItem: (item) => React.ReactNode;
    dataSource: any[]
    itemLayout: "horizontal" | "vertical"
    size: "default" | "large" | "small"
    loading?: boolean
    className?: string
}

export const BasicList: React.FunctionComponent<IBasicListProps> = (props) => {

    return (
        <List
            className={props.className}
            itemLayout={props.itemLayout}
            size={props.size}
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={props.dataSource}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={props.renderItem}
            loading={props.loading}
        />
    )
}