import { isAxiosError } from "axios";
import api from "../config/axios";
import { User, UserHandle } from "../types";
export const getUser = async () => {
  try {
    const { data } = await api<User>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
export const updateUser = async (formData: User) => {
  console.log("formData", formData);
  try {
    const { data } = await api.patch("/user", formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("/user/image", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getUserByHandle = async (handle: string) => {
  try {
    const { data } = await api.get<UserHandle>(`/user/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const searchByHandle = async (handle: string) => {
  try {
    const { data } = await api.post<string>("/user/handle/search", { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
