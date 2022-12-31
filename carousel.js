const navigationButtons = document.querySelectorAll("[data-carousel-button]");
const radioButtons = document.querySelectorAll("[data-radio-button]");
const timeButtons = document.querySelectorAll("[data-time-button]");

const slides = document.querySelector("[data-slides]");
const radios = document.querySelector("[data-radio]");
const times = document.querySelector("[data-time]");
var time = 3;

navigationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) {
      newIndex = slides.children.length - 1;
      const activeTime = times.querySelector("[data-active]");
      let newTimeIndex = [...times.children].indexOf(activeTime) - 1;
      if (newTimeIndex < 0) newTimeIndex = times.children.length - 1;
      document.getElementById(`time${newTimeIndex}`).click();
    } else if (newIndex >= slides.children.length) {
      newIndex = 0;
      const activeTime = times.querySelector("[data-active]");
      let newTimeIndex = [...times.children].indexOf(activeTime) + 1;
      if (newTimeIndex >= times.children.length) newTimeIndex = 0;
      document.getElementById(`time${newTimeIndex}`).click();
    }
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    document.getElementById(`radio${newIndex}`).click();
  });
});

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeSlide = slides.querySelector("[data-active]");
    let formerIndex = [...slides.children].indexOf(activeSlide);
    let newIndex = button.getAttribute("index");

    if (formerIndex != newIndex) {
      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    }
  });
});

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeTime = times.querySelector("[data-active]");
    const newIndex = button
      .getAttribute("id")
      .substring(
        button.getAttribute("id").length - 1,
        button.getAttribute("id").length
      );
    const formerIndex = [...times.children].indexOf(activeTime);

    if (formerIndex != newIndex) {
      times.children[newIndex].dataset.active = true;
      delete activeTime.dataset.active;
      time = times.querySelector("[data-active]").innerHTML.replace("s", "");
    }
  });
});

function automate() {
  document.getElementById("right").click();
  setTimeout(automate, time * 1000);
}

automate();
