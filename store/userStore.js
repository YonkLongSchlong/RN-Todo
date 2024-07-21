import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export default userStore = create((set) => ({
    token: null,
    user: null,
    setUser: async (newUser) => {
        set((state) => ({ user: (state.user = newUser) }));
        await SecureStore.setItemAsync("User", JSON.stringify(newUser));
    },
    setToken: async (newToken) => {
        set((state) => ({ token: (state.token = newToken) }));
        await SecureStore.setItemAsync("Token", newToken);
    },
    getFromSecureStore: async () => {
        const user = await SecureStore.getItemAsync("User");
        const token = await SecureStore.getItemAsync("Token");
        if (user && token) {
            set((state) => ({
                user: (state.user = user),
                token: (state.token = token),
            }));
        }
    },
}));
