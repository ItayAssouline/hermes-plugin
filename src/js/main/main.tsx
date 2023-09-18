import { useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../lib/utils/bolt";
import HomeScreen from "../screens/Home/HomeScreen";
import { createBrowserRouter, Link } from "react-router-dom";
import "./main.scss";
import {
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router";
import { useScreen } from "../contexts/Router/RouterContext";
import { SCREEN } from "../contexts/Router/RouterContextProvider";
import TranscribingScreen from "../screens/TranscribingScreen/TranscribingScreen";

const Main = () => {
  const [bgColor, setBgColor] = useState("#1E1E1E");

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);

  const [authenticated, setAuthenticated] = useState(true);

  const { screen, setScreen } = useScreen();

  if (!authenticated)
    return (
      <div
        className="app"
        style={{
          background: `radial-gradient(circle at center bottom, #1a2537, #1E1E1E)`,
        }}
      >
        <h2>auth</h2>
      </div>
    );

  return (
    <div
      className="app"
      style={{
        background: `radial-gradient(circle at center bottom, #1a2537, #1E1E1E)`,
      }}
    >
      {/* {screen === SCREEN.Transcribing && <TranscribingScreen />} */}
      <TranscribingScreen />
      {/* {screen === SCREEN.Home && <HomeScreen />} */}
    </div>
  );
};

export default Main;
