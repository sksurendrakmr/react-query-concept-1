import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./component/Header";
import Home from "./component/Home";
import TraditionSuperheros from "./component/TraditionSuperheros";
import ReactQuerySuperheros from "./component/ReactQuerySuperheros";
import { RQSuperHeroPage } from "./component/RQSuperHero.page";
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
            <Route exact path='/rq' component={ReactQuerySuperheros} />
            <Route path='/rq/:heroId' component={RQSuperHeroPage} />
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  );
}

export default App;
