import './App.css';
import Form from './components/Form';
import NavMenu from './components/NavMenu.js';
import FormLogin from './components/FormLogin';
import Messages from './pages/Messages'
import Friends from './pages/Friends'
import { GroupsProvider } from "./contexts/GroupsProvider";
import { MessagesProvider } from "./contexts/MessagesProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { FriendsProvider } from "./contexts/FriendsProvider";
import { UsersProvider } from "./contexts/UsersProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import PrivateRoute from './components/PrivateRoute';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//Test
function App() {
  
  return (
    <div class="dark">
       <div class="h-screen dark:bg-gray-800">
      <SocketProvider>
       <AuthProvider>
         <UsersProvider>
            <GroupsProvider>
              <MessagesProvider>
                <FriendsProvider>
                    <Router>
                      <NavMenu/>
                      <Switch>
                        <div className="App">
                        <Route path="/frontendweb-karine-2122-CasDS98" exact>
                          <Redirect to="/frontendweb-karine-2122-CasDS98/messages" />
                        </Route>
                        <Route exact path="/frontendweb-karine-2122-CasDS98/register">
                          <Form></Form>
                        </Route>
                        <Route exact path="/frontendweb-karine-2122-CasDS98/login">
                          <FormLogin></FormLogin>
                        </Route>
                        <PrivateRoute  exact path="/frontendweb-karine-2122-CasDS98/messages">
                          <Messages></Messages>
                        </PrivateRoute >
                        <PrivateRoute  exact path="/frontendweb-karine-2122-CasDS98/friends">
                          <Friends></Friends>
                        </PrivateRoute >
                        </div>
                      </Switch>
                    </Router>
                </FriendsProvider>
              </MessagesProvider>
            </GroupsProvider>
          </UsersProvider>
         </AuthProvider>
      </SocketProvider>
      </div>
    </div>
  );
}

export default App;
