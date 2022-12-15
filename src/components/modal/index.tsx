import useKeypress from "@hooks/useKeyPress";
import { Keys } from "@customTypes/index";
import "./index.scss";

type Props = {
  title: string;
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => any;
  close: () => void;
  loading: boolean;
};
const Modal: React.FC<Props> = ({ title, open, action, close, loading }) => {
  useKeypress(Keys.Escape, close);

  if (!open) return <></>;

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__content__exit">
          <button className="modal__content__exit__button" onClick={close} disabled={loading}>
            X
          </button>
        </div>
        <div className="modal__content__title">{title}</div>
        <div className="modal__content__buttons">
          <button className="modal__content__buttons__yes" onClick={action} disabled={loading}>
            {loading && (
              <div className="fa-1x" style={{ marginRight: 8 }}>
                <i className="fas fa-sync fa-spin"></i>
              </div>
            )}
            YES
          </button>
          <button className="modal__content__buttons__no" onClick={close} disabled={loading}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
