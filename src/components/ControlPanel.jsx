import { useState } from 'react';
import InputSelector from './InputSelector';
import LogoUploader from './LogoUploader';
import StyleSettings from './StyleSettings';
import LogoOptions from './LogoOptions';
import ExportOptions from './ExportOptions';

const ControlPanel = ({ qrOptions, setQrOptions, handleDownload }) => {
  const [activeTab, setActiveTab] = useState('content');
  
  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'style', label: 'Style' },
    { id: 'logo', label: 'Logo' },
    { id: 'export', label: 'Export' }
  ];

  return (
    <div className="card">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab.id 
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="p-4">
        {activeTab === 'content' && (
          <InputSelector 
            value={qrOptions.data} 
            onChange={value => setQrOptions({...qrOptions, data: value})} 
          />
        )}
        
        {activeTab === 'style' && (
          <StyleSettings 
            options={qrOptions} 
            setOptions={setQrOptions} 
          />
        )}
        
        {activeTab === 'logo' && (
          <>
            <LogoUploader 
              currentLogo={qrOptions.image}
              onLogoChange={image => setQrOptions({...qrOptions, image})}
            />
            <LogoOptions 
              options={qrOptions} 
              setOptions={setQrOptions} 
            />
          </>
        )}
        
        {activeTab === 'export' && (
          <ExportOptions handleDownload={handleDownload} />
        )}
      </div>
    </div>
  );
};

export default ControlPanel; 