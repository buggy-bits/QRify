import { useState, useEffect } from 'react';

const InputSelector = ({ value, onChange }) => {
  const [inputType, setInputType] = useState('url');
  const [inputValue, setInputValue] = useState('');
  
  // Input type options
  const inputTypes = [
    { id: 'url', label: 'URL', placeholder: 'https://example.com' },
    { id: 'text', label: 'Text', placeholder: 'Enter your text here' },
    { id: 'phone', label: 'Phone', placeholder: '+1234567890' },
    { id: 'json', label: 'JSON', placeholder: '{"name": "value"}' }
  ];
  
  // Format the input data based on the selected type
  const formatData = (data) => {
    switch (inputType) {
      case 'url':
        return data;
      case 'text':
        return data;
      case 'phone':
        // Only add 'tel:' once at the beginning
        return data.startsWith('tel:') ? data : `tel:${data}`;
      case 'json':
        try {
          // Validate JSON
          JSON.parse(data);
          return data;
        } catch (e) {
          // If invalid JSON, return the data anyway
          return data;
        }
      default:
        return data;
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // For phone numbers, handle special formatting
    if (inputType === 'phone') {
      // Strip any existing 'tel:' prefix first
      const phoneNumber = e.target.value.replace(/^tel:/, '');
      const formattedData = `tel:${phoneNumber}`;
      onChange(formattedData);
    } else {
      // For other types, just format and pass the data
      const formattedData = formatData(e.target.value);
      onChange(formattedData);
    }
  };
  
  // Handle input type change
  const handleTypeChange = (newType) => {
    setInputType(newType);
    
    // Update the formatted data when type changes
    if (newType === 'phone' && inputValue && !inputValue.startsWith('tel:')) {
      onChange(`tel:${inputValue}`);
    } else {
      // For other types, just reformat the current input value
      onChange(formatData(inputValue));
    }
  };

  // Initialize inputValue from the passed value
  useEffect(() => {
    if (inputType === 'phone' && value) {
      setInputValue(value.replace(/^tel:/, ''));
    } else {
      setInputValue(value || '');
    }
  }, [value, inputType]);
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">QR Code Content</h3>
      
      <div className="mb-4">
        <label className="label">Content Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {inputTypes.map(type => (
            <div key={type.id} className="flex items-center">
              <input
                type="radio"
                id={`type-${type.id}`}
                name="contentType"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                checked={inputType === type.id}
                onChange={() => handleTypeChange(type.id)}
              />
              <label
                htmlFor={`type-${type.id}`}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="qr-content" className="label">Content</label>
        {inputType === 'json' ? (
          <textarea
            id="qr-content"
            rows="5"
            className="input font-mono text-sm"
            placeholder={inputTypes.find(t => t.id === inputType)?.placeholder}
            value={inputType === 'phone' ? inputValue.replace(/^tel:/, '') : inputValue}
            onChange={handleInputChange}
          ></textarea>
        ) : (
          <input
            id="qr-content"
            type={inputType === 'url' ? 'url' : inputType === 'phone' ? 'tel' : 'text'}
            className="input"
            placeholder={inputTypes.find(t => t.id === inputType)?.placeholder}
            value={inputType === 'phone' ? inputValue.replace(/^tel:/, '') : inputValue}
            onChange={handleInputChange}
          />
        )}
      </div>
    </div>
  );
};

export default InputSelector; 