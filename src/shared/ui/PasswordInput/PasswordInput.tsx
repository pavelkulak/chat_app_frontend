import {
  Input,
  InputGroup,
  IconButton,
  type InputProps,
} from "@chakra-ui/react";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { useState, type FC } from "react";

export const PasswordInput: FC<InputProps> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup
      endElement={
        <IconButton
          background="transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <LuEyeOff color="black" /> : <LuEye color="black" />}
        </IconButton>
      }
    >
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        {...props}
      />
    </InputGroup>
  );
};
