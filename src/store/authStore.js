import { create } from "zustand";
import axios from "axios";

const API_URL = "https://v-grip-backend.vercel.app/api/v1/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error signing up",
                isLoading: false
            });
            throw new Error(error?.response?.data?.message || "Error signing up");
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error Login",
                isLoading: false
            });
            throw new Error(error?.response?.data?.message || "Error Login in");
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ isLoading: false, error: null, user: null, isAuthenticated: false });
        } catch (error) {
            set({ isLoading: false, error: "error in logout" });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data; // Ensure response is returned
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error verifying email",
                isLoading: false
            });
            throw new Error(error?.response?.data?.message || "Error verifying email");
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ error: null, isAuthenticated: false, isCheckingAuth: false })
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null, message: null })
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data?.message || "Password reset request successful", isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error.data.message })
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({
                message: response.data.message
                , isLoading: false
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },
}));


