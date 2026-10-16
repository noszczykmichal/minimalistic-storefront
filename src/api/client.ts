import axios from "axios";

import { clearSessionHint, setSessionHint } from "@/api/sessionHint";
import type { StartSessionResponse } from "@/types/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

interface LoginPayload {
  email: string;
  password: string;
}

interface SignUpPayload extends LoginPayload {
  firstName: string;
  lastName: string;
}

type SignUpResponse = { message: string };

type LogoutResponse = { message: string };

const signUp = async (payload: SignUpPayload) => {
  const { data } = await apiClient.post<SignUpResponse>(
    "/auth/signup",
    payload,
  );

  return data;
};

const signIn = async (payload: LoginPayload) => {
  const data = await apiClient.post<StartSessionResponse>(
    "/auth/login",
    payload,
  );
  setSessionHint();

  return data;
};

const logOut = async () => {
  try {
    const { data } = await apiClient.post<LogoutResponse>("/auth/logout");

    return data;
  } finally {
    clearSessionHint();
  }
};

let refreshPromise: Promise<StartSessionResponse> | null = null;

// The backend rotates the session cookie on every refresh, so concurrent
// calls would invalidate each other. Share one in-flight request.
const refreshSession = () => {
  refreshPromise ??= apiClient
    .post<StartSessionResponse>("/auth/refresh")
    .then(({ data }) => data)
    .catch((error: unknown) => {
      clearSessionHint();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

export { signUp, signIn, logOut, refreshSession };
