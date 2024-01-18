const main = document.querySelector("main");

export function popAlert(text, color) {
  const alertEl = document.createElement("span");
  alertEl.classList.add("alert");

  color
    ? (alertEl.style.backgroundColor = color)
    : (alertEl.style.backgroundColor = "");

  alertEl.textContent = text;
  main.prepend(alertEl);
  alertEl.classList.add("fade-out");
  setTimeout(() => alertEl.remove(), 2100);
}

export function spinner(on, target) {
  const spinner = document.getElementById("loading-bar");
  const particles = spinner.querySelectorAll(".load-anim");
  let delay = 0.2;

  if (on) {
    target ? (target.disabled = true) : null;
    target ? (target.nextElementSibling.disabled = true) : null;
    spinner.style.display = "block";

    particles.forEach((part) => {
      part.style.animationDelay = `${delay}s`;
      delay += delay;
    });
  } else {
    spinner.style.display = "";
    target ? (target.disabled = false) : null;
    target ? (target.nextElementSibling.disabled = false) : null;
  }
}



