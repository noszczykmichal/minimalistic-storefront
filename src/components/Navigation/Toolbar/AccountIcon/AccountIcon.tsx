// src/components/Navigation/Toolbar/AccountIcon/AccountIcon.tsx
import { Link } from "react-router";

import classes from "@/components/Navigation/Toolbar/AccountIcon/AccountIcon.module.css";

export default function AccountIcon() {
  return (
    <Link to="/login" className={classes["account-icon"]} aria-label="Sign in">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    </Link>
  );
}
