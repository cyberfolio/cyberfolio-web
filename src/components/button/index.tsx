import styles from "./index.module.scss";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ text, icon, onClick }: ButtonProps): React.JSX.Element => {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {icon && <span className={styles.icon}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
