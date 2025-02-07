import { authOption } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Video, { IVideo } from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOption);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body: IVideo = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Please provide all fields" },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformations?.quality ?? 100,
      },
    };
    const newVideo = Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create a video",
      },
      {
        status: 500,
      }
    );
  }
}
