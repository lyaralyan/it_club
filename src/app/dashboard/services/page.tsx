"use client";
import * as React from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { IconCloudUp, IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CREATE_SERVICES,
  CREATE_SUB_SERVICE,
  DELETE_SERVICES,
} from "@/app/requests/mutation";
import { GET_SERVICES } from "@/app/requests/query";
import { toast } from "sonner";
import ServicesList from "@/app/dashboard/services/ServicesList";
import DynamicInputList from "@/components/todo-list";

const VideoUpload = ({
  id,
  preview,
  onSelect,
  onRemove,
  label,
}: {
  id: string;
  preview: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  label: string;
}) => (
  <div className="relative w-full h-56 border rounded-lg bg-white overflow-hidden">
    {preview ? (
      <>
        <video
          controls
          src={preview}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-600 hover:text-red-800 shadow">
          <IconTrash />
        </button>
      </>
    ) : (
      <label
        htmlFor={id}
        className="flex items-center justify-center h-full cursor-pointer text-gray-500">
        <div className="flex flex-col items-center">
          <IconCloudUp size={40} />
          <span className="text-sm">{label}</span>
        </div>
      </label>
    )}
    <input
      id={id}
      type="file"
      accept="video/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onSelect(file);
      }}
    />
  </div>
);

const ImageUpload = ({
  id,
  preview,
  onSelect,
  onRemove,
  label,
}: {
  id: string;
  preview: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  label: string;
}) => (
  <div className="relative w-full h-56 border rounded-lg bg-white overflow-hidden">
    {preview ? (
      <>
        <Image
          src={preview}
          alt="Preview"
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-600 hover:text-red-800 shadow">
          <IconTrash />
        </button>
      </>
    ) : (
      <label
        htmlFor={id}
        className="flex items-center justify-center h-full cursor-pointer text-gray-500">
        <div className="flex flex-col items-center">
          <IconCloudUp size={40} />
          <span className="text-sm">{label}</span>
        </div>
      </label>
    )}
    <input
      id={id}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onSelect(file);
      }}
    />
  </div>
);

const Services = () => {
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videoPreview, setVideoPreview] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [subServices, setSubServices] = React.useState<
    {
      id: string;
      title: string;
      description: string;
      image: File | null;
      banner: File | null;
      bannerDescription: string;
      planning: { label: string }[];
      planningTitle: string;
    }[]
  >([]);
  const [mainServiceId, setMainServiceId] = React.useState<string | null>(null);

  const { data, loading: loadingServices, error } = useQuery(GET_SERVICES);

  const [createService, { loading }] = useMutation(CREATE_SERVICES, {
    onCompleted: (data) => {
      toast.success("Ծառայությունը հաջողությամբ ավելացվեց");
      resetForm();
      const created = data?.createService;
      if (created?.id) {
        setMainServiceId(created.id);
      }
    },
    onError: (err) => toast.error(err.message || "Սխալ ավելացնելու ընթացքում"),
    refetchQueries: [{ query: GET_SERVICES }],
  });

  const [createSubService] = useMutation(CREATE_SUB_SERVICE, {
    onCompleted: () => {},
    onError: (err) =>
      toast.error(err.message || "Սխալ ենթածառայություն ավելացնելիս"),
    refetchQueries: [{ query: GET_SERVICES }],
  });

  const [deleteSubService] = useMutation(DELETE_SERVICES, {
    onCompleted: () => toast.success("Ջնջվեց հաջողությամբ"),
    onError: (err) => toast.error(err.message || "Ջնջման սխալ"),
    refetchQueries: [{ query: GET_SERVICES }],
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVideoFile(null);
    setVideoPreview(null);
    setSubServices([]);
    setMainServiceId(null);
  };

  const handleAddSubService = () => {
    setSubServices((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        image: null,
        banner: null,
        bannerDescription: "",
        planning: [],
        planningTitle: "",
      },
    ]);
  };

  const handleSubServiceChange = (
    id: string,
    field:
      | "title"
      | "description"
      | "image"
      | "banner"
      | "bannerDescription"
      | "planning"
      | "planningTitle",
    value: string | File | null | { label: string }[]
  ) => {
    setSubServices((prev) => {
      const newSubServices = prev.map((sub) => {
        if (sub.id !== id) return sub;
        if (field === "image" || field === "banner") {
          return {
            ...sub,
            [field]: value instanceof File ? value : null,
          };
        } else {
          return {
            ...sub,
            [field]: value,
          };
        }
      });
      return newSubServices;
    });
  };

  const handleRemoveSubService = (id: string) => {
    setSubServices((prev) => prev.filter((sub) => sub.id !== id));
  };

  // Updated submit handlers
  const handleMainServiceSubmit = async () => {
    try {
      if (!title || !description || !videoFile) {
        toast.error("Խնդրում ենք լրացնել բոլոր դաշտերը և վերբեռնել վիդեո");
        return;
      }
      await createService({
        variables: {
          input: {
            title,
            description,
            video: videoFile,
          },
        },
      });
      // onCompleted sets mainServiceId and resets form
    } catch (error) {
      console.error(error);
      toast.error("Գլխավոր ծառայությունը ավելացնելիս սխալ է տեղի ունեցել");
    }
  };

  const handleAddSubServices = async () => {
    // if (!mainServiceId) {
    //   toast.error("Խնդրում ենք նախ ավելացնել գլխավոր ծառայությունը");
    //   return;
    // }
    try {
      await Promise.all(
        subServices.map((subService) =>
          createSubService({
            variables: {
              input: subService,
            },
          })
        )
      );
      toast.success("Հաջողությամբ ավելացվեցին ենթածառայությունները");
      setSubServices([]);
    } catch (error) {
      console.error(error);
      toast.error("Սխալ է տեղի ունեցել ենթածառայությունները ավելացնելիս");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <VideoUpload
        id="video-upload"
        preview={videoPreview}
        onSelect={(file) => {
          setVideoFile(file);
          setVideoPreview(URL.createObjectURL(file));
        }}
        onRemove={() => {
          setVideoFile(null);
          setVideoPreview(null);
        }}
        label="Վերբեռնել վիդեո"
      />
      <Input
        className="bg-white"
        placeholder="Վերնագիր"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        className="bg-white"
        placeholder="Նկարագրություն"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Ենթածառայություններ</h3>
          <Button
            variant="outline"
            onClick={handleAddSubService}>
            <IconPlus
              size={16}
              className="mr-1"
            />
            Ավելացնել
          </Button>
        </div>
        {subServices.map((s) => (
          <div
            key={s.id}
            className="p-4 border rounded-md relative space-y-2 bg-gray-50">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveSubService(s.id)}>
              <IconTrash size={16} />
            </button>
            <ImageUpload
              id={`image-upload-${s.id}`}
              preview={s.image ? URL.createObjectURL(s.image) : null}
              onSelect={(file) => handleSubServiceChange(s.id, "image", file)}
              onRemove={() => handleSubServiceChange(s.id, "image", null)}
              label="Վերբեռնել նկար"
            />
            <ImageUpload
              id={`banner-upload-${s.id}`}
              preview={s.banner ? URL.createObjectURL(s.banner) : null}
              onSelect={(file) => handleSubServiceChange(s.id, "banner", file)}
              onRemove={() => handleSubServiceChange(s.id, "banner", null)}
              label="Վերբեռնել պաստառ"
            />
            <Input
              className="bg-white"
              placeholder="Ենթածառայության վերնագիր"
              value={s.title}
              onFocus={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleSubServiceChange(s.id, "title", e.target.value)
              }
            />
            <Input
              className="bg-white"
              placeholder="Նկարագրություն"
              value={s.description}
              onFocus={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleSubServiceChange(s.id, "description", e.target.value)
              }
            />
            <Input
              className="bg-white"
              placeholder="Հմտությունների վերնագիր"
              value={s.planningTitle}
              onFocus={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleSubServiceChange(s.id, "planningTitle", e.target.value)
              }
            />

            <Input
              className="bg-white"
              placeholder="Պաստառի նկարագրություն"
              value={s.bannerDescription}
              onFocus={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleSubServiceChange(
                  s.id,
                  "bannerDescription",
                  e.target.value
                )
              }
            />
            <DynamicInputList
              values={s.planning}
              onChange={(updated) =>
                handleSubServiceChange(s.id, "planning", updated)
              }
              placeholder="Օրինակ՝ skill1, skill2"
              label="Հմտություններ՝"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {s.planning.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm bg-gray-200 rounded">
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleMainServiceSubmit}
          disabled={!!data?.Services?.id || loading}>
          {loading ? "Վերբեռնում..." : "Ավելացնել գլխավոր ծառայություն"}
        </Button>
        <Button
          onClick={handleAddSubServices}
          disabled={!!mainServiceId || loading}>
          Ավելացնել ենթածառայություններ
        </Button>
      </div>

      <div className="pt-6 border-t">
        {loadingServices ? (
          <p>Բեռնվում է...</p>
        ) : error ? (
          <p className="text-red-500">Տվյալները բեռնելիս սխալ է տեղի ունեցել</p>
        ) : (
          data?.Services?.ServicesList?.map(
            (item: ServiceListItem, idx: number) => (
              <ServicesList
                key={item.id || idx}
                item={{
                  ...item,
                  banner: item.banner ?? "no-banner",
                }}
                onDelete={() => deleteSubService({ variables: { id: item.id } })}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Services;
