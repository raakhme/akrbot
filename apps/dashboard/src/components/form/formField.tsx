import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';

interface FormFieldProps {
  children: React.ReactNode;
  label?: React.ReactNode;
  control?: FormCont
}

export const FormField = ({ children, label }: FormFieldProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {React.cloneElement(children, )}
      <Input type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
};
