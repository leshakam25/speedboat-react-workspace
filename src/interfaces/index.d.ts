import { GridEnrichedColDef } from "@pankod/refine-mui";

export interface IRouteName {
    route:  "valaam" | "shchery" | "valaam and shchery";
}

export interface IOrderStatus {
    text:  "payment is expected" | "paid" | "done" | "cancelled";
}

export interface IOrder {
    id: number;
    user: number;
    route: number;
    boat: number;
    status: string;   
    date: string;
    createdAt: string;
    desc: string;
    agent: number;
}

export interface IUser {
    id: number; 
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    avatar:string;
}

export interface IAgent {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    avatar:string;
}

export interface IBoat {  
    id: number;
    name: string;
    capacity: number; 
    image?:string;
    desc?:string;
    isActive: boolean;
    createdAt:string;
    priority:number;
}
export interface IRoute {  
    id: number,
    name: string,
    length: number, 
    price: number,
    time:number,
    images?:string[],
    desc?:string,
    isActive: boolean,
    createdAt:string
}
    

export interface INews {
    id:number;
    image?:string;
    title:string;
    text:string;
    createdAt: string;
    author:number; //ID текущего агента
}

export interface ITimeSpot {
    id:number;
    time:string;
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



