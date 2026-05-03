const form = document.getElementById("my-form");
const confirmation = document.getElementById("confirmation");
const hiddenField = document.getElementById("hidden-input");
const calculate = document.getElementById("calulate");
const inlineText = document.getElementById("inlineText");

function displayConditionalInput() {
  if (confirmation.value === "yes") {
    hiddenField.classList.remove("hidden");
    hiddenField.classList.add("form-group");
  } else {
    hiddenField.classList.add("hidden");
    hiddenField.classList.remove("form-group");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  confirmation.addEventListener("change", displayConditionalInput);

  form.addEventListener("reset", () => {
    setTimeout(() => {
      displayConditionalInput();
    }, 0);
    inlineText.style.display = "none";
  });

  calculate.addEventListener("click", function () {
    inlineText.textContent = "This is the inline text message";
    inlineText.style.display = "inline";
  })
});
