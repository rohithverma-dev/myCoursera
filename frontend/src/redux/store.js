import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, subscriptionReducer, userReducer } from "./reducers/userReducer"
import { courseReducer } from "./reducers/courseReducer"
import { adminReducer } from "./reducers/adminReducer"
import { otherReducer } from "./reducers/otherReducer"
import { BACKEND_URL } from "../AllUrls"
const store = configureStore({ 
    reducer:{ 
        user:userReducer,
        profile:profileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
        admin:adminReducer,
        other: otherReducer,
    }
})
export default store ;

export const server = `${BACKEND_URL}/api/v1`; 

