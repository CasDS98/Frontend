import './App.css';
import Form from './components/Form';
import FormLogin from './components/FormLogin';
import Messages from './pages/Messages'
import { GroupsProvider } from "./contexts/GroupsProvider";

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
      <GroupsProvider>
        <Router>
          <Switch>
            <div className="App">
            <Route exact path="/">
              <Form></Form>
            </Route>
            <Route exact path="/messages">
              <Messages></Messages>
            </Route>
            </div>
          </Switch>
        </Router>
      </GroupsProvider>
    </div>
  );
}

export default App;
