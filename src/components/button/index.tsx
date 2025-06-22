import "./index.scss";

type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps): React.JSX.Element => {
  return <button className="button">{text}</button>;
};

export default Button;
