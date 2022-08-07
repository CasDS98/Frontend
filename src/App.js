import './App.css';
import Form from './components/Form';
import NavMenu from './components/NavMenu.js';
import FormLogin from './components/FormLogin';
import Messages from './pages/Messages'
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
     <SocketProvider>
        <AuthProvider>
          <GroupsProvider>
            <MessagesProvider>
              <FriendsProvider>
                <UsersProvider>
                  <Router>
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
                      </div>
                    </Switch>
                  </Router>
                </UsersProvider>
              </FriendsProvider>
            </MessagesProvider>
          </GroupsProvider>
        </AuthProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
