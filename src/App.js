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
  HashRouter as Router,
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
                    <Router basename="/frontendweb-karine-2122-CasDS98">
                      <NavMenu/>
                      <Switch>
                        <div className="App">
                        <Route path="/" exact>
                          <Redirect to="/messages" />
                        </Route>
                        <Route exact path="/register">
                          <Form></Form>
                        </Route>
                        <Route exact path="/login">
                          <FormLogin></FormLogin>
                        </Route>
                        <PrivateRoute  exact path="/messages">
                          <Messages></Messages>
                        </PrivateRoute >
                        <PrivateRoute  exact path="/friends">
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
