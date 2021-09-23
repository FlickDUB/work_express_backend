import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { userApi } from "../api"

const LoginForm = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const hanldeSignIn = () => {
        userApi.post('/signin', {
            id: login,
            password: password
        }).then(res => {
            console.log(res.data)
            setErrorMessage('')
            dispatch({ type: 'AUTHORIZE', data: { refreshToken: res.data.refreshToken, accessToken: res.data.accessToken } })
        }).catch(e => {
            setErrorMessage(e.response.data.message)
            throw e
        })
    }


    const handleSignUp = () => {
        userApi.post('/signup', {
            id: login,
            password: password
        }).then(res => {
            setErrorMessage('')
            dispatch({ type: 'AUTHORIZE', data: { refreshToken: res.data.refreshToken, accessToken: res.data.accessToken } })
        }).catch(e => {
            setErrorMessage(e.response.data.message)
            throw e
        })
    }


    return (
        <div>
            <input placeholder="id" value={login} onChange={(e) => setLogin(e.currentTarget.value)} />
            <input placeholder="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} /><br/>
            <button onClick={hanldeSignIn}>SignIn</button>
            <button onClick={handleSignUp}>SignUp</button>
            {JSON.stringify(user)}
            {errorMessage && (<p>{errorMessage}</p>)}
        </div>)
}

export default LoginForm