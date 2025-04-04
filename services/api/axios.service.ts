"use client";

import axios, {
	type AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";

// Shared axios instance
let axiosInstance: AxiosInstance | null = null;

// Initialize axios instance
const initializeAxios = (
	token: string | null,
	signOut: () => void,
	router: ReturnType<typeof useRouter>,
): AxiosInstance => {
	const instance = axios.create({
		baseURL:
			process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
		headers: {
			"Content-Type": "application/json",
		},
		timeout: 10000,
		withCredentials: true,
	});

	// Request interceptor
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			if (token && config.headers) {
				config.headers.Authorization = token.startsWith("Bearer ")
					? token
					: `Bearer ${token}`;
			}

			return config;
		},
		(error: AxiosError) => Promise.reject(error),
	);

	// Response interceptor
	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			if (error.response?.status === 401 || error.response?.status === 403) {
				signOut();
				router.push("/sign-in");
			}

			return Promise.reject(error);
		},
	);

	return instance;
};

// Hook to use axios instance in components
export const useAxios = () => {
	const token = useAuthHeader();
	const signOut = useSignOut();
	const router = useRouter();

	if (!axiosInstance) {
		axiosInstance = initializeAxios(token, signOut, router);
	} else {
		// Update token if changes
		if (axiosInstance.defaults.headers.common.Authorization !== token) {
			axiosInstance.defaults.headers.common.Authorization = token;
		}
	}

	return axiosInstance;
};

// For server-side usage (API routes, getServerSideProps, etc.)
export const getServerAxios = (token?: string) => {
	return axios.create({
		baseURL:
			process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
		},
		timeout: 10000,
	});
};
