import createStore from "react-auth-kit/createStore";

export const authStore = createStore({
	authName: "_auth",
	authType: "cookie",
	cookieDomain:
		typeof window !== "undefined" ? window.location.hostname : "localhost",
	cookieSecure:
		typeof window !== "undefined"
			? window.location.protocol === "https:"
			: process.env.NODE_ENV === "production",
});
