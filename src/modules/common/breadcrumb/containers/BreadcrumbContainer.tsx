
import * as React from "react"
import { useGlobalStorage } from "../.."
import { Breadcrumb } from "..";

export const BreadcrumbContainer: React.FunctionComponent = () => {

    const { state } = useGlobalStorage()

    return (
        <Breadcrumb items={state.breadcrumb.split(",")} />
    )
}