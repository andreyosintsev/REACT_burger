import { useState, ChangeEvent } from 'react';

type TUseForm = {
  values: any;
  handleChange: any;
  setValues: any;
}

export function useForm(inputValues={}): TUseForm {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
  }