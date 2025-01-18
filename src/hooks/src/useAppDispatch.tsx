import store from "store/index";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from "react-redux";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
