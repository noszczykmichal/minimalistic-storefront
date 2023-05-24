import PropTypes from "prop-types";

import classes from "./ErrorModal.module.css";

function ErrorModal({ errorDetails }) {
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

ErrorModal.propTypes = {
  errorDetails: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default ErrorModal;
