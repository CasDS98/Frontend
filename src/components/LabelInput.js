import { useFormContext } from "react-hook-form";

const LabelInput = ({ label,placeholder, type, defaultValue, validation,onChange, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="form-inputs">
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        id={label}
        name={label}
        className="form-input"
        onChange={onChange}
        {...rest}
      />
      {errors[label] && (
        <p data-cy="labelinput-error">
          {errors[label].message}
        </p>
      )}
    </div>
  );
};

export default LabelInput;