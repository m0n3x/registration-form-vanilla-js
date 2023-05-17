const formInputs = document.querySelectorAll(".form-input input");
const lookingCatInputs = ["first-name", "last-name", "email", "date-of-birth"];

const catImage = document.getElementById("cat-image");

formInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (lookingCatInputs.includes(input.id)) {
      catImage.src = "./assets/lookingCat.png";
    }
  });
});

const resetCatImage = (event) => {
  if (event.target.id !== "toggle-password") {
    console.log("reset");
    catImage.src = "./assets/initialCat.png";
  }
};

const setCatAccordingToToggle = () => {
  const type = password.getAttribute("type");
  if (type === "text") {
    catImage.src = "./assets/peepingCat.png";
  } else {
    catImage.src = "./assets/eyesClosedCat.png";
  }
};

password.addEventListener("input", setCatAccordingToToggle);
passwordConfirmation.addEventListener("input", setCatAccordingToToggle);

document.addEventListener("passwordVisibilityToggled", function () {
  setCatAccordingToToggle();
});

document.addEventListener("click", resetCatImage);
