
import * as React from "react"
import { GlobalStorageContext } from "../context"

export const useGlobalStorage = () => {

    return React.useContext(GlobalStorageContext)
}