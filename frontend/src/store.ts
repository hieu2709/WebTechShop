import {
    AnyAction,
    combineReducers,
    configureStore,
    isRejectedWithValue,
    Middleware,
    MiddlewareAPI,
} from "@reduxjs/toolkit";
import authReducer from "@/pages/auth/auth.slice";
import { appApi } from "@/api";

const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (action.payload && action.payload.data) {
            console.log(action.payload.data.error, action.payload.data.message);
        }
    }
    return next(action);
};

const reducer = combineReducers({
    auth: authReducer,
    [appApi.reducerPath]: appApi.reducer,
});

const appReducer = (state: any, action: AnyAction) => {
    if (action.type === "RESET") {
        state = undefined;
    }
    return reducer(state, action);
};

const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware).concat(rtkQueryErrorLogger),
});

export default store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
