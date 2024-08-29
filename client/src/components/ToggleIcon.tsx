import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface ToggleIconProps {
  iconType: 'heart' | 'cart' | 'delete';  // Add 'delete' as a new iconType
  filledColor: string;
  outlineColor: string;
  onClick?: () => void;  // Add onClick as an optional property
}

const ToggleIcon: React.FC<ToggleIconProps> = ({ iconType, filledColor, outlineColor, onClick }) => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleFill = () => {
    setIsFilled(!isFilled);
  };

  const iconStyle = {
    color: isFilled ? filledColor : outlineColor,
    cursor: 'pointer',
  };

  const handleButtonClick = () => {
    if (iconType === 'delete') {
      toast.error('Item deleted');  // Displays an error message for delete
    } else {
      toast.success('You did it!');  // Displays a success message for heart or cart
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={toggleFill}>
      {iconType === 'heart' ? (
        <FaHeart onClick={handleButtonClick} style={iconStyle} className='w-6 h-6 m-2' />
      ) : iconType === 'cart' ? (
        <FaShoppingCart onClick={handleButtonClick} style={iconStyle} className='w-6 h-6 m-2' />
      ) : (
        <FaTrash onClick={handleButtonClick} style={iconStyle} className='w-6 h-6 m-2' />
      )}
    </div>
  );
};

export default ToggleIcon;
