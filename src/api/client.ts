import axios from "axios";

import { clearSessionHint, setSessionHint } from "@/api/sessionHint";
import { User } from "@/types/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  // only if NestJS sets auth in an httpOnly cookie
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
type LoginResponse = { accessToken: string; user: User; message: string };
type LogoutResponse = { message: string };
type RefreshResponse = { accessToken: string; user: User };

const signUp = async (payload: SignUpPayload) => {
  const { data } = await apiClient.post<SignUpResponse>(
    "/auth/signup",
    payload,
  );

  return data;
};

const signIn = async (payload: LoginPayload) => {
  const data = await apiClient.post<LoginResponse>("/auth/login", payload);
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

let refreshPromise: Promise<RefreshResponse> | null = null;

// The backend rotates the session cookie on every refresh, so concurrent
// calls would invalidate each other. Share one in-flight request.
const refreshSession = () => {
  refreshPromise ??= apiClient
    .post<RefreshResponse>("/auth/refresh")
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
