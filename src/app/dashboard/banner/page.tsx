"use client";
import * as React from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { IconCloudUp, IconTrash } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CREATE_BANNER } from "@/app/requests/mutation";

const Banner = () => {
  const [fileInfo, setFileInfo] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const minWidth = 1920;
  const minHeight = 1080;

  const [createBanner, { loading, error }] = useMutation(CREATE_BANNER);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] as File;
    if (selectedFile) {
      setFile(selectedFile);
      setFileInfo(
        `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`
      );

      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);

      const img = new window.Image();
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          setErrorMessage(`Image must be at least ${minWidth}x${minHeight}`);
          setImageUrl(null);
          setImageDimensions(null);
          setFile(null);
        } else {
          setErrorMessage("");
          setImageDimensions({ width: img.width, height: img.height });
        }
      };
      img.src = objectUrl;
    } else {
      setFile(null);
      setImageUrl(null);
      setImageDimensions(null);
      setFileInfo("");
      setErrorMessage("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setImageUrl(null);
    setImageDimensions(null);
    setFileInfo("No file selected.");
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!file || !imageDimensions) {
      setErrorMessage("Please select a valid image first.");
      return;
    }

    try {
      await createBanner({
        variables: {
          title,
          description,
          image: file,
        },
      });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className={"flex flex-1 p-4 flex-col gap-2"}>
      <div className="bg-white w-full h-[600px] relative">
        {imageUrl && (
          <button
            onClick={handleRemoveFile}
            className="mt-2 text-sm text-red-500 hover:text-red-700 focus:outline-none p-4 shadow-lg hover:shadow-2xl bg-white rounded-full absolute z-1 right-7 top-5 cursor-pointer">
            <IconTrash />
          </button>
        )}
        <label
          htmlFor="file-upload"
          className="w-full h-full cursor-pointer flex justify-center items-center py-4 transition duration-200 border rounded-lg shadow">
          {imageUrl ? (
            imageDimensions ? (
              <div className="relative w-full h-full max-h-[500px]">
                <Image
                  src={imageUrl}
                  alt="image upload"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            ) : (
              <div>Loading image...</div>
            )
          ) : (
            <IconCloudUp
              size={100}
              color={"var(--color-blue-400)"}
            />
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className={"flex justify-between mt-2"}>
          <div className="text-gray-700 text-sm text-right">{fileInfo}</div>
          {(errorMessage || error) && (
            <div className="text-red-500 text-sm text-center">
              Upload failed. {errorMessage || error?.message}
            </div>
          )}
        </div>
      </div>
      <Textarea
        placeholder="Այստեղ գրում ենք պաստառի վերնագիրը"
        value={title}
        className={"mt-6"}
        onChange={({ target }) => setTitle(target.value)}
      />

      <Textarea
        placeholder="Այստեղ գրում ենք պաստառի նկարագրությունը"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />

      {(file || description || title) && (
        <Button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 px-4 py-2 text-white rounded shadow transition self-end">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      )}
    </div>
  );
};

export default Banner;
