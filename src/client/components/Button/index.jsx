import './styles.css';

const Button = ({ children, onClick, type }) => (
  <button className="button-root" onClick={onClick} type={type}>
    {children}
  </button>
);
export default Button;
