import type { PropsWithChildren, FC } from "hono/jsx";

interface ButtonProps extends PropsWithChildren {
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
}

export const Button: FC<ButtonProps> = ({
	type = "button",
	onClick,
	disabled = false,
	loading = false,
	children,
	className = "",
}) => {
	const handleClick = () => {
		if (onClick && !disabled && !loading) onClick();
	};

	const style = {
		cursor: disabled || loading ? "not-allowed" : "pointer",
		opacity: disabled || loading ? "0.6" : "1",
	};

	return (
		<button
			type={type}
			onClick={handleClick}
			disabled={disabled || loading}
			style={style}
			className={className}
		>
			{loading ? "読み込み中..." : children}
		</button>
	);
};
