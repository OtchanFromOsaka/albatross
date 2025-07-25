import type { FC } from "hono/jsx";

interface TextFieldProps {
	id: string;
	name: string;
	type?: "text" | "password" | "email";
	label: string;
	placeholder: string;
	required?: boolean;
	disabled?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
	id,
	name,
	type = "text",
	label,
	placeholder,
	required = false,
	disabled = false,
}) => {
	const inputStyle = {
		cursor: disabled ? "not-allowed" : "text",
		opacity: disabled ? "0.6" : "1",
	};

	const containerClassName = "text-left";
	const labelClassName = "block text-sm font-medium text-gray-700 mb-2";
	const inputClassName =
		"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

	return (
		<div className={containerClassName}>
			<label htmlFor={id} className={labelClassName}>
				{label}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				required={required}
				disabled={disabled}
				style={inputStyle}
				className={inputClassName}
				placeholder={placeholder}
			/>
		</div>
	);
};
