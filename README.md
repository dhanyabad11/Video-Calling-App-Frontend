# VideoConnect - Modern Video Chat Application

A sleek, modern video conferencing application built with React, TypeScript, and WebRTC. Experience seamless video calls with a professional Google Meet-style interface.

![VideoConnect App](./screenshots/Screenshot.png)

## ✨ Features

-   🎥 **HD Video Calls** - Crystal clear video and audio quality
-   🔐 **Secure Connection** - End-to-end encrypted communication
-   🌐 **Real-time Communication** - Powered by Socket.IO and WebRTC
-   📱 **Responsive Design** - Works perfectly on desktop and mobile
-   🎨 **Modern UI** - Clean, professional Google Meet-inspired interface
-   ⚡ **Lightning Fast** - Built with Vite for optimal performance
-   👥 **Multi-participant** - Support for multiple users in a single room

## 🖼️ Screenshot

![VideoConnect Interface](./screenshots/app-preview.png)
_Modern video conferencing interface with clean design and professional features_

## 🚀 Quick Start

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn package manager
-   A camera and microphone for video calls

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/dhanyabad11/Video-Calling-App-Frontend.git
    cd Video-Calling-App-Frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser**
    ```
    http://localhost:5173
    ```

## 🏗️ Built With

-   **Frontend Framework**: React 18 with TypeScript
-   **Build Tool**: Vite for lightning-fast development
-   **Styling**: Tailwind CSS + DaisyUI for modern components
-   **Real-time Communication**: Socket.IO client
-   **Video/Audio**: WebRTC with PeerJS
-   **Routing**: React Router Dom
-   **Icons**: Heroicons for beautiful SVG icons

## 📁 Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── CreateRoom.tsx   # Meeting creation component
│   └── UserFeedPlayer.tsx # Video player component
├── Context/            # React context providers
│   └── SocketContext.tsx # Socket.IO context
├── Pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   └── Room.tsx        # Video call room
├── assets/             # Static assets
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎯 Usage

### Starting a New Meeting

1. Visit the home page
2. Click **"New meeting"** button
3. Share the room URL with participants
4. Enjoy your video call!

### Joining an Existing Meeting

1. Enter the meeting code in the input field
2. Click **"Join"**
3. Allow camera and microphone permissions
4. Start collaborating!

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SERVER_URL=http://localhost:5500
VITE_APP_NAME=VideoConnect
```

### WebRTC Configuration

The application uses PeerJS for WebRTC connections. You can configure STUN/TURN servers in the socket context:

```typescript
const peer = new Peer(undefined, {
    host: "your-peerjs-server.com",
    port: 9000,
    path: "/peerjs",
});
```

## 🎨 Customization

### Themes

The app uses Tailwind CSS with DaisyUI. You can customize themes in `tailwind.config.js`:

```javascript
daisyui: {
    themes: ["light", "dark", "synthwave", "cyberpunk"];
}
```

### Colors

Update the color palette by modifying Tailwind classes:

-   Primary: `blue-600`
-   Secondary: `slate-600`
-   Success: `emerald-500`
-   Error: `red-500`

## 📱 Browser Support

-   ✅ Chrome 60+
-   ✅ Firefox 60+
-   ✅ Safari 12+
-   ✅ Edge 79+

_Note: WebRTC requires HTTPS in production_

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Vercel

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhanyabad** - [GitHub Profile](https://github.com/dhanyabad11)

## 🙏 Acknowledgments

-   Socket.IO team for real-time communication
-   PeerJS for simplified WebRTC implementation
-   Tailwind CSS for the utility-first CSS framework
-   DaisyUI for beautiful component library
-   React team for the amazing framework

---

⭐ **Star this repository if you found it helpful!**

For questions or support, please open an issue on GitHub.
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
