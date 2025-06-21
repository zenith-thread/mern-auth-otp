const Button = ({ type, className, onClick, children, loadingState }) => {
  return (
    <button
      disabled={loadingState}
      onClick={onClick}
      type={type}
      className={`${className && className}`}
    >
      {children}
    </button>
  );
};

export default Button;
