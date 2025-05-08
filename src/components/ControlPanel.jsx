import { useState } from 'react';
import InputSelector from './InputSelector';
import LogoUploader from './LogoUploader';
import StyleSettings from './StyleSettings';
import LogoOptions from './LogoOptions';
import ExportOptions from './ExportOptions';

const ControlPanel = ({ qrOptions, setQrOptions, handleDownload, darkMode }) => {
  const [activeTab, setActiveTab] = useState('content');
  
  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'style', label: 'Style' },
    { id: 'logo', label: 'Logo' },
    { id: 'export', label: 'Export' }
  ];

  return (
    <div className="card overflow-hidden">
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${
              activeTab === tab.id 
                ? 'tab-active' 
                : 'tab-inactive'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <div className="p-1">
        {activeTab === 'content' && (
          <div className="animate-fadeIn">
            <InputSelector 
              value={qrOptions.data} 
              onChange={value => setQrOptions({...qrOptions, data: value})} 
            />
          </div>
        )}
        
        {activeTab === 'style' && (
          <div className="animate-fadeIn">
            <StyleSettings 
              options={qrOptions} 
              setOptions={setQrOptions} 
            />
          </div>
        )}
        
        {activeTab === 'logo' && (
          <div className="animate-fadeIn">
            <LogoUploader 
              currentLogo={qrOptions.image}
              onLogoChange={image => setQrOptions({...qrOptions, image})}
            />
            <div className="mt-6">
              <LogoOptions 
                options={qrOptions} 
                setOptions={setQrOptions} 
              />
            </div>
          </div>
        )}
        
        {activeTab === 'export' && (
          <div className="animate-fadeIn">
            <ExportOptions handleDownload={handleDownload} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel; 