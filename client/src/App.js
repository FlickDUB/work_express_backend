import LoginForm from './components/LoginForm';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { api } from './api';
import Logout from './components/Logout';
import {
  Switch,
  Route,
  Link,
  // useParams
} from "react-router-dom";
import { FilesList } from './components/FilesList';
import FileInfo from './components/FileInfo';

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)


  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refresh')
    if (accessToken && refreshToken) {
      api.get('/info').then(res => {
        dispatch({ type: "SET_USER", data: res.data })
        dispatch({ type: 'AUTHORIZE' })
      }).catch(e => {
        console.log(e.response.data.message)
      })

    }
  }, [dispatch, user.isAuth])

  return (
    <div>
      {!user.isAuth ?
        <LoginForm /> : (
          <>
            <h1>Authorized!</h1>
            <p>/info =&gt; <pre>{JSON.stringify(user.userInfo, null, '\t')}</pre></p>
            <Logout />
            <hr />
            <Link to='/'>Home</Link><br />
            <Switch>
              <Route path="/" exact>
                <Link to='/file/list'>Files list</Link><br />
                <Link to='/file/upload'>Upload file</Link>
              </Route>
              <Route path="/file/list">
                <FilesList />
              </Route>
              <Route path="/file/:name">
                <FileInfo />
              </Route>
            </Switch>
          </>
        )
      }
    </div>
  );
}

export default App;
