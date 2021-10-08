import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import TraditionSuperheros from "./component/TraditionSuperheros";
import ReactQuerySuperheros from "./component/ReactQuerySuperheros";
function App() {
  // const path = window.location.pathname;
  // const activeIndex = () => {
  //   const found = routes.find(({ link }) => link === path);
  //   found && setNavigatTo(found.activeIndex);
  // };

  // useEffect(() => {
  //   activeIndex();
  // }, [path]);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/tradition' component={TraditionSuperheros} />
          <Route path='/rq' component={ReactQuerySuperheros} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
