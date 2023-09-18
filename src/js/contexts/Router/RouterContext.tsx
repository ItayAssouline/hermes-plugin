import React, { createContext, useContext, useState } from "react";
import { SCREEN } from "./RouterContextProvider";
interface RouterContextProps {
  screen: SCREEN;
  setScreen: React.Dispatch<React.SetStateAction<SCREEN>>;
}

export const RouterContext = createContext<RouterContextProps | undefined>(
  undefined
);

export const useScreen = (): RouterContextProps => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useScreen must be used within a RouterProvider");
  }
  return context;
};
