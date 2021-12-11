
import * as React from "react"
import { GlobalStorageContext } from "../.."
import { Breadcrumb } from "..";

export const BreadcrumbContainer: React.FunctionComponent = () => {

    const { state } = React.useContext(GlobalStorageContext)

    return (
        <Breadcrumb items={state.breadcrumb.split(",")} />
    )
}