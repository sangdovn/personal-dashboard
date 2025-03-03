import { create } from "zustand";

export interface AppState {
  headerTitle: string;
  theme: string;
  username: string;
  isSidebarOpen: boolean;
  setHeaderTitle: (title: string) => void;
  setTheme: (theme: string) => void;
  setUsername: (username: string) => void;
  toggleSidebar: () => void;
}

const useStore = create<AppState>()((set) => ({
  headerTitle: "",
  theme: "",
  username: "",
  isSidebarOpen: true,
  setHeaderTitle: (headerTitle: string) => set(() => ({ headerTitle })),
  setTheme: (theme: string) => set(() => ({ theme })),
  setUsername: (username: string) => set(() => ({ username })),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useStore;
