
import axios from "axios";
import { message } from 'antd';
import { IRouteItem } from '../navigation/types/types';
import { RepositoryContainer } from "../repository";

export const githubGraphqlUri = "https://api.github.com/graphql";

export const routeConfig: IRouteItem[] = [
    {
        path: "/repository",
        element: <RepositoryContainer />,
    },
    {
        path: "/login",
        element: <div>Second Screen</div>,
    }
];

export const configureAxiosInterceptors = () => {

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        if (!!response.data.errors && response.data.errors.length > 0)
            response.data.errors.map((error) => {
                if (error.type == "INSUFFICIENT_SCOPES") {
                    console.log(error.message)
                    message.error("Your token has not been granted the required scopes to execute this operation. Please grant scopes at https://github.com/settings/tokens ", 10);
                }
            })
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response.status == 401) {
            console.log("Bad Credentials. Please be sure you have a valid personal access token.")
            message.error("Bad Credentials. Please be sure you have a valid personal access token.")
        }
        return Promise.reject(error);
    });
}

