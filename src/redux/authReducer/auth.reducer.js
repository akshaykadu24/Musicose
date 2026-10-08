import {
    HIDE_AUTH_POPUP,
    SHOW_AUTH_POPUP,
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from "./auth.actionTypes"


const initialState = {
    isAuth: false,
    name: "",
    user: "",
    token: "",
    type: "",
    msg: "",
    isAuthLoading: false,
    isAuthError: false,
    // Global popup shown after login / logout. Lives here because the
    // logged-out Navbar (and its Login modal) unmounts as soon as login succeeds.
    popup: { isOpen: false, title: "", message: "", variant: "success" },
}


export const authReducer = (state = initialState, { type, payload }) => {


    switch (type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                isAuthLoading: true
            }
        }
        case USER_LOGIN_SUCCESS: {
            if (payload.token) {
                return {
                    ...state,
                    isAuthLoading: false,
                    isAuth: true,
                    isAuthError: false,
                    token: payload.token,
                    msg: payload.msg,
                    user: payload.user,
                    type: payload.type,
                    name: payload.name,
                }
            }
            return {
                ...state,
                isAuthLoading: false,
                isAuth: false,
                isAuthError: true,
                msg: payload.msg,
            }
        }
        case USER_LOGIN_FAILURE: {
            return {
                ...state,
                isAuthLoading: false,
                isAuthError: true
            }
        }
        case USER_LOGOUT: {
            return {
                ...initialState,
                popup: state.popup,
            }
        }
        case SHOW_AUTH_POPUP: {
            return {
                ...state,
                popup: { variant: "success", ...payload, isOpen: true },
            }
        }
        case HIDE_AUTH_POPUP: {
            return {
                ...state,
                popup: { ...state.popup, isOpen: false },
            }
        }
        default: return state
    }
}
