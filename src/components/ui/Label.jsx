import './Label.css';

export default function Label({
  variant = 'meta',
  as: Tag = 'span',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`label label--${variant}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
