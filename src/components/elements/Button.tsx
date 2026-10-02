import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClass = variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';
  return (
    <button className={`${baseClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};
