import { clearSessionHint, setSessionHint } from "@/api/sessionHint";
import type { StartSessionResponse } from "@/types/types";
import { post } from "@/api/client";

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
  return post<SignUpPayload, SignUpResponse>({
    url: "/auth/signup",
    payload,
  });
};

const signIn = async (payload: LoginPayload) => {
  const data = await post<LoginPayload, StartSessionResponse>({
    url: "/auth/login",
    payload,
  });
  setSessionHint();

  return data;
};

const logOut = async () => {
  try {
    return await post<undefined, LogoutResponse>({ url: "/auth/logout" });
  } finally {
    clearSessionHint();
  }
};

let refreshPromise: Promise<StartSessionResponse> | null = null;

// The backend rotates the session cookie on every refresh, so concurrent
// calls would invalidate each other. Share one in-flight request.
const refreshSession = () => {
  refreshPromise ??= post<undefined, StartSessionResponse>({
    url: "/auth/refresh",
  })
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
