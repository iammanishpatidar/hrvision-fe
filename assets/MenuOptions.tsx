type MenuOptionsProps = {
  height?: string;
  width?: string;
  color?: string;
};

const MenuOptionsIcon = ({ height = '3', width = '13', color = '#8F9BB3' }: MenuOptionsProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill={color} />
      <circle cx="6.5" cy="1.5" r="1.5" fill={color} />
      <circle cx="11.5" cy="1.5" r="1.5" fill={color} />
    </svg>
  );
};

export default MenuOptionsIcon;
