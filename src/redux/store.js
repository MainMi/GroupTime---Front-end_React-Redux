import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";
import groupReducer from "./slices/group-info-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        groupInfo: groupReducer
    }
});

export default store;
