const changeBackgroundBtn = document.getElementById("change-background-btn");

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomGradient = () => {
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
  return gradient;
};

changeBackgroundBtn.addEventListener("click", () => {
  const randomGradient = generateRandomGradient();

  document.body.style.background = randomGradient;
});
