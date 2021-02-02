export default function Circle({
  children,
  color,
  size = 200,
  style = {},
  ...props
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: rgba.apply(rgba, [...color]),
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: rgba.apply(rgba, [...color.splice(0, 3), 0.5]),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      {children}
    </div>
  );
}

function rgba(red, green, blue, alpha = 1) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
