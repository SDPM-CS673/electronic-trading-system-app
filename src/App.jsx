import React, { useState } from "react";
import Sidebar from "./pages/Sidebar"; // Ensure the import path and name match your actual file
import { Routes, Route } from "react-router-dom";
import { routeGroups } from "./routes";
import * as Pages from "./pages";
import Header from "./components/landing-page/Header/page";
import Footer from "./components/landing-page/Footer/page";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar is initially open

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const renderRoutes = (routes, parentPath = "") =>
    routes.map(({ path, component, children, parameters }) => {
      const ComponentToRender = Pages[component];
      const paramRoute = parameters?.length > 0 ? `/:${parameters.join("/:")}` : null;
      return children ? (
        <Route key={path} path={`${parentPath}${path}`}>
          {renderRoutes(children, `${parentPath}${path}/`)}
        </Route>
      ) : (
        <Route
          key={path}
          path={paramRoute ? `${parentPath}${path}${paramRoute}` : `${parentPath}${path}`}
          element={<ComponentToRender />}
        />
      );
    });

  return (
    <>
      <head>
        <title>Stock Market Landing Page</title>
        <meta name="description" content="Modern stock market trading platform" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        {/* Main Content Area */}
        <div className={`flex-1 ml-${sidebarOpen ? "64" : "20"}`}> {/* Adjust content layout when sidebar is open/closed */}
          <Header toggleSidebar={toggleSidebar} />
          <Routes>{renderRoutes(routeGroups)}</Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
