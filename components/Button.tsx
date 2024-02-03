import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface IProps extends ButtonProps {
  onClick?: () => void;
  title?: string;
}

const ApButton: React.FC<IProps> = ({ onClick, title, ...props }) => {
  return (
    <Button onClick={() => onclick} {...props}>
      {title}
    </Button>
  );
};

export default ApButton;
