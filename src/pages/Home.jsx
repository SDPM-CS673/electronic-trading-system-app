import { Card, CardBody, Typography, CardFooter, Button, Input } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import Header from "../components/Header";
const Home = () => {
  const heading = "UniTrade";

  return (
    <>
      <div className="w-full h-[calc(100vh-2rem)] overflow-y-auto">
        <Header heading={heading} />
      </div>
    </>
  );
};

export default Home;
