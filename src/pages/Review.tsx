import { useNavigate } from "react-router";

import classes from "./Review.module.css";
import Button from "../components/UI/Button";

function Review() {
  const navigate = useNavigate();

  return (
    <section className={classes.section}>
      <h1>Here&apos;s summary of your current buy</h1>

      <Button customClass={classes.form__button} clicked={() => navigate(-1)}>
        Back
      </Button>
    </section>
  );
}

export default Review;
