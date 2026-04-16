function displayConditionalInput() {
  var confirmation = document.getElementById("confirmation").value;
  var hiddenField = document.getElementById("hidden-input");

  if (confirmation === "yes") {
    hiddenField.classList.remove("hidden");
    hiddenField.classList.add("form-group");
  } else {
    hiddenField.classList.add("hidden");
  }
}
