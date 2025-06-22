import AppHooks from "hooks";
import "./index.scss";

const Loading = () => {
  const loading = AppHooks.useAppSelector((state) => state.loading);

  if (loading.state) {
    return (
      <div className="loading">
        <i className="fa-5x fa-solid fa-arrows-rotate fa-spin"></i>
        {loading.message && <div className="loading__message"> {loading.message}</div>}
      </div>
    );
  }
  return <></>;
};

export default Loading;
