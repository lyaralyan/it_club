import UniversalModal from "@/components/UniversalModal";
import { useModalStore } from "@/store/modalStore";
import CustomButton from "@front/ui/CustomButton";

interface Props {
  params: {
    teachingCharacteristics: string;
    educationAndExperience: string;
    quote: string;
    orientation: { label: string }[];
  };
}

const DescriptionTeacher = ({ params }: Props) => {
  const { isOpen, closeModal, openModal } = useModalStore();

  const {
    teachingCharacteristics,
    orientation,
    educationAndExperience,
    quote,
  } = params;
  return (
    <div className={"mt-[16px]"}>
      <p className={"font-semibold text-[16px] text-[#4D4D4D]"}>
        Սոնայի դասավանդման առանձնահատկությունները
      </p>
      <p className={"font-light text-[16px] text-[var(--dark)] leading-[28px]"}>
        {teachingCharacteristics}
      </p>
      <p className={"font-semibold text-[16px] text-[#4D4D4D] mt-[29px]"}>
        Ինչի՞ վրա է կենտրոնանում Սոնան․
      </p>
      <ul
        className={
          "list-disc leading-[28px] font-light text-[16px] text-[var(--dark)] list-inside pl-2"
        }>
        {orientation.map(({ label }) => (
          <li key={label}>Օգտագործողի փորձի վերլուծություն</li>
        ))}
      </ul>
      <p className={"font-semibold text-[16px] text-[#4D4D4D] mt-[29px]"}>
        Կրթություն և փորձ
      </p>
      <p className={"font-light text-[16px] leading-[28px]"}>
        {educationAndExperience}
      </p>
      <p
        className={
          "font-light text-[16px] leading-[28px] mt-[29px] tracking-[0.04px]"
        }>
        {quote}
      </p>
      <CustomButton
        onClick={openModal}
        href={""}
        text={"Գրանցվել դասընթացին"}
        withIcon={true}
        color={true}
        className={"max-w-fit h-[48px] mt-[29px] font-semibold text-[16px]"}
      />
      <UniversalModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default DescriptionTeacher;
