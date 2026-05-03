const form = document.getElementById("my-form");
const confirmation = document.getElementById("confirmation");
const hiddenField = document.getElementById("hidden-input");
const container = document.getElementById("payslip");
const lumpsumText = document.getElementById("lumpsum");

function displayConditionalInput() {
  if (confirmation.value === "yes") {
    hiddenField.classList.remove("hidden");
    hiddenField.classList.add("form-group");
  } else {
    lumpsumText.value = "";
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
    container.innerHTML += "";
  });
});
