// JavaScript can't read the httpOnly session cookie, so this flag remembers
// whether the browser may hold one. It lets visitors who never signed in skip
// the /auth/refresh call on startup. It is a hint only: a stale flag costs a
// single 401.
const SESSION_HINT_KEY = "hasSession";

// If storage is unavailable, assume a session may exist so login still
// survives a reload.
export const hasSessionHint = () => {
  try {
    return localStorage.getItem(SESSION_HINT_KEY) === "true";
  } catch {
    return true;
  }
};

export const setSessionHint = () => {
  try {
    localStorage.setItem(SESSION_HINT_KEY, "true");
  } catch {
    // Without storage the app falls back to always calling /auth/refresh.
  }
};

export const clearSessionHint = () => {
  try {
    localStorage.removeItem(SESSION_HINT_KEY);
  } catch {
    // Nothing to clear when storage is unavailable.
  }
};
