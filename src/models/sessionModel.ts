

interface userModelInterface {
    email: string,
    id: string,
    name: string,
    image: string,
}

export interface sessionModelInterface {
    expires: string,
    user: userModelInterface,
}