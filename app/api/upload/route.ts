import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
          
cloudinary.config({ 
  cloud_name: 'diad0wybb', 
  api_key: '928159875274479', 
  api_secret: 'z7TF2Xwzrj7HT2t9K-uKEN0H-uA' 
});

export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json({ message: 'Image path is required' }, { status: 400 });
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: 'scale' }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to upload image on Cloudinary" }, { status: 500 });
  }
}
