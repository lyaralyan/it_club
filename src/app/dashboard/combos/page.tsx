"use client";
import * as React from "react";
import Image from "next/image";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IconCloudUp, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CombosList from "@/app/dashboard/combos/CombosList";
import {
  CREATE_COMBO,
  DELETE_COMBO,
  UPDATE_COMBO,
} from "@/app/requests/mutation";
import { GET_COMBO, GET_COMBOS } from "@/app/requests/query";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import DynamicInputList from "@/components/todo-list";

interface ImageDimensions {
  width: number;
  height: number;
}

interface ComboItemInput {
  comboName: string;
  description: string;
  price: string;
  courseProgramList: { label: string }[];
  receiveAComputerAsAGift: string;
  aboutTheCourse: string;
  image?: File | string | undefined;
  photos?: File | string | undefined;
  video?: File | string | undefined;
}

const courseProgramData = [{ label: "" }];

const Combos = () => {
  const [imageFileInfo, setImageFileInfo] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [photosFile, setPhotosFile] = React.useState<File | null>(null);
  const [photosUrl, setPhotosUrl] = React.useState<string | null>(null);
  const [photosFileInfo, setPhotosFileInfo] = React.useState("");
  const [comboName, setComboName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [courseProgramList, setCourseProgramList] =
    React.useState<Array<{ label: string }>>(courseProgramData);
  const [receiveAComputerAsAGift, setReceiveAComputerAsAGift] =
    React.useState("");
  const [aboutTheCourse, setAboutTheCourse] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [editingComboId, setEditingComboId] = React.useState<string | null>(
    null
  );

  const [createCombos, { loading }] = useMutation(CREATE_COMBO, {
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ վերբեռնվել է։");
      resetForm();
    },
    onError: (err) => {
      toast.error(err.message || "Վերբեռնումը ձախողվեց։");
    },
    update(cache, { data }) {
      const existingData = cache.readQuery({
        query: GET_COMBOS,
      });

      cache.writeQuery({
        query: GET_COMBOS,
        data: {
          ...(existingData || []),
          ...(data?.createCombos || []),
        },
      });
    },
  });
  const [getCombo] = useLazyQuery(GET_COMBO, {
    onCompleted: (data) => {
      if (data) {
        setComboName(data.comboName || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setImageUrl(data.image || null);
        setAboutTheCourse(data.aboutTheCourse || null);
        setCourseProgramList(
          (data.courseProgramList || []).map((item: { label: string }) => ({
            label: item.label ?? item,
          }))
        );
        setReceiveAComputerAsAGift(data.receiveAComputerAsAGift || "");
        setVideoUrl(data.video || null);
        setPhotosUrl(data.photos || null);
        setEditingComboId(data.id);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Տվյալների ստացումը ձախողվեց։");
    },
  });
  const [deleteCombo] = useMutation(DELETE_COMBO, {
    refetchQueries: [{ query: GET_COMBOS }],
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ ջնջվել է։");
    },
    onError: (err) => {
      toast.error(err.message || "Ջնջումը ձախողվեց։");
    },
  });
  const [updateCombo] = useMutation(UPDATE_COMBO, {
    refetchQueries: [{ query: GET_COMBOS }],
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ թարմացվել է։");
      resetForm();
      setIsEditing(false);
      setEditingComboId(null);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Թարմացումը ձախողվեց։");
    },
  });

  const minImageWidth = 280;
  const minImageHeight = 220;
  const maxImageWidth = 400;
  const maxImageHeight = 450;

  const validateImage = (
    file: File,
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number,
    callback: (url: string, dimensions: ImageDimensions) => void,
    errorCallback: (message: string) => void
  ) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      if (
        img.width < minWidth ||
        img.height < minHeight ||
        img.width > maxWidth ||
        img.height > maxHeight
      ) {
        errorCallback(
          `Նկարը պետք է լինի նվազագույնը ${minWidth}x${minHeight} և առավելագույնը ${maxWidth}x${maxHeight} պիքսել։`
        );
        URL.revokeObjectURL(objectUrl);
        return;
      }
      callback(objectUrl, { width: img.width, height: img.height });
    };
    img.onerror = () => {
      errorCallback("Նկարի բեռնումը ձախողվեց։");
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      resetImageFile();
      return;
    }

    validateImage(
      selectedFile,
      minImageWidth,
      minImageHeight,
      maxImageWidth,
      maxImageHeight,
      (url) => {
        setFile(selectedFile);
        setImageFileInfo(
          `${selectedFile.name} ${(selectedFile.size / 1024).toFixed(2)} KB`
        );
        setImageUrl(url);
        setErrorMessage("");
      },
      (message) => {
        setErrorMessage(message);
        resetImageFile();
      }
    );
  };

  const handlePhotosSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      resetPhotosFile();
      return;
    }

    setPhotosFile(selectedFile);
    setPhotosFileInfo(
      `${selectedFile.name} ${(selectedFile.size / 1024).toFixed(2)} KB`
    );
    setPhotosUrl(URL.createObjectURL(selectedFile));
    setErrorMessage("");
  };

  const resetImageFile = () => {
    setFile(null);
    setImageUrl(null);
    setImageFileInfo("");
  };

  const resetPhotosFile = () => {
    setPhotosFile(null);
    setPhotosUrl(null);
    setPhotosFileInfo("");
  };

  const resetVideoFile = () => {
    setVideoFile(null);
    setVideoUrl(null);
  };

  const resetForm = () => {
    resetImageFile();
    resetPhotosFile();
    resetVideoFile();
    setErrorMessage("");
    setComboName("");
    setCourseProgramList([]);
    setReceiveAComputerAsAGift("");
    setAboutTheCourse("");
  };

  const handleUpload = async () => {
    if (
      (!file && !isEditing && !imageUrl) ||
      !comboName ||
      !courseProgramList.length ||
      !receiveAComputerAsAGift ||
      (!photosFile && !isEditing && !photosUrl)
    ) {
      toast.error("Բոլոր դաշտերը պարտադիր են, և նկարները պետք է լինեն վավեր։");
      return;
    }

    const ComboItemInput: ComboItemInput = {
      comboName,
      description,
      price,
      courseProgramList,
      receiveAComputerAsAGift,
      aboutTheCourse,
      image: file || imageUrl || undefined,
      video: videoFile || videoUrl || undefined,
      photos: photosFile || photosUrl || undefined,
    };

    try {
      if (isEditing && editingComboId) {
        const updateInput: { [key: string]: unknown } = { ...ComboItemInput };

        if (!file && imageUrl) {
          updateInput.image = imageUrl;
        }
        if (!photosFile && photosUrl) {
          updateInput.photos = photosUrl;
        }
        if (!videoFile && videoUrl) {
          updateInput.video = videoUrl;
        }

        await updateCombo({
          variables: {
            id: editingComboId,
            input: updateInput,
          },
        });
      } else {
        await createCombos({
          variables: {
            inputs: [ComboItemInput],
          },
        });
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Գործողությունը ձախողվեց։"
      );
    }
  };

  const handleRemovePhotoPreview = () => {
    setPhotosUrl(null);
    setPhotosFile(null);
    setPhotosFileInfo("");
  };

  const handleRemoveVideoPreview = () => {
    setVideoUrl(null);
    setVideoFile(null);
  };

  // TODO:
  // 1. Refactor skillList and orientation to allow dynamic add/remove of inputs.
  // 2. Replace current skillList and orientation inputs with mapped inputs and add/remove buttons.

  // Add skill

  return (
    <div className="rounded-lg p-4">
      <div className="flex flex-wrap gap-2">
        <div className="w-[294px] relative">
          <div className="w-[294px] h-[222px] relative border rounded-lg bg-white shadow-sm overflow-hidden">
            {imageUrl && (
              <button
                onClick={resetImageFile}
                className="absolute z-10 top-2 right-2 text-red-600 hover:text-red-800 bg-white p-1 rounded-full shadow-md">
                <IconTrash />
              </button>
            )}
            <label
              htmlFor="image-upload"
              className="w-full h-full flex items-center justify-center cursor-pointer">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  layout={"fill"}
                  objectFit={"cover"}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IconCloudUp
                    size={64}
                    className="text-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Վերբեռնել քարտի ֆոնը
                  </p>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
          {imageFileInfo && (
            <p
              className="text-sm text-gray-600 mt-1"
              dangerouslySetInnerHTML={{ __html: imageFileInfo }}
            />
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>

        <div className="w-[294px] relative">
          <div className="w-[294px] h-[222px] relative border rounded-lg bg-white shadow-sm overflow-hidden">
            <label
              htmlFor="photos-upload"
              className="w-full h-full flex items-center justify-center cursor-pointer">
              {photosUrl ? (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={photosUrl}
                    alt="Uploaded Photo"
                    layout={"fill"}
                    objectFit={"cover"}
                  />
                  <button
                    onClick={handleRemovePhotoPreview}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    <IconTrash size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IconCloudUp
                    size={64}
                    className="text-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Վերբեռնել լուսանկար
                  </p>
                </div>
              )}
            </label>
            <input
              id="photos-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotosSelect}
            />
          </div>
          {photosFileInfo && (
            <p
              className="text-sm text-gray-600 mt-1"
              dangerouslySetInnerHTML={{
                __html: photosFileInfo,
              }}
            />
          )}
        </div>

        <div className="w-[294px] relative">
          <div className="border h-[222px] rounded-lg bg-white shadow-sm overflow-hidden">
            <label
              htmlFor="video-upload"
              className="w-full h-full flex items-center justify-center cursor-pointer p-4">
              {videoUrl ? (
                <div className="relative w-full h-full">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={handleRemoveVideoPreview}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    <IconTrash size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IconCloudUp
                    size={64}
                    className="text-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Վերբեռնել տեսանյութ
                  </p>
                </div>
              )}
            </label>
          </div>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) {
                setVideoFile(selected);
                setVideoUrl(URL.createObjectURL(selected));
              }
            }}
          />
        </div>
      </div>
      <div className="space-y-4 flex-1 mt-4">
        <Input
          type="text"
          placeholder="Կոմբո փաթեթի անվանումը"
          value={comboName ?? ""}
          onChange={(e) => setComboName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Կոմբո փաթեթի արժեքը"
          value={price ?? ""}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Textarea
          placeholder="Նկարագրություն"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DynamicInputList
          values={courseProgramList}
          onChange={setCourseProgramList}
          placeholder="Օրինակ՝ skill1, skill2"
          label="Դասընթացի ծրագիրը"
        />
        <Textarea
          placeholder="Ստացիր նվեր համակարգիչ"
          value={receiveAComputerAsAGift ?? ""}
          onChange={(e) => setReceiveAComputerAsAGift(e.target.value)}
        />
        <Textarea
          placeholder="Դասընթացի մասին"
          value={aboutTheCourse}
          onChange={(e) => setAboutTheCourse(e.target.value)}
        />
        <Button
          onClick={handleUpload}
          disabled={
            loading ||
            (!file && !isEditing && !imageUrl) ||
            !comboName ||
            !courseProgramList.length ||
            !receiveAComputerAsAGift ||
            (!photosFile && !isEditing && !photosUrl) ||
            (!videoFile && !isEditing && !videoUrl)
          }>
          {loading
            ? "Վերբեռնում..."
            : isEditing
            ? "Թարմացնել դասընթացը"
            : "Վերբեռնել դասընթացը"}
        </Button>
      </div>
      <CombosList
        getCombo={getCombo}
        deleteCombo={deleteCombo}
        onEdit={({ variables: { id } }: { variables: { id: string } }) => {
          setEditingComboId(id);
          setIsEditing(true);
          getCombo({ variables: { id } });
        }}
      />
    </div>
  );
};

export default Combos;
