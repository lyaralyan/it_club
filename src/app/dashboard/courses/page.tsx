"use client";
import * as React from "react";
import Image from "next/image";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IconCloudUp, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CoursesList from "@/app/dashboard/courses/CoursesList";
import {
  CREATE_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
} from "@/app/requests/mutation";
import { GET_COURSE, GET_COURSES } from "@/app/requests/query";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ImageDimensions {
  width: number;
  height: number;
}

const Courses = () => {
  const [imageFileInfo, setImageFileInfo] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [photosFile, setPhotosFile] = React.useState<File | null>(null);
  const [photosUrl, setPhotosUrl] = React.useState<string | null>(null);
  const [photosFileInfo, setPhotosFileInfo] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [lessonProcessDescription, setLessonProcessDescription] =
    React.useState("");
  const [courseTopics, setCourseTopics] = React.useState("");
  const [courseProgram, setCourseProgram] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = React.useState<string | null>(
    null
  );

  const [createCourses, { loading }] = useMutation(CREATE_COURSE, {
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ վերբեռնվել է։");
      resetForm();
    },
    onError: (err) => {
      toast.error(err.message || "Վերբեռնումը ձախողվեց։");
    },
    update(cache, { data: { createCourse } }) {
      const { courses } = cache.readQuery<{ courses: unknown[] }>({
        query: GET_COURSES,
      }) || { courses: [] };

      cache.writeQuery({
        query: GET_COURSES,
        data: { courses: [createCourse, ...courses] },
      });
    },
  });

  const [getCourse] = useLazyQuery(GET_COURSE, {
    onCompleted: (data) => {
      if (data?.course) {
        setImageUrl(
          `${process.env.NEXT_PUBLIC_STORAGE_URL}${data.course.image || null}`
        );
        setTitle(data.course.title);
        setCourseTopics(data.course.course.join(", "));
        setCourseProgram(data.course.courseProgram.join(", "));
        setMonth(String(data.course.month));
        setPrice(String(data.course.price));
        setDescription(data.course.description);
        setLessonProcessDescription(data.course.lessonProcessDescription);
        setVideoUrl(
          `${process.env.NEXT_PUBLIC_STORAGE_URL}${data.course.video || null}`
        );
        setPhotosUrl(
          `${process.env.NEXT_PUBLIC_STORAGE_URL}${data.course.photos || null}`
        );
      }
    },
    onError: (err) => {
      toast.error(err.message || "Տվյալների ստացումը ձախողվեց։");
    },
  });
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ ջնջվել է։");
    },
    onError: (err) => {
      toast.error(err.message || "Ջնջումը ձախողվեց։");
    },
  });
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
    onCompleted: () => {
      toast.success("Դասընթացը հաջողությամբ թարմացվել է։");
      resetForm();
      setIsEditing(false);
      setEditingCourseId(null);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Թարմացումը ձախողվեց։");
    },
  });

  const minImageWidth = 280;
  const minImageHeight = 220;
  const maxImageWidth = 320;
  const maxImageHeight = 280;

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
          `<span class="math-inline">${selectedFile.name}</span> (${(
            selectedFile.size / 1024
          ).toFixed(2)} KB)`
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
      `<span class="math-inline">${selectedFile.name}</span>${(
        selectedFile.size / 1024
      ).toFixed(2)} KB)`
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
    setTitle("");
    setCourseTopics("");
    setCourseProgram("");
    setMonth("");
    setPrice("");
    setLessonProcessDescription("");
    setDescription("");
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (
      (!file && !isEditing && !imageUrl) ||
      !title ||
      !courseTopics ||
      !courseProgram ||
      !month ||
      !price ||
      !description ||
      !lessonProcessDescription ||
      (!photosFile && !isEditing && !photosUrl)
    ) {
      toast.error("Բոլոր դաշտերը պարտադիր են, և նկարները պետք է լինեն վավեր։");
      return;
    }

    const CourseInput = {
      title,
      image: file,
      video: videoFile,
      course: courseTopics.split(",").map((t) => t.trim()),
      courseProgram: courseProgram.split(",").map((t) => t.trim()),
      month: Number(month),
      price: Number(price),
      lessonProcessDescription,
      photos: photosFile,
      description,
    };

    try {
      if (isEditing && editingCourseId) {
        const updateInput: { [key: string]: unknown } = { ...CourseInput };
        if (!file && imageUrl) {
          delete updateInput.image;
        }
        if (!photosFile && photosUrl) {
          updateInput.photos = photosUrl;
        } else if (photosFile) {
          updateInput.photos = photosFile;
        }
        await updateCourse({
          variables: {
            id: editingCourseId,
            input: updateInput,
          },
        });
        resetForm();
        resetImageFile();
        resetPhotosFile();
        resetVideoFile();
      } else {
        await createCourses({
          variables: {
            Courses: [CourseInput],
          },
        });
        resetForm();
        resetImageFile();
        resetPhotosFile();
        resetVideoFile();
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
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
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
          placeholder="Պաստառի վերնագիր"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Կուրսեր՝ course1, course2"
          value={courseTopics ?? ""}
          onChange={(e) => setCourseTopics(e.target.value)}
        />
        <Textarea
          placeholder="Դասընթացի ծրագիրը course1, course2"
          value={courseProgram ?? ""}
          onChange={(e) => setCourseProgram(e.target.value)}
        />
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Ամիս"
            value={month ?? ""}
            onChange={(e) => setMonth(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Գին"
            value={price ?? ""}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Textarea
          placeholder="Դասընթացի նկարագրություն"
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Textarea
          placeholder="Դասընթացի ընթացքի նկարագրություն"
          value={lessonProcessDescription ?? ""}
          onChange={(e) => setLessonProcessDescription(e.target.value)}
        />

        <Button
          onClick={handleUpload}
          disabled={
            loading ||
            (!file && !isEditing && !imageUrl) ||
            !title ||
            !month ||
            !price ||
            !courseTopics ||
            !courseProgram ||
            (!photosFile && !isEditing && !photosUrl) || // Թարմացված պայման
            !description ||
            !lessonProcessDescription
          }>
          {loading
            ? "Վերբեռնում..."
            : isEditing
            ? "Թարմացնել դասընթացը"
            : "Վերբեռնել դասընթացը"}
        </Button>
      </div>
      <CoursesList
        getCourse={getCourse}
        deleteCourse={deleteCourse}
        onEdit={({ variables: { id } }: { variables: { id: string } }) => {
          setEditingCourseId(id);
          setIsEditing(true);
          getCourse({ variables: { id } });
        }}
      />
    </div>
  );
};

export default Courses;
