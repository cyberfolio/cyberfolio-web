import styles from "./index.module.scss";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  successBorder?: boolean;
  tooltip?: string;
};

const Button = ({ text, icon, onClick, successBorder, tooltip }: ButtonProps): React.JSX.Element => {
  return (
    <button className={`${styles.button} ${successBorder ? styles.successBorder : ""}`} onClick={onClick} type="button">
      {text}
      {icon && <span className={styles.icon}>{icon}</span>}
      {tooltip && <span className={styles.tooltipBottom}>{tooltip}</span>}
    </button>
  );
};

{
  /* <div
                className={classNames(
                  "home__header__add__cex",
                  connectedCexes.some((connectedCex) => connectedCex.name === cex) && "home__header__add__cex--active",
                )}
                key={cex}
                onClick={() => openAddCexModal(cex)}
              >
                {cex} {connectedCexes.some((connectedCex) => connectedCex.name === cex) ? "Connected" : "Account"}
                {connectedCexes.some((connectedCex) => connectedCex.name === cex) ? (
                  <span className="connected-dot-button"></span>
                ) : (
                  <Plus color="white" size={20} />
                )}
              </div> */
}

export default Button;
