import { useFormContext } from "react-hook-form";

const LabelInput = ({ label,placeholder, type, defaultValue, validation,onChange, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  

  return (
    <div className="form-inputs">
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={(errors[label] ?  errors[label].message : placeholder)}
        type={type}
        id={label}
        name={label}
        className="form-input"
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default LabelInput;