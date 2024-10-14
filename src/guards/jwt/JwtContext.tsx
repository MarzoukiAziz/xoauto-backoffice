import { createContext, useEffect, useReducer } from 'react';

// utils
import axios from 'src/utils/axios';
import { isValidToken, setSession } from './Jwt';

// ----------------------------------------------------------------------
export interface InitialStateType {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: any = {
  INITIALIZE: (state: InitialStateType, action: any) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: InitialStateType, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: InitialStateType) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: InitialStateType, action: any) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<any | null>({
  ...initialState,
  platform: 'JWT',
  signup: () => Promise.resolve(),
  signin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  confirmEmail: () => Promise.resolve(),
});

const USER_API_URL = process.env.REACT_APP_USER_API_URL;

function AuthProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get(`${USER_API_URL}/cognito/verify`, {
            params: { accessToken },
          });
          const { user } = response.data;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signin = async (email: string, password: string) => {
    const response = await axios.post(`${USER_API_URL}/cognito/login`, {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const signup = async (email: string, username: string, phone: string, password: string) => {
    await axios.post(`${USER_API_URL}/cognito/signup`, {
      email,
      username,
      phone,
      password,
    });
  };

  const confirmEmail = async (user: string, code: string) => {
    try {
      const response = await axios.post(`${USER_API_URL}/cognito/confirm-email`, {
        user,
        code,
      });
      if (response.data.success) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }

    return true;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signin,
        logout,
        signup,
        confirmEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
