# 🌌 Neon Tunnel

An immersive 3D tunnel experience built with Three.js, JavaScript, and WebGL. Explore an animated tunnel filled with colorful rings and particles.

## ✨ Features

- Torus Geometry for the tunnel rings
- Particle system surrounding the rings
- Fog for depth and atmosphere
- Object reuse technique for continuous animation
- Animated rainbow colors using HSL
- Particle animation
- HTML elements integrated into the scene
- Mouse interaction
- Speed boost while holding the left mouse button

## 📝 Description

I created this project using Three.js to build an animated neon tunnel.

I use a loop to create **20 torus rings**, with a gap between each ring. The rings move toward the camera. When a ring passes the camera, I reposition it at the end of the ring sequence. This creates a continuous tunnel effect while reusing the same objects instead of repeatedly creating new ones.

I also use the sine function to create a continuous wave-like bend in the rings. Fog helps blend the distant rings into the scene, making the tunnel feel deeper.

Around the rings, I created particles that move toward the camera and are repositioned after passing it, following a similar reuse technique.

For the rainbow colors, I use the **HSL color model** to animate the hues smoothly.

Finally, I implemented a speed boost: holding the **left mouse button** increases the speed of the rings, making the experience more dynamic.

## 🛠️ Tech Stack

![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=threedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🚀 Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/mohammad-anash/Neon_Tunnel.git
   ```

2. Navigate to the project folder and install dependencies:

   ```bash
   npm install
   ```

3. Start the development server using the script defined in `package.json`.

## 🎮 Live Demo

[**Click here to experience Neon Tunnel**](https://neon-tunnel.netlify.app)

## 👨‍💻 Author

[Anash](https://github.com/mohammad-anash)
