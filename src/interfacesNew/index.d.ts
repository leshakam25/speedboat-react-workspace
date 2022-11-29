export interface IRouteName {
    id: number;
    route: "valaam" | "shchery" | "valaam and shchery";
}

export interface IOrderStatus {
    id: number;
    text: | "paid" | "done" | "cancelled";
}

export interface IUser {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    orders: IOrder;
}

export interface IAgent {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
    orders: IOrder;
}



export interface IOrder {
    id: number;
    orderNumber: number;
    user: IUser;
    route: IRouteName;
    status: IOrderStatus;
    agent: IAgent;
    date: string;
    createdAt: string;
    // 
}

export interface IOrderFilterVariables {
    q?: string;
    phone?: string;
    user?: string;
    status?: string[];
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}



