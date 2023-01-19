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
    orders: IOrder;
    avatar:string;
}

export interface IBoat {  
    id: number,
    name: string,
    capacity: string,
    queue: string,
    status: string,
    isActive: boolean,
    createdAt:string
}

export interface IAgent {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    orders: IOrder;
    avatar:string;
}



export interface IOrder {
    id: number;
    user: IUser;
    route: IRouteName;
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



