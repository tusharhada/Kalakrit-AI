import { api } from "../Configs/axiosConfigs";

export const TranslateAPI = {
  post: async function (data: any) {
    console.log(data);
    const response = await api.request({
      url: "/translate",
      method: "POST",
      data: data,
    });
    return response.data;
  },
  calculateToken: async function (data: any) {
    const response = await api.request({
      url: "/token",
      method: "POST",
      data: data,
    });

    return response.data;
  },
};
