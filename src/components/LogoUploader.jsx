import { useState, useRef } from 'react';
import { convertToDataURL } from '../utils/fileUtils';

const LogoUploader = ({ currentLogo, onLogoChange }) => {
  const [previewSrc, setPreviewSrc] = useState(currentLogo || '');
  const fileInputRef = useRef(null);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const fileType = file.type;
    if (!fileType.match('image/png') && !fileType.match('image/svg+xml')) {
      alert('Please upload a PNG or SVG file');
      return;
    }
    
    try {
      // Convert file to data URL
      const dataUrl = await convertToDataURL(file);
      setPreviewSrc(dataUrl);
      onLogoChange(dataUrl);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing the file. Please try again.');
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const removeLogo = () => {
    setPreviewSrc('');
    onLogoChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Upload Logo</h3>
      
      <div className="flex items-center mb-4">
        <button 
          className="btn btn-primary mr-2"
          onClick={triggerFileInput}
        >
          Choose Logo
        </button>
        
        {previewSrc && (
          <button 
            className="btn btn-secondary"
            onClick={removeLogo}
          >
            Remove
          </button>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept=".png,.svg" 
          onChange={handleFileChange}
        />
      </div>
      
      {previewSrc && (
        <div className="mb-4">
          <p className="label mb-2">Preview</p>
          <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center bg-[#ffffff] dark:bg-gray-800">
            <img 
              src={previewSrc} 
              alt="Logo Preview" 
              className="max-h-24 max-w-full"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            For best results, use a PNG or SVG with transparency
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoUploader; 