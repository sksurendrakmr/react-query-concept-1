import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

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

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/tradition' component={TraditionSuperheros} />
            <Route path='/rq' component={ReactQuerySuperheros} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
