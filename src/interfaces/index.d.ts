import { GridEnrichedColDef } from "@pankod/refine-mui";

export interface IRouteName {
    route:  "valaam" | "shchery" | "valaam and shchery";
}

export interface IOrderStatus {
    text:  "payment is expected" | "paid" | "done" | "cancelled";
}

export interface IUser {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    avatar:string;
}

export interface IBoat {  
    id: number,
    name: string,
    capacity: string, image?:string
    desc?:string
    isActive: boolean,
    createdAt:string
   
}

export interface IAgent {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    avatar:string;
}

export interface INews {
    id:number;
    image?:string;
    title:string;
    text:string;
    createdAt: string;
    author:number;
}


export interface IOrder {
    id: number;
    user: IUser;
    route: IRouteName;
    boat: IBoat;
    status: IOrderStatus;
    agent: IAgent;
    date: string;
    createdAt: string;
    }

export interface IOrderFilterVariables {
    q?: string;
    status?: string[];
    route?: string[];
}

export interface IUserFilterVariables {
    q: string;   
}
export interface IAgentFilterVariables {
    q: string;  
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}



