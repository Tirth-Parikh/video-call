export default function Input({ type, placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border px-3 py-2 w-full rounded"
      />
    );
  }