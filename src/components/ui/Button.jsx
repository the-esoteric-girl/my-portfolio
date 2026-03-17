import './Button.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  disabled = false,
  onClick,
  children,
  className,
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'a') {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
