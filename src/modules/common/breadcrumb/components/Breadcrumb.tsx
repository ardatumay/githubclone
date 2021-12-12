
import * as React from "react"
import { Breadcrumb as AntBreadcrumb } from 'antd';

interface IBreadcrumb {
    items: string[]
    className?: string
}

export const Breadcrumb: React.FunctionComponent<IBreadcrumb> = (props) => {

    const [breadcrumbItems, setBreadcrumbItems] = React.useState<string[]>(props.items)

    React.useEffect(() => {
        setBreadcrumbItems(props.items)
    }, [props.items])

    const renderBreadcrumbItems = () => {
        return !!(breadcrumbItems && breadcrumbItems.length) && breadcrumbItems.map((item, key) => <AntBreadcrumb.Item key={key} ><h3>{item}</h3></AntBreadcrumb.Item>)
    }

    return (
        <AntBreadcrumb className={props.className} style={{ margin: '16px 0' }}>
            {renderBreadcrumbItems()}
        </AntBreadcrumb>
    )
}