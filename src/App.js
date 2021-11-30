import './App.css';
import Form from './components/Form';
import FormLogin from './components/FormLogin';
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from 'react-router-dom'

//Test
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <div className="App">
      <Route exact path="/">
        <Form></Form>
      </Route>
      <Route exact path="/login">
        <FormLogin></FormLogin>
      </Route>
      </div>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
