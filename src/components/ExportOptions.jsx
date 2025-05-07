import { useState } from 'react';

const ExportOptions = ({ handleDownload }) => {
  const [fileType, setFileType] = useState('png');
  const [customSize, setCustomSize] = useState(1000);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [isCustomSize, setIsCustomSize] = useState(false);
  
  // File type options
  const fileTypes = [
    { id: 'png', label: 'PNG' },
    { id: 'jpeg', label: 'JPEG' },
    { id: 'svg', label: 'SVG' }
  ];
  
  // Size presets
  const sizePresets = [
    { id: 'small', label: 'Small', size: 300 },
    { id: 'medium', label: 'Medium', size: 500 },
    { id: 'large', label: 'Large', size: 800 },
    { id: 'xlarge', label: 'Extra Large', size: 1200 }
  ];
  
  // Handle custom size change
  const handleCustomSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 2000) {
      setCustomSize(value);
    }
  };
  
  // Handle size selection change
  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
    setIsCustomSize(sizeId === 'custom');
  };
  
  // Handle download button click
  const handleDownloadClick = () => {
    const size = isCustomSize 
      ? customSize 
      : sizePresets.find(preset => preset.id === selectedSize)?.size;
    handleDownload(fileType.toUpperCase(), size);
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Export Options</h3>
      
      {/* File Type Selection */}
      <div className="mb-4">
        <label className="label">File Format</label>
        <div className="flex gap-4 mt-2">
          {fileTypes.map(type => (
            <div key={type.id} className="flex items-center">
              <input
                type="radio"
                id={`filetype-${type.id}`}
                name="fileType"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                checked={fileType === type.id}
                onChange={() => setFileType(type.id)}
              />
              <label
                htmlFor={`filetype-${type.id}`}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Size Selection */}
      <div className="mb-6">
        <label className="label mb-2">QR Code Size</label>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          {sizePresets.map(preset => (
            <div key={preset.id} className="flex items-center">
              <input
                type="radio"
                id={`size-${preset.id}`}
                name="qrSize"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                checked={!isCustomSize && selectedSize === preset.id}
                onChange={() => handleSizeChange(preset.id)}
              />
              <label
                htmlFor={`size-${preset.id}`}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {preset.label} ({preset.size}px)
              </label>
            </div>
          ))}
          
          <div className="flex items-center">
            <input
              type="radio"
              id="size-custom"
              name="qrSize"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              checked={isCustomSize}
              onChange={() => handleSizeChange('custom')}
            />
            <label
              htmlFor="size-custom"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Custom
            </label>
          </div>
        </div>
        
        {isCustomSize && (
          <div className="mb-4 ml-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="100"
                max="2000"
                value={customSize}
                onChange={handleCustomSizeChange}
                className="input w-24"
              />
              <span className="text-gray-600 dark:text-gray-400">px</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter a size between 100px and 2000px
            </p>
          </div>
        )}
      </div>
      
      {/* Download Button */}
      <button
        className="btn btn-primary w-full"
        onClick={handleDownloadClick}
      >
        Download QR Code
      </button>
    </div>
  );
};

export default ExportOptions; 