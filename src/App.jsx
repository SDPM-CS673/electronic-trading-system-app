import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routeGroups } from "./routes";
import * as Pages from "./pages";
import Header from "./components/landing-page/Header/page";
import Footer from "./components/landing-page/Footer/page";

function App() {
  const renderRoutes = (routes, parentPath = "") =>
    routes.map(({ path, component, children, parameters }) => {
      const ComponentToRender = Pages[component];
      const paramRoute = parameters?.length > 0 ? `/:${parameters.join("/:")}` : null;
      return children ? (
        <Route key={path} path={`${parentPath}${path}`}>
          {renderRoutes(children, `${parentPath}${path}/`)}
        </Route>
      ) : (
        <Route key={path} path={paramRoute ? `${parentPath}${path}${paramRoute}` : `${parentPath}${path}`} element={<ComponentToRender />} />
      );
    });

  return (
    <>
      <head>
        <title>Stock Market Landing Page</title>
        <meta name="description" content="Modern stock market trading platform" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="flex content-stretch flex-col space-between h-svh max-h-svh w-full">
        {/* <Sidebar items={sidebarItems} /> */}
        <Header />
        <div className="h-full flex-1 w-full">
          <Routes>
            {renderRoutes(routeGroups)}
          </Routes>
        </div>
        <Footer />
      </div>
    </>

  );
}

export default App;
