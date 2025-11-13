const products = [
  {
    title: "Auriculares Bluetooth X200",
    description: "Auriculares inalámbricos con cancelación pasiva y micrófono HD.",
    code: "AUD-X200-BT",
    price: 39999,
    status: true,
    stock: 120,
    category: "audio",
    thumbnails: ["/img/products/x200/front.jpg", "/img/products/x200/box.jpg"]
  },
  {
    title: "Teclado Mecánico RGB K87",
    description: "Teclado TKL con switches rojos y retroiluminación RGB.",
    code: "KB-K87-RGB",
    price: 54999,
    status: true,
    stock: 60,
    category: "gaming",
    thumbnails: ["/img/products/k87/top.jpg", "/img/products/k87/detail.jpg"]
  },
  {
    title: "Mouse Inalámbrico Pro M55",
    description: "Mouse ergonómico 2.4GHz + Bluetooth con 6 botones programables.",
    code: "MSE-M55-WL",
    price: 21999,
    status: true,
    stock: 85,
    category: "perifericos",
    thumbnails: ["/img/products/m55/angle.jpg"]
  },
  {
    title: "Monitor 27'' QHD 144Hz",
    description: "Panel IPS 2560x1440, 1ms MPRT, compatible FreeSync.",
    code: "MN-27Q-144",
    price: 329999,
    status: true,
    stock: 25,
    category: "monitores",
    thumbnails: ["/img/products/27q144/front.jpg", "/img/products/27q144/ports.jpg"]
  },
  {
    title: "SSD NVMe 1TB Gen4",
    description: "Lectura 5000 MB/s, escritura 4500 MB/s, formato M.2 2280.",
    code: "SSD-NV1T-G4",
    price: 159999,
    status: true,
    stock: 70,
    category: "almacenamiento",
    thumbnails: ["/img/products/ssd1tb/front.jpg"]
  },
  {
    title: "Silla Gamer GT Force",
    description: "Estructura metálica, apoyabrazos 3D, reclinable 160°.",
    code: "CHA-GTF-01",
    price: 289999,
    status: true,
    stock: 18,
    category: "sillas",
    thumbnails: ["/img/products/gtforce/main.jpg", "/img/products/gtforce/side.jpg"]
  },
  {
    title: "Parlante Bluetooth 30W",
    description: "Resistencia IPX7, 12h de batería, TWS.",
    code: "SPK-30W-IPX7",
    price: 64999,
    status: true,
    stock: 90,
    category: "audio",
    thumbnails: ["/img/products/spk30w/front.jpg"]
  },
  {
    title: "Webcam 1080p Autofocus",
    description: "Full HD 60fps, cancelación de ruido, tapa de privacidad.",
    code: "CAM-1080-AF",
    price: 37999,
    status: true,
    stock: 55,
    category: "accesorios",
    thumbnails: ["/img/products/cam1080/front.jpg", "/img/products/cam1080/mount.jpg"]
  },
  {
    title: "Cargador GaN 65W",
    description: "USB-C PD + USB-A, carga rápida para notebook y móvil.",
    code: "CHG-GaN65",
    price: 28999,
    status: true,
    stock: 140,
    category: "energia",
    thumbnails: ["/img/products/gan65/box.jpg"]
  },
  {
    title: "Router WiFi 6 AX1800",
    description: "Dual-band, OFDMA, MU-MIMO, 4 antenas de alta ganancia.",
    code: "RTR-AX1800",
    price: 119999,
    status: true,
    stock: 35,
    category: "redes",
    thumbnails: ["/img/products/ax1800/front.jpg", "/img/products/ax1800/back.jpg"]
  }
];

module.exports = products;