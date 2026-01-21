import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from "react-native";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children"> {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: "bg-yunicity-blue",
    text: "text-white",
  },
  secondary: {
    container: "bg-gray-100",
    text: "text-yunicity-black",
  },
  outline: {
    container: "bg-transparent border-2 border-gray-200",
    text: "text-yunicity-black",
  },
  ghost: {
    container: "bg-transparent",
    text: "text-yunicity-blue",
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: "py-2 px-4 rounded-lg",
    text: "text-sm",
  },
  md: {
    container: "py-3 px-6 rounded-xl",
    text: "text-base",
  },
  lg: {
    container: "py-4 px-8 rounded-xl",
    text: "text-lg",
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={cn(
        "items-center justify-center flex-row",
        variantStyles[variant].container,
        sizeStyles[size].container,
        fullWidth && "w-full",
        isDisabled && "opacity-50",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : "#1E40AF"}
          size="small"
        />
      ) : (
        <Text
          className={cn(
            "font-semibold text-center",
            variantStyles[variant].text,
            sizeStyles[size].text
          )}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
