"use client";
import * as React from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IconCloudUp, IconTrash } from "@tabler/icons-react";
import { GET_BLOGS } from "@/app/requests/query";
import { CREATE_BLOG, UPDATE_BLOG, DELETE_BLOG } from "@/app/requests/mutation";

// Տվյալների տեսակը
export type Section = {
  id?: string;
  title: string;
  description: string;
  description2: string;
  image: File | null;
  imageUrl: string | null;
  video: File | null;
  videoUrl: string | null;
};

const BlogAdmin = () => {
  const [sections, setSections] = React.useState<Section[]>([]);

  const { data } = useQuery(GET_BLOGS);

  React.useEffect(() => {
    if (data?.getBlogs) {
      const formatted: Section[] = data.getBlogs.map((blog: BlogItemProp) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        description2: blog.description2,
        image: null,
        imageUrl: blog.image
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${blog.image}`
          : null,
        video: null,
        videoUrl: blog.video
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${blog.video}`
          : null,
      }));
      setSections(formatted);
    }
  }, [data]);

  const [createBlog] = useMutation(CREATE_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }],
    onCompleted: () => toast.success("Ստեղծվել է հաջողությամբ։"),
    onError: (err) => toast.error(err.message),
  });

  const [updateBlog] = useMutation(UPDATE_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }],
    onCompleted: () => toast.success("Թարմացվել է հաջողությամբ։"),
    onError: (err) => toast.error(err.message),
  });

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }],
    onCompleted: () => toast.success("Ջնջվել է հաջողությամբ։"),
    onError: (err) => toast.error(err.message),
  });

  const handleSave = async () => {
    const existingIds = new Set(data?.getBlogs?.map((b: BlogItemProp) => b.id));

    for (const blog of sections) {
      const isExisting = Boolean(blog.id);

      // Եթե նոր է, նկար և վիդեո պետք է պարտադիր լինեն
      if (!isExisting && (!blog.image || !blog.video)) {
        console.log('📢 [page.tsx:75]', isExisting, blog)
        toast.error(
          `Նոր բաժնի համար անհրաժեշտ է վերբեռնել թե՛ նկար, թե՛ տեսանյութ։`
        );
        continue;
      }

      if (isExisting) {
        // Եթե ոչ մի բան չի փոխվել, մի արա update
        const original = data.getBlogs.find(
          (b: BlogItemProp) => b.id === blog.id
        );
        const isUnchanged =
          blog.title === original?.title &&
          blog.description === original?.description &&
          blog.description2 === original?.description2 &&
          !blog.image &&
          !blog.video;

        if (isUnchanged) continue;

        const input: BlogItemProp = {
          title: blog.title,
          description: blog.description,
          description2: blog.description2,
        };
        if (blog.image) input.image = blog.image;
        if (blog.video) input.video = blog.video;

        await updateBlog({ variables: { id: blog.id, input } });
      } else {
        await createBlog({
          variables: {
            inputs: [
              {
                title: blog.title,
                description: blog.description,
                description2: blog.description2,
                image: blog.image,
                video: blog.video,
              },
            ],
          },
        });
      }
    }

    const currentIds = new Set(
      sections
        .map((s) => s.id)
        .filter((id): id is string => typeof id === "string")
    );
    const removedIds = [...existingIds].filter((id) =>
      typeof id === "string" ? !currentIds.has(id) : false
    );
    console.log('📢 [page.tsx:129]', removedIds)
    if (removedIds.length) {
      console.log("Հեռացված բլոգների ID-ները:", removedIds);
      await Promise.all(
        removedIds.map((id) => deleteBlog({ variables: { id } }))
      );
    }
  };

  const handleFieldChange = (
    index: number,
    field: keyof Section,
    value: Section[keyof Section]
  ) => {
    console.log("📢 [page.tsx:111]", value);
    const newSections = [...sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value,
    };
    setSections(newSections);
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        description2: "",
        image: null,
        imageUrl: null,
        video: null,
        videoUrl: null,
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="border rounded p-4 space-y-2">
          <div className="flex justify-end">
            <button
              onClick={() => removeSection(index)}
              className="text-red-600 hover:underline text-sm">
              Ջնջել բաժինը
            </button>
          </div>

          <input
            type="text"
            placeholder="Վերնագիր"
            className="w-full border rounded p-2"
            value={section.title}
            onChange={(e) => handleFieldChange(index, "title", e.target.value)}
          />

          <Textarea
            placeholder="Նկարագրություն"
            value={section.description}
            onChange={(e) =>
              handleFieldChange(index, "description", e.target.value)
            }
            className="h-40"
          />

          <Textarea
            placeholder="Նկարագրություն 2"
            value={section.description2}
            onChange={(e) =>
              handleFieldChange(index, "description2", e.target.value)
            }
            className="h-40"
          />

          {/* Image Input */}
          <div className="relative w-60 h-40 border rounded overflow-hidden">
            {section.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={section.imageUrl}
                  alt="Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  onClick={() => {
                    handleFieldChange(index, "image", null);
                    handleFieldChange(index, "imageUrl", null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  type="button"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <label
                  htmlFor={`upload-${index}`}
                  className="flex items-center cursor-pointer"
                >
                  <IconCloudUp size={32} className="text-blue-500" />
                  <span className="ml-2">Վերբեռնել նկար</span>
                </label>
                <input
                  id={`upload-${index}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFieldChange(index, "image", file);
                      handleFieldChange(index, "imageUrl", URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Video Input */}
          <div className="relative w-full border rounded p-2">
            {section.videoUrl ? (
              <div className="relative">
                <video
                  controls
                  className="w-full h-40 object-cover">
                  <source
                    src={section.videoUrl}
                    type="video/mp4"
                  />
                </video>
                <button
                  onClick={() => {
                    handleFieldChange(index, "video", null);
                    handleFieldChange(index, "videoUrl", null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                  <IconTrash size={16} />
                </button>
                <label
                  htmlFor={`upload-video-${index}`}
                  className="absolute inset-0 cursor-pointer">
                  <span className="sr-only">Փոխել տեսանյութը</span>
                </label>
              </div>
            ) : (
              <label
                className="flex items-center justify-center h-40 cursor-pointer border rounded"
                htmlFor={`upload-video-${index}`}>
                <IconCloudUp
                  size={32}
                  className="text-green-500"
                />
                <span className="ml-2">Վերբեռնել տեսանյութ</span>
              </label>
            )}
            <input
              id={`upload-video-${index}`}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFieldChange(index, "video", file);
                  handleFieldChange(
                    index,
                    "videoUrl",
                    URL.createObjectURL(file)
                  );
                }
              }}
            />
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={addSection}>
        Ավելացնել բաժին
      </Button>

      <Button
        onClick={handleSave}
        disabled={false}>
        Պահպանել
      </Button>
    </div>
  );
};

export default BlogAdmin;
