import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  href,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
    if (
      !e.defaultPrevented && // onClick didn't prevent default
      e.button === 0 && // left click
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey
    ) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      // Dispatch popstate event to notify app of URL change
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <a
      href={href}
      className={`relative font-medium hover:text-gold transition-colors duration-300 ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
    </a>
  );
};
