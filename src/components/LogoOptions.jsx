import { useState, useEffect } from 'react';

const LogoOptions = ({ options, setOptions }) => {
  const [logoSize, setLogoSize] = useState(options.imageOptions?.imageSize || 0.3);
  const [logoMargin, setLogoMargin] = useState(options.imageOptions?.margin || 0);
  
  // Update QR options when logo size changes
  useEffect(() => {
    setOptions({
      ...options,
      imageOptions: {
        ...options.imageOptions,
        imageSize: logoSize,
      }
    });
  }, [logoSize]);
  
  // Update QR options when logo margin changes
  useEffect(() => {
    setOptions({
      ...options,
      imageOptions: {
        ...options.imageOptions,
        margin: logoMargin,
      }
    });
  }, [logoMargin]);
  
  // Handle logo size change
  const handleLogoSizeChange = (e) => {
    setLogoSize(parseFloat(e.target.value));
  };
  
  // Handle logo margin change
  const handleLogoMarginChange = (e) => {
    setLogoMargin(parseInt(e.target.value, 10));
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Logo Options</h3>
      
      {options.image ? (
        <>
          {/* Logo Size Slider */}
          <div className="mb-4">
            <div className="flex justify-between">
              <label htmlFor="logo-size" className="label">Logo Size</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(logoSize * 100)}%
              </span>
            </div>
            <input
              id="logo-size"
              type="range"
              min="0.05"
              max="0.5"
              step="0.01"
              value={logoSize}
              onChange={handleLogoSizeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
          
          {/* Logo Margin Slider */}
          <div className="mb-4">
            <div className="flex justify-between">
              <label htmlFor="logo-margin" className="label">Logo Margin</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {logoMargin} px
              </span>
            </div>
            <input
              id="logo-margin"
              type="range"
              min="0"
              max="10"
              step="1"
              value={logoMargin}
              onChange={handleLogoMarginChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>No margin</span>
              <span>Large margin</span>
            </div>
          </div>
          
          {/* Hide Background Dots Option */}
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={options.imageOptions?.hideBackgroundDots}
                onChange={(e) => setOptions({
                  ...options,
                  imageOptions: {
                    ...options.imageOptions,
                    hideBackgroundDots: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#ffffff] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#ffffff] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Hide Background Dots
              </span>
            </label>
          </div>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please upload a logo to adjust these options.
        </p>
      )}
    </div>
  );
};

export default LogoOptions; 