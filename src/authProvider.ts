import { AuthProvider } from "@pankod/refine-core";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
        return Promise.resolve();
    },
    register: async ({ email, password }) => {
        try {
            await authProvider.login({ email, password });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject();
        }
    },
    updatePassword: async () => {
        return Promise.resolve();
    },
    forgotPassword: async () => {
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve([`agent`]),
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 777,
            name: "Алексей Колесников",
            avatar: "https://cs6.pikabu.ru/avatars/1724/v1724973-2109843858.jpg",
            phone:'+7 999 921 92 92',
            email:"baseagent@ya.ru"
        });
    },
};
