import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { AppDispatch, RootState } from "store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector