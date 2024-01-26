import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";


interface WeatherContextProps {
  value: any;
  setValue: any;
  coord: {
    lat: number | null;
    long: number | null;
  };
  state: any;
  dispatch: any;

  setCoord: React.Dispatch<
    React.SetStateAction<{ lat: number | null; long: number | null }>
  >;
}
// -------------------- WEATHER CONTEXT --------------------
export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);
// -------------------- WEATHER PROVIDER --------------------

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // -------------------- INITIAL VALUES --------------------

  const initialState = {
    isLoading: false,
    data: null,
    error: "",
  };
  // -------------------- REDUCER --------------------

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'IS_LOADING':
        return {
          ...state,
          data: null,
          isLoading: true,
        }
      case "FETCH_SUCCESS":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: "",
        };
      case "FETCH_ERROR":
        return {
          ...state,
          data: null,
          isLoading: false,
          error: "Something went wrong",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState();
  const [coord, setCoord] = useState<{
    lat: number | null;
    long: null | number;
  }>({
    lat: null,
    long: null,
  });
  return (
    <WeatherContext.Provider
      value={{ value, setValue, state, dispatch, coord, setCoord }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
