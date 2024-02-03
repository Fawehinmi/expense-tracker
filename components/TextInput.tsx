import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect } from "react";
import { Text, Input, InputProps } from "@chakra-ui/react";

interface IProps extends InputProps {
  label?: string;
  name: string;
  placeHolder?: string;
}

export const ApTextInput: React.FC<IProps> = ({
  label,
  name,
  placeHolder,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && <Text mb="8px">{label}</Text>}

      <Input
        // name={name}
        placeholder={placeHolder ? placeHolder : ""}
        {...field}
        isInvalid={meta?.touched && !!meta?.error}
      />
      {/* <ErrorMessage
        className="text-red-500 text-sm"
        name={name}
        component="div"
      /> */}
    </div>
  );
};
