import { useState } from 'react';

const InputSelector = ({ value, onChange }) => {
  const [inputType, setInputType] = useState('url');
  
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
        return `tel:${data}`;
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
  
  const handleChange = (e) => {
    const formattedData = formatData(e.target.value);
    onChange(formattedData);
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">QR Code Content</h3>
      
      <div className="mb-4">
        <label className="label">Content Type</label>
        <div className="flex flex-wrap gap-2">
          {inputTypes.map(type => (
            <button
              key={type.id}
              className={`px-3 py-1 text-sm rounded-md ${
                inputType === type.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={() => setInputType(type.id)}
            >
              {type.label}
            </button>
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
            value={value}
            onChange={handleChange}
          ></textarea>
        ) : (
          <input
            id="qr-content"
            type={inputType === 'url' ? 'url' : inputType === 'phone' ? 'tel' : 'text'}
            className="input"
            placeholder={inputTypes.find(t => t.id === inputType)?.placeholder}
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default InputSelector; 