const initialState = { isAuth: false, userInfo: {} }

const user = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHORIZE":
            if (action?.data?.accessToken) {
                localStorage.setItem('token', action.data.accessToken);
            }
            if (action?.data?.refreshToken) {
                localStorage.setItem('refresh', action.data.refreshToken);
            }
            return { ...state, isAuth: true }
        case "SET_USER":
            return { ...state, userInfo: action.data }
        case "LOGOUT":
            localStorage.clear()
            return initialState
        default:
            return state
    }
}

export default user
