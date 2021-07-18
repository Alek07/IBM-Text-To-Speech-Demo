import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";

const URL = process.env.REACT_APP_URL;

export const useIBMServices = create(
  devtools((set, get) => ({
    loading_voices: false,
    loading_synthesize: false,
    voices: [],
    audio: "",
    clearAudio: () => set({ audio: "" }),
    startLoading: () => set({ loading_voices: true }),
    stopLoading: () => set({ loading_voices: false }),
    startSynthesize: () => set({ loading_synthesize: true }),
    stopSynthesize: () => set({ loading_synthesize: false }),
    getVoicesList: async () => {
      get().startLoading();

      try {
        const response = await axios.get(`${URL}/voice_list`);

        const { data } = response;
        set({ voices: data.voices });
      } catch (error) {
        console.log(error);
      } finally {
        get().stopLoading();
      }
    },
    syntehesizeText: async (syntehesize_data) => {
      get().startSynthesize();

      try {
        const new_audio = await axios.post(
          `${URL}/synthesize`,
          syntehesize_data
        );

        setTimeout(() => {
          const { data } = new_audio;
          set({ audio: `${URL}${data.path}` });
          get().stopSynthesize();
        }, 3000);
      } catch (error) {
        console.log(error);
        get().stopSynthesize();
      }
    },
  }))
);
