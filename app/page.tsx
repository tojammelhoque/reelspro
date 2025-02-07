"use client";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/video.model";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setvideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setvideos(data);
      } catch (error) {
        throw error;
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Tojamel Hoque</h1>
    </div>
  );
}
