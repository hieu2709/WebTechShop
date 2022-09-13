import { User } from "@/types/models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, AuthCheckResponse, LoginResponse, RegisterResponse } from "@/pages/auth/auth.api";

type AuthState = {
    user: User | null;
};

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload.data.user;
        });

        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, action: PayloadAction<RegisterResponse>) => {
                state.user = action.payload.data.user;
            }
        );

        builder.addMatcher(
            authApi.endpoints.authCheck.matchFulfilled,
            (state, action: PayloadAction<AuthCheckResponse>) => {
                state.user = action.payload.data.user;
            }
        );

        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
            state.user = null;
        });
    },
});

export default authSlice.reducer;

export const { clearAuth } = authSlice.actions;
