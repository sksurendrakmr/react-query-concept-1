import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./component/Header";
import Home from "./component/Home";
import TraditionSuperheros from "./component/TraditionSuperheros";
import ReactQuerySuperheros from "./component/ReactQuerySuperheros";
import { RQSuperHeroPage } from "./component/RQSuperHero.page";
import { ParallelQueriesPage } from "./component/ParallelQueries.page";
import { DynamicParallelPage } from "./component/DynamicParallel.page";
import { DependentQueriesPage } from "./component/DependentQueries.page";
import { PaginatedQueries } from "./component/PaginatedQueries.page";
import { InfiniteQueries } from "./component/InfiniteQueries.page";
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
            <Route exact path='/rq-parallel' component={ParallelQueriesPage} />
            <Route exact path='/rq-dynamic-parallel'>
              <DynamicParallelPage heroIds={[1, 3]} />
            </Route>
            <Route path='/rq/:heroId' component={RQSuperHeroPage} />
            <Route path='/rq-dependent'>
              <DependentQueriesPage email='sk@example.com' />
            </Route>
            <Route path='/rq-paginated'>
              <PaginatedQueries />
            </Route>
            <Route path='/rq-infinite'>
              <InfiniteQueries />
            </Route>
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  );
}

export default App;
