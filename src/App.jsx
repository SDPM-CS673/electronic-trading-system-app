import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routeGroups } from "./routes";
import * as Pages from "./pages";

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
        <Route key={path} path={paramRoute ? `${parentPath}${path}${paramRoute}` : `${parentPath}${path}` } element={<ComponentToRender />} />
      );
    });

  return (
    <div className="w-full flex h-svh max-h-svh">
      {/* <Sidebar items={sidebarItems} /> */}
      <div className="h-full flex-1">
        <Routes>
          {renderRoutes(routeGroups)}
        </Routes>
      </div>
    </div>
  );
}

export default App;
