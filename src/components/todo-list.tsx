import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type DynamicInputListProps = {
  values: Array<{ label: string }>;
  onChange: (newValues: Array<{ label: string }>) => void;
  placeholder?: string;
  label?: string;
};

const DynamicInputList: React.FC<DynamicInputListProps> = ({
  values,
  onChange,
  placeholder = "Մուտքագրեք արժեք",
  label,
}) => {
  const handleAdd = () => {
    onChange([...values, { label: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    onChange(values.map((v, i) => (i === index ? { ...v, label: value } : v)));
  };

  return (
    <div className="space-y-2">
      {label && <h4 className="font-semibold text-lg">{label}</h4>}
      {values.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 items-center">
          <Input
            type="text"
            value={item.label}
            placeholder={placeholder}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleRemove(index)}>
            Հեռացնել
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={handleAdd}>
        Ավելացնել
      </Button>
    </div>
  );
};

export default DynamicInputList;
