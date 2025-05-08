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
    <div className="card flex flex-col items-center p-6 w-full max-w-md mx-auto h-fit">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">QR Code Preview</h2>
      <div 
        className="p-4 rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
        style={{ 
          padding: `${margin}px`,
          backgroundColor: bgColor,
          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <div ref={qrContainerRef}></div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Scan to test your QR code
        </p>
        <p className="text-xs text-gray-500">
          Live preview updates as you make changes
        </p>
      </div>
    </div>
  );
});

QRCodeDisplay.displayName = 'QRCodeDisplay';

export default QRCodeDisplay; 