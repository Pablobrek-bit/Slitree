'use client'

import { useAutosizeTextArea } from '@/hooks/useAutosizeTextArea';
import { ComponentProps, useRef, useState } from 'react';

interface TextareaProps extends ComponentProps<'textarea'> { }

export function Textarea({ onChange, ...props }: TextareaProps) {
  const [value, setValue] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventValue = event.target?.value;

    setValue(eventValue);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <textarea
      id="review-text"
      onChange={handleChange}
      className='w-full text-lg resize-none no-scrollbar outline-none border-none bg-transparent'
      placeholder="O que você gostaria de semear hoje?"
      ref={textAreaRef}
      rows={1}
      value={value}
      {...props}
    />

  )
}