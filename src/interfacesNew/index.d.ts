


export interface IOrderStatus {
    id: number;
    text: "Payment is expected" | "Paid" | "Done" | "Cancelled";
}

export interface IUser {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
}

export interface IAgent {
    id: number;
    name: string;
    phone: string;
    email?: string;
    createdAt: string;
}

export interface IRoute {
    id: number;
    route: "Valaam" | "Shchery" | "Valaam and Shchery";
}

export interface IOrder {
    id: number;
    orderNumber: number;
    user: IUser;
    route: IRoute;
    status: IOrderStatus;
    agent: IAgent;
    date: string;
    createdAt: string;
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



