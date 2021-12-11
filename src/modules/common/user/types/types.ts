
export interface IUser {
    login: string
    name: string
    location: string
    avatarUrl: string
    bio: string
    url: string
}

export const userInitialValue = {
    login: "",
    name: "",
    location: "",
    avatarUrl: "",
    bio: "",
    url: ""
}