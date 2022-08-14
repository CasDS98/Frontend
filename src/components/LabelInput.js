import { useFormContext } from "react-hook-form";

const LabelInput = ({ label,placeholder, type, defaultValue, validation,onChange,showError , ...rest}) => {
  const { register, formState: { errors } } = useFormContext();
  

  return (
    <div className="form-inputs">
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={(!showError && errors[label] ?  errors[label].message : placeholder)}
        type={type}
        id={label}
        name={label}
        className="form-input"
        onChange={onChange}
        {...rest}
      />
          {
						showError && errors[label] ? (
              <p data-cy="labelinput-error" className="text-red-500">
                {errors[label].message}
              </p>
						) : null
					}
    </div>

  );
};

export default LabelInput;