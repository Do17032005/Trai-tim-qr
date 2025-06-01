// Tạo mã QR
const qrContent = "https://youtu.be/yourvideo"; // Nội dung QR code (URL hoặc text)
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

const messages = ["Anh yêu em", "Cám ơn em", "Anh sẽ luôn bên em", "❤️"
, "Em là tất cả với anh", "Mãi mãi bên nhau", "Yêu em nhiều lắm", "Em là ánh sáng của đời anh", "Chúc em một ngày tốt lành", "Anh nhớ em"
, "Em là niềm vui của anh", "Tình yêu của anh dành cho em", "Em làm anh hạnh phúc", "Anh sẽ luôn yêu em", "Em là lý do anh cười mỗi ngày"
, "Em là món quà quý giá nhất", "Anh sẽ không bao giờ rời xa em", "Em là người anh yêu nhất", "Cùng nhau vượt qua mọi thử thách", "Em là lý do anh sống mỗi ngày"
, "Tình yêu của chúng ta sẽ mãi bền vững", "Em là người bạn đồng hành tuyệt vời nhất", "Anh sẽ luôn ủng hộ em", "Em là nguồn cảm hứng của anh", "Chúng ta sẽ cùng nhau xây dựng tương lai"
];
const floatingTexts = [];

function createText() {
  const text = messages[Math.floor(Math.random() * messages.length)];
  const x = Math.random() * canvas.width;
  const y = canvas.height + Math.random() * 100;
  const speed = 0.5 + Math.random();
  const fontSize = 20 + Math.random() * 20;
  const opacity = 0.3 + Math.random() * 0.7;
  const color = `rgba(255, ${Math.floor(Math.random() * 200)}, 255, ${opacity})`;

  floatingTexts.push({ text, x, y, speed, fontSize, color });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  floatingTexts.forEach((txt, i) => {
    ctx.font = `${txt.fontSize}px Arial`;
    ctx.fillStyle = txt.color;
    ctx.shadowColor = txt.color;
    ctx.shadowBlur = 10;
    ctx.fillText(txt.text, txt.x, txt.y);
    txt.y -= txt.speed;

    if (txt.y < -50) floatingTexts.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

setInterval(createText, 500);
animate();
