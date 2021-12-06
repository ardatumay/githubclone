

import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IRouteItem } from "../types/types";

export const withRouterComponent = (Component, routeConfig: IRouteItem[]) => {

    return (props: typeof Component.props) => {

        const renderRoutes = (config: IRouteItem[]) => {
            return (
                <Routes>
                    {config.map((route, key) => {
                        return (
                            <Route key={key} path={route.path} element={route.element} />
                        )
                    })}
                </Routes>
            )
        }

        return (
            <Router>
                <Component {...props} >
                    {renderRoutes(routeConfig)}
                </Component>
            </Router>
        )
    }

}

