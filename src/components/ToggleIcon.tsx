import React, { useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';


interface ToggleIconProps {
  iconType: 'heart' | 'cart';
  filledColor: string;
  outlineColor: string;
}

const ToggleIcon: React.FC<ToggleIconProps> = ({ iconType, filledColor, outlineColor }) => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleFill = () => {
    setIsFilled(!isFilled);
  };

  const iconStyle = {
    color: isFilled ? filledColor : outlineColor,
    cursor: 'pointer',
  };

  const handleButtonClick = () => {
    toast.success('You did it!'); // Displays a success message
  };


  return (
    <div onClick={toggleFill}>
      {iconType === 'heart' ? (
        <FaHeart  onClick={handleButtonClick} style={iconStyle} className='w-6 h-6 m-2' />
      ) : (
        <FaShoppingCart  onClick={handleButtonClick} style={iconStyle} className='w-6 h-6 m-2' />
      )}
    </div>
  );
};

export default ToggleIcon;
