"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowDownWideNarrow, ArrowUpAZ } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SortProducts() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          Urutkan
          <ArrowDownWideNarrow className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="space-y-5 overflow-y-auto max-h-96"
      >
        <div className="space-y-3">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <Label>
                <RadioGroupItem value="option-one" />
                Alphabetical
                <ArrowDownAZ />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label>
                <RadioGroupItem value="option-one" />
                Alphabetical
                <ArrowUpAZ />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label>
                <RadioGroupItem value="option-one" />
                Category
                <ArrowDownAZ />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label>
                <RadioGroupItem value="option-one" />
                Category
                <ArrowUpAZ />
              </Label>
            </div>
          </RadioGroup>
        </div>
        {/*todo: sorting based on
              - alphabetical
              - category (for page with all categories)
              - */}
      </PopoverContent>
    </Popover>
  );
}
