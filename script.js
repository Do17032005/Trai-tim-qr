// Tạo mã QR với link GitHub Pages
const qrContent = "https://do17032005.github.io/Trai-tim-qr"; // Link GitHub Pages
QRCode.toCanvas(document.getElementById("qrcode"), qrContent, {
  width: 200, // Kích thước QR code
  color: {
    dark: '#000000', // Màu QR code
    light: '#ffffff' // Màu nền
  }
}, function (error) {
  if (error) console.error(error);
  console.log('QR code generated!');
});

// Hiệu ứng text bay
const canvas = document.getElementById('floating-text');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const messages = [
  "Anh yêu em 🌸🌼", "Cám ơn em 🌷🌹", "Anh sẽ luôn bên em 💖❤️",
  "Em là tất cả với anh 🌹🌻", "🌸🌼🌷🌹🌻🌺", "Mãi mãi bên nhau 🌷💕",
  "Yêu em nhiều lắm 💕💖", "Em là ánh sáng của đời anh 🌟✨", 
  "Chúc em một ngày tốt lành 🌻🌺", "Anh nhớ em 🌸🌼",
  "Em là niềm vui của anh 🐻🐥",
  "Em làm anh hạnh phúc 🐥🐾", "🌸🌼🌷🌹🌻🌺", 
  "Anh sẽ luôn yêu em 🐾❤️",
  "Em là món quà quý giá nhất 🎁💐",
  "Em là lý do anh sống mỗi ngày 🌸🌟", 
  "Anh sẽ luôn ủng hộ em 🐱🐶", "Chúng ta sẽ cùng nhau xây dựng tương lai 🌷🌈",
  "💐🌸🌼🌷🌹🌻🌺", "✨🌟💖💕💞❤️", "🐻🐥🐰🦋🐾"
];
const floatingTexts = [];

function createText() {
  const text = messages[Math.floor(Math.random() * messages.length)];
  const x = Math.random() * canvas.width;
  const y = canvas.height + Math.random() * 50; // Giảm khoảng cách xuất phát
  const speed = 1.5 + Math.random() * 1; // Giảm tốc độ để chữ gần nhau hơn
  const fontSize = 20 + Math.random() * 20;
  const opacity = 0.5 + Math.random() * 0.5;
  const color = `rgba(255, ${Math.floor(Math.random() * 200)}, 255, ${opacity})`;

  // Giới hạn số lượng chữ bay
  if (floatingTexts.length > 50) {
    floatingTexts.shift(); // Xóa phần tử cũ nhất
  }

  floatingTexts.push({ text, x, y, speed, fontSize, color });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  floatingTexts.forEach((txt, i) => {
    ctx.save();
    ctx.font = `${txt.fontSize}px Arial`;
    ctx.fillStyle = txt.color;

    // Hiệu ứng phát sáng
    ctx.shadowColor = txt.color; // Màu phát sáng giống màu chữ
    ctx.shadowBlur = 30; // Giảm độ mờ để cải thiện hiệu suất
    ctx.shadowOffsetX = 0; // Không dịch chuyển bóng theo trục X
    ctx.shadowOffsetY = 0; // Không dịch chuyển bóng theo trục Y

    // Vẽ chữ phát sáng
    ctx.fillText(txt.text, txt.x, txt.y);

    ctx.restore();

    txt.y -= txt.speed;

    if (txt.y < -50) floatingTexts.splice(i, 1); // Xóa chữ khi ra khỏi màn hình
  });

  requestAnimationFrame(animate);
}

setInterval(createText, 1000); // Tạo chữ mỗi 500ms
animate();

let scene, camera, renderer, controls, texts = [];

function init3D() {
  // Tạo scene
  scene = new THREE.Scene();

  // Tạo camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  // Tạo renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Thêm điều khiển xoay, thu phóng
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;

  // Tạo chữ 3D
  create3DText();

  // Bắt đầu render
  animate3D();
}

function create3DText() {
  const loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const messages = [
      "Anh yêu em 🌸", "Cám ơn em 🌼", "Anh sẽ luôn bên em 💖", "❤️",
      "Em là tất cả với anh 🌹", "Mãi mãi bên nhau 🌷", "Yêu em nhiều lắm 💕",
      "Em là ánh sáng của đời anh 🌟", "Chúc em một ngày tốt lành 🌻", "Anh nhớ em 🌺"
    ];

    for (let i = 0; i < 20; i++) {
      const textGeometry = new THREE.TextGeometry(messages[Math.floor(Math.random() * messages.length)], {
        font: font,
        size: 2,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 5
      });

      const textMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 75%)`),
        emissive: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
        emissiveIntensity: 0.5
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Đặt vị trí ngẫu nhiên trong không gian 3D
      textMesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      // Thêm chuyển động
      textMesh.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      };

      texts.push(textMesh);
      scene.add(textMesh);
    }
  });

  // Thêm ánh sáng
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Ánh sáng môi trường
  scene.add(ambientLight);
}

function animate3D() {
  requestAnimationFrame(animate3D);

  // Cập nhật vị trí chữ
  texts.forEach((text, index) => {
    text.position.add(text.userData.velocity);

    // Nếu chữ ra khỏi không gian, đưa nó về vị trí ngẫu nhiên
    if (text.position.length() > 50) {
      text.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }
  });

  // Giới hạn số lượng chữ trong không gian
  if (texts.length > 30) { // Giới hạn tối đa 30 chữ
    const textToRemove = texts.shift(); // Xóa chữ cũ nhất
    scene.remove(textToRemove); // Xóa khỏi scene
  }

  controls.update();
  renderer.render(scene, camera);
}

// Đảm bảo canvas tự động thay đổi kích thước khi thay đổi màn hình
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Khởi chạy
init3D();
