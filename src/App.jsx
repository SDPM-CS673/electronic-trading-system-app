import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";  // Ensure correct imports
import * as Pages from "./pages";  // Import everything from pages/index.js
import { routeGroups } from "./routes"; // Import your routeGroups
import Sidebar from "./pages/Sidebar";  // Import Sidebar correctly
import Header from "./components/landing-page/Header/page";
import Footer from "./components/landing-page/Footer/page";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./context/AuthContext";  // Import useAuth hook

function App() {

  const { login, logout, user, isLoggedIn } = useAuth();
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
      <ToastContainer />
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar */}
        {isLoggedIn && < Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />}

        {/* Main Content Area */}
        <div className={`flex-1 ml-${sidebarOpen ? '64' : '20'} flex-col h-screen w-full`}>
          <div className={'h-[10%] '}>
            <Header toggleSidebar={toggleSidebar} />
          </div>
          <div style={isLoggedIn ? { paddingLeft: sidebarOpen ? '12%' : '6%' } : { paddingTop: '1rem', paddingBottom: '1rem' }} className="h-[95%] overflow-auto">
            <Routes>{renderRoutes(routeGroups)}</Routes>  {/* Dynamically render routes */}
          </div>
          <div className={'h-[5%]'}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
