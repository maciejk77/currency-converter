import './styles.css';

const Button = ({ children, onClick }) => (
  <button className="button-root" onClick={onClick} type="button">
    {children}
  </button>
);
export default Button;
