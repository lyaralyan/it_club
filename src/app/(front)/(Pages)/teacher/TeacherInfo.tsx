import Title from "@front/components/Title";
import Image from "next/image";
import Check from "@front/assets/icons/check.svg";

interface Props {
  params: {
    name: string;
    position: string;
    bio: string;
    skillList: {
      label: string;
    }[];
    image: string;
  };
}

const TeacherInfo = ({ params }: Props) => {
  const { name, position, bio, skillList, image } = params;
  return (
    <div className="mt-[70px]">
      <div className={"flex items-center justify-between"}>
        <div className="max-w-[50%] min-h-[328px]">
          <Title text={name} />
          <p className={"font-light text-[24px] mt-[16px] text-[var(--dark)]"}>
            {position}
          </p>
          <p className={"font-normal text-[16px] mt-[24px] text-[var(--dark)]"}>
            {bio}
          </p>
          <div>
            {skillList.map(({ label }) => (
              <div
                className={"flex items-center mt-[24px] gap-[4px]"}
                key={label}>
                <Check className={"w-[24px] h-[24px]"} />
                <p className={"font-[200] text-[16px] text-[var(--dark)]"}>
                  Իրական փորձ՝ միջազգային և տեղական նախագծերում
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={"max-w-[50%] min-h-[425px]"}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image}`}
            alt="Group Image"
            className={"w-full h-full object-cover object-center"}
            width={381}
            height={425}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
