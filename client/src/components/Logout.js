import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { api } from "../api"

const Logout = () => {
    const user = useSelector((state) => state.user)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleLogout = () => {
        api.post('/logout', {}, { headers: { 'refreshtoken': localStorage.getItem('refresh') } }).catch(e => {
            setError(e.response?.data.message)
        }).finally(() => {
            dispatch({ type: 'LOGOUT' })
        })
    }

    return (
        <div>
            <button disabled={!user.isAuth} onClick={handleLogout}>Logout</button><br/>
            {error}
        </div>
    )
}

export default Logout
