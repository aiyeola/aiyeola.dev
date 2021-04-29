import React, { useState } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from "@material-ui/core/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: any;
}

const ThemeDispatchContext = React.createContext<any>(null);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";

  const themeInitialOptions = {
    paletteType: palletType,
  };

  // function handleThemeChange() {
  //   setDarkState(!darkState);
  // }

  const [themeOptions, dispatch] = React.useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "changeTheme":
          return {
            ...state,
            paletteType: action.payload,
          };
        default:
          throw new Error();
      }
    },
    themeInitialOptions,
  );

  const memoizedTheme = React.useMemo(() => {
    return responsiveFontSizes(
      createMuiTheme({
        ...theme,
        palette: {
          type: themeOptions.paletteType,
        },
      }),
    );
  }, [theme, themeOptions.paletteType]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

export const useChangeTheme = () => {
  const [darkState, setDarkState] = useState(false);
  const dispatch = React.useContext(ThemeDispatchContext);
  const theme = useTheme();
  const changeTheme = React.useCallback(
    () =>
      dispatch({
        type: "changeTheme",
        payload: setDarkState(!darkState),
      }),
    [theme.palette.type, dispatch],
  );

  return changeTheme;
};
