import classes from "./ErrorModal.module.css";

type ErrorDetails = {
  message: string;
};

function ErrorModal({ errorDetails }: { errorDetails: ErrorDetails }) {
  return (
    <div className={classes.container}>
      <p className={classes.error}>
        Trying to fetch from the endpoint failed with message:
        <br />
        <span className={classes.error__details}>{errorDetails.message}.</span>
        <br />
        Make sure you are connected to the Internet and try again later.
      </p>
    </div>
  );
}

export default ErrorModal;
