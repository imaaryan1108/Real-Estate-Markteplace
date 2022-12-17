import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import route from './routes';

function App() {
  const routeComponent = route.map((data, index) => (
    <Route exact path={data.path} component={data.component} key={index} />
  ));

  return (
    <Router>
      <Switch> {routeComponent}</Switch>
    </Router>
  );
}

export default App;
