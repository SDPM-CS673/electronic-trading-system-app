import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";  // Ensure correct imports
import * as Pages from "./pages";  // Import everything from pages/index.js
import { routeGroups } from "./routes"; // Import your routeGroups
import Sidebar from "./pages/Sidebar";  // Import Sidebar correctly
import Header from "./components/landing-page/Header/page";
import Footer from "./components/landing-page/Footer/page";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar is initially close

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);  // Toggle Sidebar
  };

  // Render routes dynamically
  const renderRoutes = (routes, parentPath = "") => {
    return routes.map(({ path, component, children, parameters }) => {
      const ComponentToRender = Pages[component];  // Dynamically access component

      // If component is not found, log an error
      if (!ComponentToRender) {
        console.error(`Component ${component} not found in Pages.`); 
        return null;
      }

      const paramRoute = parameters?.length > 0 ? `/:${parameters.join("/:")}` : "";

      return children ? (
        <Route key={path} path={`${parentPath}${path}`}>
          {renderRoutes(children, `${parentPath}${path}/`)}
        </Route>
      ) : (
        <Route
          key={path}
          path={paramRoute ? `${parentPath}${path}${paramRoute}` : `${parentPath}${path}`}
          element={<ComponentToRender />} // Dynamically render the component
        />
      );
    });
  };

  return (
    <>
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        {/* Main Content Area */}
        <div className={`flex-1 ml-${sidebarOpen ? '64' : '20'}`}>
          <Header toggleSidebar={toggleSidebar} />
          <Routes>{renderRoutes(routeGroups)}</Routes>  {/* Dynamically render routes */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
