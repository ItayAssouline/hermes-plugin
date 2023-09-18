import { useState } from "react";
import { RouterContext } from "./RouterContext";

interface RouterProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export enum SCREEN {
  Home,
  Transcribing,
}

export const RouterProvider = ({
  children,
}: RouterProviderProps): JSX.Element => {
  const [screen, setScreen] = useState<SCREEN>(SCREEN.Home); // Default screen is 'home'

  return (
    <RouterContext.Provider value={{ screen, setScreen }}>
      {children}
    </RouterContext.Provider>
  );
};
