import { create } from 'zustand';

import { GET } from '@/utils';

interface HomeStore {
  isLoading: {
    main: boolean;
  };
  data: any;

  actions: {
    setIsLoading(isLoading: HomeStore['isLoading']): void;
    setData(data: HomeStore['data']): void;
  };

  fetch: {
    getData(): void;
  };
}

const useHomeStore = create<HomeStore>((set, get) => ({
  isLoading: {
    main: false,
  },
  data: null as any,
  actions: {
    setIsLoading: (isLoading) => set({ isLoading }),
    setData: (data) => set({ data }),

    /* 관심코인 리스트 가져오기 메서드 */
  },
  fetch: {
    getData: async () => {
      set({ isLoading: { ...get().isLoading, main: true } });
      try {
        const data = await GET('');
        set({ data });
      } catch (e) {
        console.error('Get Favorite Coin List Error:', e);
      } finally {
        set({ isLoading: { ...get().isLoading, main: false } });
      }
    },
  },
}));

export default useHomeStore;
