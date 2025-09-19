"use client";
import * as React from "react";
import Image from "next/image";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IconCloudUp, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TeachersList from "@/app/dashboard/teachers/TeachersList";
import {
  CREATE_TEACHER,
  DELETE_COURSE,
  UPDATE_COURSE,
} from "@/app/requests/mutation";
import { GET_TEACHER, GET_TEACHERS } from "@/app/requests/query";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import DynamicInputList from "@/components/todo-list";

interface ImageDimensions {
  width: number;
  height: number;
}

interface TeacherItemInput {
  skillList: { label: string }[];
  teachingCharacteristics: string;
  name: string;
  position: string;
  bio: string;
  orientation: { label: string }[];
  educationAndExperience: string;
  quote: string;
  image?: File | string | undefined;
  photos?: File | string | undefined;
  video?: File | string | undefined;
}

const orientationData = [{ label: "" }];
const skillListData = [{ label: "" }];

const Teachers = () => {
  const [imageFileInfo, setImageFileInfo] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [photosFile, setPhotosFile] = React.useState<File | null>(null);
  const [photosUrl, setPhotosUrl] = React.useState<string | null>(null);
  const [photosFileInfo, setPhotosFileInfo] = React.useState("");
  const [name, setName] = React.useState("");
  const [skillList, setSkillList] =
    React.useState<Array<{ label: string }>>(skillListData);
  const [orientation, setOrientation] =
    React.useState<Array<{ label: string }>>(orientationData);
  const [teachingCharacteristics, setTeachingCharacteristics] =
    React.useState("");
  const [position, setPosition] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [educationAndExperience, setEducationAndExperience] =
    React.useState("");
  const [quote, setQuote] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [editingTeacherId, setEditingTeacherId] = React.useState<string | null>(
    null
  );

  const [createTeachers, { loading }] = useMutation(CREATE_TEACHER, {
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ վերբեռնվել է։");
      resetForm();
    },
    onError: (err) => {
      toast.error(err.message || "Վերբեռնումը ձախողվեց։");
    },
    update(cache, { data }) {
      const existingData = cache.readQuery<{
        Teachers: { Teachers: unknown[] };
      }>({
        query: GET_TEACHERS,
      });

      cache.writeQuery({
        query: GET_TEACHERS,
        data: {
          Teachers: {
            Teachers: [
              ...(existingData?.Teachers?.Teachers || []),
              ...(data?.createTeachers || []),
            ],
          },
        },
      });
    },
  });

  const [getTeacher] = useLazyQuery(GET_TEACHER, {
    onCompleted: (data) => {
      if (data?.Teacher) {
        setImageUrl(data.Teacher.image || null);
        setPosition(data.Teacher.position || "");
        setBio(data.Teacher.bio || "");
        setName(data.Teacher.name || "");
        setPosition(data.Teacher.position || "");
        setSkillList(
          (data.Teacher.skillList || []).map((item: { label: string }) => ({
            label: item.label ?? item,
          }))
        );
        setOrientation(
          (data.Teacher.orientation || []).map((item: { label: string }) => ({
            label: item.label ?? item,
          }))
        );
        setTeachingCharacteristics(data.Teacher.teachingCharacteristics || "");
        setVideoUrl(data.Teacher.video || null);
        setPhotosUrl(data.Teacher.photos || null);
        setEditingTeacherId(data.Teacher.id);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Տվյալների ստացումը ձախողվեց։");
    },
  });
  const [deleteTeacher] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_TEACHERS }],
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ ջնջվել է։");
    },
    onError: (err) => {
      toast.error(err.message || "Ջնջումը ձախողվեց։");
    },
  });
  const [updateTeacher] = useMutation(UPDATE_COURSE, {
    refetchQueries: [{ query: GET_TEACHERS }],
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ թարմացվել է։");
      resetForm();
      setIsEditing(false);
      setEditingTeacherId(null);
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
    setPosition("");
    setErrorMessage("");
    setName("");
    setSkillList([]);
    setOrientation([]);
    setTeachingCharacteristics("");
    setEducationAndExperience("");
    setQuote("");
  };

  const handleUpload = async () => {
    if (
      (!file && !isEditing && !imageUrl) ||
      !name ||
      !skillList.length ||
      !orientation.length ||
      !teachingCharacteristics ||
      (!photosFile && !isEditing && !photosUrl)
    ) {
      toast.error("Բոլոր դաշտերը պարտադիր են, և նկարները պետք է լինեն վավեր։");
      return;
    }

    const TeacherItemInput: TeacherItemInput = {
      bio,
      educationAndExperience,
      name,
      orientation,
      position,
      quote,
      skillList,
      teachingCharacteristics,
      image: file || imageUrl || undefined,
      video: videoFile || videoUrl || undefined,
      photos: photosFile || photosUrl || undefined,
    };

    try {
      if (isEditing && editingTeacherId) {
        const updateInput: { [key: string]: unknown } = { ...TeacherItemInput };

        if (!file && imageUrl) {
          updateInput.image = imageUrl;
        }
        if (!photosFile && photosUrl) {
          updateInput.photos = photosUrl;
        }
        if (!videoFile && videoUrl) {
          updateInput.video = videoUrl;
        }

        await updateTeacher({
          variables: {
            id: editingTeacherId,
            input: updateInput,
          },
        });
      } else {
        await createTeachers({
          variables: {
            inputs: [TeacherItemInput],
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
          placeholder="Ուսուցչի Անուն Ազգանուն"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Մասնագիտություն"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Textarea
          placeholder="Կենսագրություն"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <DynamicInputList
          values={skillList}
          onChange={setSkillList}
          placeholder="Օրինակ՝ skill1, skill2"
          label="Հմտություններ՝"
        />
        <DynamicInputList
          values={orientation}
          onChange={setOrientation}
          placeholder="Օրինակ՝ Mobile, Frontend"
          label="Ուղղվածություն"
        />
        <Textarea
          placeholder="Դասավանդման առանձնահատկությունները"
          value={teachingCharacteristics ?? ""}
          onChange={(e) => setTeachingCharacteristics(e.target.value)}
        />
        <Textarea
          placeholder="Կրթություն և փորձ"
          value={educationAndExperience}
          onChange={(e) => setEducationAndExperience(e.target.value)}
        />
        <Textarea
          placeholder="Մոտիվացիոն մեջբերում"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <Button
          onClick={handleUpload}
          disabled={
            loading ||
            (!file && !isEditing && !imageUrl) ||
            !name ||
            !skillList.length ||
            !orientation.length ||
            !teachingCharacteristics ||
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
      <TeachersList
        getTeacher={getTeacher}
        deleteTeacher={deleteTeacher}
        onEdit={({ variables: { id } }: { variables: { id: string } }) => {
          setEditingTeacherId(id);
          setIsEditing(true);
          getTeacher({ variables: { id } });
        }}
      />
    </div>
  );
};

export default Teachers;
