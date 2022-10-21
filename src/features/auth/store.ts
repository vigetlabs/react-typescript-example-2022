import { config } from 'config';
import { createTrackedSelector } from 'react-tracked';
import create from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type State = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: State = { isAuthenticated: false, user: null };

export const useAuthStoreImpl = create(
  immer(
    devtools(
      combine(initialState, (set, get) => ({
        signIn: (user: User) => {
          set((state) => {
            state.isAuthenticated = true;
            state.user = user;
          });
        },
        signOut: () => {
          set((state) => {
            state.isAuthenticated = false;
            state.user = null;
          });
        },
        computed: {
          get fullName() {
            return `${get()?.user?.firstName} ${get()?.user?.lastName}`;
          },
        },
      })),
      {
        enabled: config.enableDevtools,
      },
    ),
  ),
);

export const useAuthStore = createTrackedSelector(useAuthStoreImpl);
export const getAuthState = () => useAuthStoreImpl.getState();

export type Store = ReturnType<typeof useAuthStore>;
