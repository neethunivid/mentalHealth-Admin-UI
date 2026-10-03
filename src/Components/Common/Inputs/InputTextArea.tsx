import React, { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

interface LayoutProps {
  control?: any;
  error?: any;
  defaultValue?: any;
  name?: any;
  className?: any;
  setValue?: any;
  readOnly?: boolean;
}

const InputTextArea = ({
  control,
  error,
  defaultValue,
  name,
  className,
  setValue,
  readOnly,
}: LayoutProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  let textAreaHeight: any;
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
    if (setValue) {
      setValue(name, defaultValue);
      const textArea = inputRef.current;
      if (textArea) {
        textAreaHeight = textArea.scrollHeight + "px";
      }
    }
  }, [error, defaultValue, textAreaHeight]);

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <>
          <textarea
            {...field}
            style={{ height: textAreaHeight }}
            className={className}
            rows={10}
            ref={(el) => {
              inputRef.current = el;
              field.ref(el);
            }}
            readOnly={readOnly}
          ></textarea>
        </>
      )}
    />
  );
};

export default InputTextArea;
