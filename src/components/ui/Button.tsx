
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    rounded = false,
    icon,
    iconPosition = 'left',
    isLoading = false,
    fullWidth = false,
    asChild = false,
    children,
    ...props 
  }, ref) => {
    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border bg-transparent hover:bg-secondary text-foreground',
      ghost: 'bg-transparent hover:bg-secondary text-foreground',
      link: 'bg-transparent underline-offset-4 hover:underline text-primary hover:text-primary/90 p-0 h-auto'
    };
    
    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-5 py-2.5',
      xl: 'text-lg px-6 py-3'
    };
    
    const baseStyle = cn(
      'font-medium inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      variant !== 'link' && sizeStyles[size],
      rounded ? 'rounded-full' : 'rounded-md',
      variantStyles[variant],
      fullWidth && 'w-full',
      'button-subtle-hover',
      className
    );
    
    // Handle loading state
    const content = isLoading ? (
      <>
        <span className="opacity-0">{children}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      </>
    ) : (
      <>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>
    );
    
    if (asChild) {
      return (
        <button className={baseStyle} ref={ref} {...props}>
          {content}
        </button>
      );
    }
    
    return (
      <button className={baseStyle} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
