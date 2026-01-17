import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'heritage';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    styles.btn,
                    styles[variant],
                    styles[size],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className={styles.loading_spinner} size={16} />}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
