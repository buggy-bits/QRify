import { useState } from 'react';

const StyleSettings = ({ options, setOptions }) => {
  const dotTypes = ['square', 'dots', 'rounded', 'classy', 'classy-rounded'];
  const cornerSquareTypes = ['square', 'dot', 'extra-rounded'];
  const cornerDotTypes = ['square', 'dot'];
  const [qrMargin, setQrMargin] = useState(options.margin || 0);
  
  // Handle dot type change
  const handleDotTypeChange = (type) => {
    setOptions({
      ...options,
      dotsOptions: {
        ...options.dotsOptions,
        type
      }
    });
  };
  
  // Handle corner square type change
  const handleCornerSquareTypeChange = (type) => {
    setOptions({
      ...options,
      cornersSquareOptions: {
        ...options.cornersSquareOptions,
        type
      }
    });
  };
  
  // Handle corner dot type change
  const handleCornerDotTypeChange = (type) => {
    setOptions({
      ...options,
      cornersDotOptions: {
        ...options.cornersDotOptions,
        type
      }
    });
  };
  
  // Handle margin change
  const handleMarginChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQrMargin(value);
    setOptions({
      ...options,
      margin: value
    });
  };
  
  // Handle color changes
  const handleColorChange = (colorType, color) => {
    switch (colorType) {
      case 'dots':
        setOptions({
          ...options,
          dotsOptions: {
            ...options.dotsOptions,
            color
          }
        });
        break;
      case 'cornerSquare':
        setOptions({
          ...options,
          cornersSquareOptions: {
            ...options.cornersSquareOptions,
            color
          }
        });
        break;
      case 'cornerDot':
        setOptions({
          ...options,
          cornersDotOptions: {
            ...options.cornersDotOptions,
            color
          }
        });
        break;
      case 'background':
        setOptions({
          ...options,
          backgroundOptions: {
            ...options.backgroundOptions,
            color
          }
        });
        break;
      default:
        break;
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">QR Style Options</h3>
      
      {/* QR Code Margin */}
      <div className="mb-6">
        <div className="flex justify-between">
          <label htmlFor="qr-margin" className="label">QR Code Margin</label>
          <span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
            {qrMargin} px
          </span>
        </div>
        <input
          id="qr-margin"
          type="range"
          min="0"
          max="50"
          step="5"
          value={qrMargin}
          onChange={handleMarginChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">
          <span>No margin</span>
          <span>Large margin</span>
        </div>
      </div>
      
      {/* Dot Type */}
      <div className="mb-4">
        <label className="label">Dot Style</label>
        <div className="grid grid-cols-3 gap-2">
          {dotTypes.map(type => (
            <button
              key={type}
              className={`text-sm p-2 rounded border ${
                options.dotsOptions.type === type 
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleDotTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Corner Square Type */}
      <div className="mb-4">
        <label className="label">Corner Square Style</label>
        <div className="grid grid-cols-3 gap-2">
          {cornerSquareTypes.map(type => (
            <button
              key={type}
              className={`text-sm p-2 rounded border ${
                options.cornersSquareOptions?.type === type 
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleCornerSquareTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Corner Dot Type */}
      <div className="mb-4">
        <label className="label">Corner Dot Style</label>
        <div className="grid grid-cols-3 gap-2">
          {cornerDotTypes.map(type => (
            <button
              key={type}
              className={`text-sm p-2 rounded border ${
                options.cornersDotOptions?.type === type 
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleCornerDotTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Colors */}
      <div className="mb-4">
        <label className="label">Colors</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Dots Color</label>
            <input 
              type="color" 
              value={options.dotsOptions.color}
              onChange={(e) => handleColorChange('dots', e.target.value)}
              className="w-full h-8 p-0 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-xs mb-1">Corner Square Color</label>
            <input 
              type="color" 
              value={options.cornersSquareOptions?.color || '#000000'}
              onChange={(e) => handleColorChange('cornerSquare', e.target.value)}
              className="w-full h-8 p-0 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-xs mb-1">Corner Dot Color</label>
            <input 
              type="color" 
              value={options.cornersDotOptions?.color || '#000000'}
              onChange={(e) => handleColorChange('cornerDot', e.target.value)}
              className="w-full h-8 p-0 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-xs mb-1">Background Color</label>
            <input 
              type="color" 
              value={options.backgroundOptions?.color || '#ffffff'}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-full h-8 p-0 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSettings; 