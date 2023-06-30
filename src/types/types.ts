export interface ChildrenProps {
    children: React.ReactNode | React.ReactNode[]
}

export type Rating = {
    studentId:string
    grade:number
    visits:number
}

export interface IList {
    _id:string
    name:string
    characters:flashcard[]
    views:number
    description:string
}

export interface IAuth {
    auth:boolean
    accessToken:string
    userId:string
    selectedList:string
    avatar:string
}

export type flashcard={
    _id: string
    string: string
    kDefinition: string
    kMandarin: string
    kTotalStrokes: string
    rating:Rating[]
}

export interface IPopulatedList{
    _id:string
    name:string
    characters:flashcard[]
    views:number
  }
  