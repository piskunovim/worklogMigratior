import { createContext } from 'react';
import types from './types';

export const ContextApp = createContext();

export const initialState = {
  issues: [],
  users: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_ISSUES: {
      const { issues } = action.payload;
      
      return {
        ...state,
        issues,
      }
    }
    
    case types.SET_USERS: {
      const { users } = action.payload;

      return {
        ...state,
        users,
      };
    }

    default:
      return state
  }
};
