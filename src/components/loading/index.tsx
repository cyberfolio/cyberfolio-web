import { useAppSelector } from "@store/functions";
import "./index.scss";

const Index = () => {
  const loading = useAppSelector((state) => state.loading);

  if (loading) {
    return (
      <div className="loading">
        <i className="fa-5x fa-solid fa-arrows-rotate fa-spin"></i>
      </div>
    );
  }
  return <></>;
};

export default Index;
