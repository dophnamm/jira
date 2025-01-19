import { type Storage, ID } from "node-appwrite";

import { IMAGES_BUCKET_ID } from "@/config";

interface IGetImageProps {
  storage: Storage;
  image: File | string | undefined;
}

export const getImage = async (props: IGetImageProps) => {
  const { storage, image } = props;

  let uploadedImageUrl: string | undefined;

  if (image instanceof File) {
    const file = await storage.createFile(IMAGES_BUCKET_ID, ID.unique(), image);

    const arrayBuffer = await storage.getFilePreview(
      IMAGES_BUCKET_ID,
      file.$id
    );

    uploadedImageUrl = `data:image/png;base64,${Buffer.from(
      arrayBuffer
    ).toString("base64")}`;
  } else {
    uploadedImageUrl = image;
  }

  return uploadedImageUrl;
};
