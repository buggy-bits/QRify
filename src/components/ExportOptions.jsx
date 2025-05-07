import { useState } from 'react';

const ExportOptions = ({ handleDownload }) => {
  const [fileType, setFileType] = useState('png');
  const [customSize, setCustomSize] = useState(1000);
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
  
  // Handle download button click
  const handleDownloadClick = () => {
    const size = isCustomSize ? customSize : sizePresets.find(preset => preset.id === 'medium')?.size;
    handleDownload(fileType.toUpperCase(), size);
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Export Options</h3>
      
      {/* File Type Selection */}
      <div className="mb-4">
        <label className="label">File Format</label>
        <div className="flex gap-2">
          {fileTypes.map(type => (
            <button
              key={type.id}
              className={`px-3 py-1 rounded-md ${
                fileType === type.id
                  ? 'bg-primary-500 text-white dark:bg-primary-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFileType(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Size Selection */}
      <div className="mb-6">
        <label className="label mb-2">QR Code Size</label>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {sizePresets.map(preset => (
            <button
              key={preset.id}
              className={`px-3 py-1 rounded-md ${
                !isCustomSize && preset.id === 'medium'
                  ? 'bg-primary-500 text-white dark:bg-primary-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => {
                setIsCustomSize(false);
                // The actual size is passed directly during download
              }}
            >
              {preset.label} ({preset.size}px)
            </button>
          ))}
          
          <button
            className={`px-3 py-1 rounded-md ${
              isCustomSize
                ? 'bg-primary-500 text-white dark:bg-primary-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setIsCustomSize(true)}
          >
            Custom
          </button>
        </div>
        
        {isCustomSize && (
          <div className="mb-4">
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