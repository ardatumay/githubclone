
import axios from "axios";
import { IRouteItem } from '../navigation/types/types';

export const githubGraphqlUri = "https://api.github.com/graphql";

export const routeConfig: IRouteItem[] = [
    {
        path: "/",
        element: <div>Dashboard!</div>,
    },
    {
        path: "/classification-type",
        element: <div>Second Screen</div>,
    }
];

export const configureAxiosInterceptors = () => {

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        if (!!response.data.errors && response.data.errors.length > 0)
            response.data.errors.map((error) => {
                if (error.type == "INSUFFICIENT_SCOPES")
                    console.log(error.message)
            })
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response.status == 401)
            console.log("Bad Credentials. Please be sure you have a valid personal access token.")
        return Promise.reject(error);
    });
}

