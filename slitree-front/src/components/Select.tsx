import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export type OptionType = {
  value: string
  label: string
}

interface SelectCustomProps extends SelectPrimitive.SelectProps {
  options: OptionType[]
  placeholder: string
}

export function Select({ options, placeholder, ...props }: SelectCustomProps) {

  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-base leading-none h-[35px] gap-[5px] bg-teal-50 text-teal-700  hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
        aria-label="Food"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-teal-700">
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden bg-teal-50 rounded-md outline-none">
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-teal-700 cursor-default">
            <ChevronUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">

            {options.map(({ value, label }) => (
              <SelectPrimitive.Item
                key={value}
                value={value}
                className=
                'text-sm font-sans leading-none text-teal-700 rounded-sm flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-teal-100 data-[highlighted]:text-violet1'
              >
                <SelectPrimitive.ItemText>
                  {label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Check size={16} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}

          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-teal-700 cursor-default">
            <ChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}