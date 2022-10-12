import React from 'react';
import {
  useForm,
  FieldValues,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

export type FormContextValue = {
  form: UseFormReturn | null;
};

export const FormContext = React.createContext<FormContextValue>({
  form: null,
});

interface FormComponentProps<T extends FieldValues> extends UseFormProps<T> {
  children: React.ReactNode;
  onSubmit: (values: T) => Promise<void>;
}

const FormComponent = <T extends FieldValues = any>({
  children,
  onSubmit,
  ...useFormProps
}: FormComponentProps<T>) => {
  const form = useForm<T>(useFormProps);

  return (
    <FormContext.Provider value={{ form: form as UseFormReturn }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
};

export default FormComponent;
