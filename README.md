# QRify

QRify is a modern, customizable QR code generator built with React and TailwindCSS. It allows you to create beautiful QR codes with custom styling, embedded logos, and various export options.


[![Vercel](https://img.shields.io/badge/Live-Demo-blue?logo=vercel)](https://your-app.vercel.app)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)  
[![GitHub stars](https://img.shields.io/github/stars/yourusername/vibecode-qr?style=social)](https://github.com/yourusername/vibecode-qr)


## ✨ Key Features

- **Multiple Input Modes**: URL, Plain Text, JSON payload, or Phone Number  
- **Logo Centering**: Upload PNG/SVG logos, control size & quiet-zone spacing  
- **Rich Styling**  
  - Dot shapes: squares, dots, rounded, class-y, extra-rounded  
  - Corner/finder patterns: square, dot, extra-rounded  
  - Foreground & background colors or linear/radial gradients  
- **Export Options**  
  - Formats: SVG, PNG, JPEG  
  - Preset sizes (200×200, 400×400, 600×600) or custom dimensions  
  - Custom filename on download  
- **Live Preview**: Instant updates as you tweak settings  
- **Responsive Layout**: Desktop two-column & mobile stacked design  
- **Dark Mode** (optional toggle)  

---

## 🚀 Tech Stack

- **Framework**: React (Vite)  
- **QR Engine**: [qr-code-styling](https://www.npmjs.com/package/qr-code-styling)  
- **Styling**: Tailwind CSS  
- **File Download**: [file-saver](https://github.com/eligrey/FileSaver.js/)  


---
## 🤝 Contributing
1. Fork this repo 

2. Create your feature branch 
      ```bash
      git checkout -b feature/my-cool-feature
      ```
 
3. Commit your changes 
    ```bash
    git commit -m 'Add some feature'
    ```

4. Push to the branch 
    ```bash
    git push origin feature/my-cool-feature
    ```

5. Open a Pull Request
   

---

## 🔧 Installation & Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
 

1. Clone the repository:

    ```bash
    git clone https://github.com/<yourusername>/qrify.git
    cd qrify
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:5173`


## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- [file-saver](https://github.com/eligrey/FileSaver.js/)


## License

This project is licensed under the MIT License - see the LICENSE file for details.