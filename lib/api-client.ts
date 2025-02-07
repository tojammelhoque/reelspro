import { IVideo } from "@/models/video.model";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOption = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async myfetch<T>(
    endpoint: string,
    options: FetchOption = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.myfetch<IVideo[]>("/videos");
  }

  async getAvideo(id: string) {
    return this.myfetch<IVideo>(`/videos/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.myfetch<IVideo>("/videos", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient();
