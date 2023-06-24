import axios, { AxiosResponse } from "axios";

let instance: any = null;

export const fetchUnsplash = () => {
    const config = useRuntimeConfig();

    if (!instance) {
        instance = axios.create({
            headers: {
                Authorization: `Client-ID ${config.public.unsplashKey}`,
            },
            params: {
                orientation: "squarish",
            }
        });

        instance.interceptors.response.use((response: AxiosResponse) => {
            return response.data;
        });
    }

    return instance;
};