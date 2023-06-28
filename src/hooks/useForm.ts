import { useState, ChangeEvent } from 'react';

type TUseFormInput = {
  [key: string]: string
}

type TUseForm = {
  values: TUseFormInput;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: TUseFormInput) => void;
}

export function useForm(inputValues: TUseFormInput = {}): TUseForm {
    const [values, setValues] = useState<TUseFormInput>(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
  }