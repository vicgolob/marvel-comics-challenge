import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  return <p className="text-error text-bold">{message}</p>;
}

export default ErrorMessage;

ErrorMessage.propTypes = { message: PropTypes.string };
