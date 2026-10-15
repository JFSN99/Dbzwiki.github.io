export type JsonItemOnly = {

    affiliation: string
    deletedAt: null,
    description: string,
    gender: string
    id: number
    image:string
    ki:string,
    maxKi: string,
    name:string,
    race: string,

}

export type IReq = 'characters' | 'planets' | null;

export type JsonTransf = {
    deletedAt: null
    id: number
    image: string
    ki: string
    name: string
}



export type JsonLinks = {

    first: string,
    last: string,
    next: string,
    previous: string

}

export type JsonMeta = {

    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number

}

export type Json = {
    
    items:JsonItemOnly[]
    meta: JsonMeta,
    links: JsonLinks

}

export type LupaEvent = MouseEvent | KeyboardEvent