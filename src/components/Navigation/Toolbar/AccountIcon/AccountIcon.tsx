import { Link } from "react-router";

import AccountMenu from "@/components/Navigation/Toolbar/AccountMenu/AccountMenu";
import PersonIcon from "@/components/UI/Icons/PersonIcon/PersonIcon";
import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/Toolbar/AccountIcon/AccountIcon.module.css";

export default function AccountIcon() {
  const { status, user } = useAppSelector((state) => state.auth);

  if (status === "authenticated" && user) {
    return <AccountMenu user={user} />;
  }

  if (status === "anonymous") {
    return (
      <Link to="/login" className={classes["account-icon"]}>
        <PersonIcon />
        <span className={classes["account-icon__label"]}>Sign in</span>
      </Link>
    );
  }

  return (
    <span
      className={[
        classes["account-icon"],
        classes["account-icon--checking"],
      ].join(" ")}
    >
      <PersonIcon />
    </span>
  );
}
