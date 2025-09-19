"use client";
import * as React from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IconCloudUp, IconTrash } from "@tabler/icons-react";
import { GET_ABOUT_US } from "@/app/requests/query";
import { CREATE_OR_UPDATE_ABOUT_US } from "@/app/requests/mutation";

type Section = {
  title: string;
  subTitle: string;
  description: string;
  image: File | null;
  imageUrl: string | null;
};
const AboutUsAdmin = () => {
  const [sections, setSections] = React.useState<Section[]>([
    {
      title: "Title 1",
      subTitle: "Subtitle 1",
      description: "",
      image: null,
      imageUrl: null,
    },
    {
      title: "Title 2",
      subTitle: "Subtitle 2",
      description: "",
      image: null,
      imageUrl: null,
    },
    {
      title: "Title 3",
      subTitle: "Subtitle 3",
      description: "",
      image: null,
      imageUrl: null,
    },
  ]);

  const {} = useQuery(GET_ABOUT_US, {
    onCompleted: (data) => {
      if (data?.getAboutUs) {
        const { first, second, third } = data.getAboutUs;
        setSections([
          {
            title: "first",
            description: first.description,
            image: null,
            imageUrl: `${process.env.NEXT_PUBLIC_STORAGE_URL}${first.image}`,
            subTitle: first.subTitle,
          },
          {
            title: "second",
            description: second.description,
            image: null,
            imageUrl: `${process.env.NEXT_PUBLIC_STORAGE_URL}${second.image}`,
            subTitle: second.subTitle,
          },
          {
            title: "third",
            description: third.description,
            image: null,
            imageUrl: `${process.env.NEXT_PUBLIC_STORAGE_URL}${third.image}`,
            subTitle: third.subTitle,
          },
        ]);
      }
    },
  });

  const [createOrUpdateAboutUs, { loading }] = useMutation(
    CREATE_OR_UPDATE_ABOUT_US,
    {
      refetchQueries: [{ query: GET_ABOUT_US }],
      onCompleted: () => toast.success("Թարմացվել է հաջողությամբ։"),
      onError: (err) => toast.error(err.message),
    }
  );

  const handleDescriptionChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].description = value;
    setSections(newSections);
  };

  const handleImageSelect = (index: number, file: File) => {
    const newSections = [...sections];
    newSections[index].image = file;
    newSections[index].imageUrl = URL.createObjectURL(file);
    setSections(newSections);
  };

  const handleRemoveImage = (index: number) => {
    const newSections = [...sections];
    newSections[index].image = null;
    newSections[index].imageUrl = null;
    setSections(newSections);
  };

  const handleSave = async () => {
    const input = {
      first: {
        title: sections[0].title,
        subTitle: sections[0].subTitle,
        description: sections[0].description,
        image: sections[0].image,
      },
      second: {
        title: sections[1].title,
        subTitle: sections[1].subTitle,
        description: sections[1].description,
        image: sections[1].image,
      },
      third: {
        title: sections[2].title,
        subTitle: sections[2].subTitle,
        description: sections[2].description,
        image: sections[2].image,
      },
    };
    await createOrUpdateAboutUs({ variables: { input } });
  };

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div
          key={section.title}
          className="border rounded p-4 space-y-2">
          <input
            type="text"
            placeholder="Վերնագիր"
            className="w-full border rounded p-2 mb-2"
            value={section.title}
            onChange={(e) => {
              const newSections = [...sections];
              newSections[index].title = e.target.value;
              setSections(newSections);
            }}
          />
          <input
            type="text"
            placeholder="Ենթավերնագիր"
            className="w-full border rounded p-2 mb-2"
            value={section.subTitle}
            onChange={(e) => {
              const newSections = [...sections];
              newSections[index].subTitle = e.target.value;
              setSections(newSections);
            }}
          />
          <Textarea
            placeholder="Նկարագրություն"
            value={section.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
          <div className="relative w-60 h-40 border rounded overflow-hidden">
            {section.imageUrl ? (
              <>
                <Image
                  src={section.imageUrl}
                  alt="Preview"
                  fill
                  objectFit="cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                  <IconTrash size={16} />
                </button>
              </>
            ) : (
              <label
                className="flex items-center justify-center h-full cursor-pointer"
                htmlFor={`upload-${index}`}>
                <IconCloudUp
                  size={32}
                  className="text-blue-500"
                />
              </label>
            )}
            <input
              id={`upload-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageSelect(index, file);
              }}
            />
          </div>
        </div>
      ))}
      <Button
        onClick={handleSave}
        disabled={loading}>
        {loading ? "Պահպանում..." : "Պահպանել"}
      </Button>
    </div>
  );
};

export default AboutUsAdmin;
