
import * as React from "react"
import { Avatar, List } from 'antd';

interface IBasicListProps {
    renderItem: (item) => React.ReactNode;
    dataSource: any[]
    itemLayout: "horizontal" | "vertical"
    size: "default" | "large" | "small"
    loading?: boolean
    className?: string
}

export const BasicList: React.FunctionComponent<IBasicListProps> = (props) => {


    const IconText = ({ type, text }) => (
        <span>
            {text}
        </span>
    );


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
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                        <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                        <IconText type="message" text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
            loading={props.loading}
        />
    )
}