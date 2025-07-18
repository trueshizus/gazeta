
import React from 'react';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  // Base classes for a panel. We can override these with more specific utility classes.
  const baseClasses = 'border border-solid rounded-lg shadow-sm';
  
  return (
    <Component className={`${baseClasses} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Panel;
