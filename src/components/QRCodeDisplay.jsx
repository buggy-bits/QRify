import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const QRCodeDisplay = forwardRef(({ options }, ref) => {
  const [qrCode, setQrCode] = useState(null);
  const qrContainerRef = useRef(null);
  const margin = options.margin || 0;
  const bgColor = options.backgroundOptions?.color || '#ffffff';

  // Expose the QR code instance to parent components
  useImperativeHandle(ref, () => ({
    download: async (options) => {
      if (!qrCode) throw new Error('QR code not initialized');
      return await qrCode.download(options);
    }
  }));

  useEffect(() => {
    // Dynamic import for qr-code-styling
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      if (qrCode) {
        // Update existing QR code with new options
        qrCode.update(options);
      } else {
        // Create new QR code
        const newQRCode = new QRCodeStyling(options);
        setQrCode(newQRCode);

        // Render to container
        if (qrContainerRef.current) {
          newQRCode.append(qrContainerRef.current);
        }
      }
    }).catch(error => {
      console.error('Error loading QR Code Styling library:', error);
    });
  }, [qrCode, options]);

  // Handle updates by re-rendering when options change
  useEffect(() => {
    if (qrCode) {
      qrCode.update(options);
    }
  }, [qrCode, options]);

  return (
    <div className="card flex flex-col items-center p-8 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6">QR Code Preview</h2>
      <div 
        className="shadow-lg rounded-lg overflow-hidden dark:bg-gray-800"
        style={{ 
          padding: `${margin}px`,
          backgroundColor: bgColor
        }}
      >
        <div ref={qrContainerRef} className="shadow-sm"></div>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Scan to test
      </p>
    </div>
  );
});

export default QRCodeDisplay; 