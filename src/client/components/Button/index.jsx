const Button = ({ children, onClick }) => (
  <button className="margin-l" onClick={onClick} type="button">
    {children}
  </button>
);
export default Button;
