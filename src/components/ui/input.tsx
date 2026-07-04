import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "flex w-full rounded-md border bg-ivory-50",
    "font-body text-body-md text-charcoal-900",
    "placeholder:text-muted-foreground",
    "transition-all duration-300 ease-luxury",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "border-border hover:border-gold-400/50 focus-visible:border-gold-500",
        luxury: [
          "border-gold-300/40 bg-ivory-100",
          "hover:border-gold-400 focus-visible:border-gold-500",
        ],
        ghost: "border-transparent bg-ivory-200/50 hover:bg-ivory-200",
      },
      inputSize: {
        sm: "h-9 px-3 text-body-sm",
        md: "h-11 px-4",
        lg: "h-12 px-5 text-body-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        inputVariants({ variant, inputSize }),
        error && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      aria-invalid={error}
      {...props}
    />
  ),
);
Input.displayName = "Input";

const labelVariants = cva(
  "font-body text-body-sm font-medium text-charcoal-800 tracking-wide",
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants(), className)} {...props}>
      {children}
      {required && (
        <span className="text-maroon-700 ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  ),
);
Label.displayName = "Label";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint ? `${htmlFor}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-caption text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Input, Label, FormField, inputVariants };
