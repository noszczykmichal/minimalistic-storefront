import { useEffect, useState } from "react";

const getSecondsLeft = (expiresAt: number) =>
  Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

export default function useSecondsLeft(expiresAt: number) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getSecondsLeft(expiresAt),
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsLeft(getSecondsLeft(expiresAt)),
      1000,
    );
    return () => clearInterval(intervalId);
  }, [expiresAt]);

  return secondsLeft;
}
