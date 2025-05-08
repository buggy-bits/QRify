import { useState, useRef } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import QRCodeDisplay from './components/QRCodeDisplay';
import { saveAs } from 'file-saver';

function App() {
  const qrRef = useRef(null);
  const [qrOptions, setQrOptions] = useState({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'https://github.com/buggy-bits/qrify',
    image: '',
    margin: 10,
    dotsOptions: {
      color: '#000000',
      type: 'square'
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'square',
    },
    cornersDotOptions: {
      color: '#000000',
      type: 'square',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      hideBackgroundDots: true,
      imageSize: 0.3,
    },
  });

  const handleDownload = async (fileType, size) => {
    if (!qrRef.current) {
      console.error('QR code reference not available');
      return;
    }

    let fileExt = fileType.toLowerCase();
    
    try {
      const url = await qrRef.current.download({
        extension: fileExt,
        width: size,
        height: size,
      });
      
      saveAs(url, `qrcode.${fileExt}`);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">QRify</h1>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Always keep Control Panel on left for desktop (3/5 width) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <ControlPanel 
                qrOptions={qrOptions} 
                setQrOptions={setQrOptions} 
                handleDownload={handleDownload}
              />
            </div>
            
            {/* Always keep QR Code Preview on right for desktop (2/5 width) */}
            <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:sticky lg:top-24 lg:self-start">
              <QRCodeDisplay ref={qrRef} options={qrOptions} />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} QRify - Create Free QR Codes
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Built with React, Tailwind CSS, and qr-code-styling
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
