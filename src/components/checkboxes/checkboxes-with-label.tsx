import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

type CheckboxesWithLabelProps = {
  label?: string;
} & React.ComponentProps<typeof CheckboxPrimitive.Root>;

export default function CheckboxesWithLabel(props: CheckboxesWithLabelProps) {
  const id = useId();
  return (
    <Label className="flex items-center space-x-2">
      <Checkbox {...props} id={id} />
      {props.label}
    </Label>
  );
}
