// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useSelector } from "react-redux";
import store from "store/index";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
