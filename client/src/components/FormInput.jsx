const FormInput = ({
  icon,
  alt,
  type,
  placeholder,
  name,
  value,
  onChangeHandler,
}) => {
  return (
    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
      <img src={icon} alt={alt} />
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
        className="bg-transparent outline-none"
        required
      />
    </div>
  );
};

export default FormInput;
