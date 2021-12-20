import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultValue, validation,onChange, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="form-inputs">
      <label htmlFor={label} className="form-label">{label}</label>
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={label}
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