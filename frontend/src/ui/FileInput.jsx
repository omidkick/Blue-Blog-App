import {
  ArrowUpTrayIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

function FileInput({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired,
  className,
  validationSchema = {},
  errors,
  showPreview,
  setShowPreview,
  coverImageUrl,
  ...rest
}) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex justify-between items-center gap-x-2 ${
          hasError
            ? "border-red-500 text-red-600"
            : "border-primary-900 text-primary-900"
        }  ${className}`}
      >
        {/* Label + Upload Icon  */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <span>{label}</span>
          <ArrowUpTrayIcon className="w-5 h-5" />
        </div>

        {/* Preview Eye Icon */}
        {coverImageUrl && typeof setShowPreview === "function" && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPreview((prev) => !prev);
            }}
            className="transition p-1"
          >
            {showPreview ? (
              <EyeSlashIcon className="w-5 h-5 hover:text-red-800" />
            ) : (
              <EyeIcon className="w-5 h-5 hover:text-green-500" />
            )}
          </button>
        )}

        {/* Hidden input */}
        <input
          id="file-upload"
          type="file"
          className="sr-only hidden"
          name={name}
          dir={dir}
          // value={value}
          onChange={onChange}
          {...rest}
        />
      </label>

      {/* Handle Validation's error */}
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2 text-center">
          {errors[name]?.message}
        </span>
      )}
    </>
  );
}
export default FileInput;
