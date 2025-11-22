document.addEventListener("DOMContentLoaded", function () {
  // ---------- GEAR FORM ----------
  const gearForm = document.getElementById("gear-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const gearSelect = document.getElementById("gear");
  const messageInput = document.getElementById("message");

  function showError(el, msg) {
    const err = document.getElementById(el.id + "-error");
    if (err) err.textContent = msg;
    el.setAttribute("aria-invalid", "true");
  }
  function clearError(el) {
    const err = document.getElementById(el.id + "-error");
    if (err) err.textContent = "";      
    el.removeAttribute("aria-invalid");
  }

  [nameInput, emailInput, gearSelect, messageInput].forEach(i => {
    i.addEventListener("input", () => clearError(i));
    i.addEventListener("change", () => clearError(i));
  });

  gearForm.addEventListener("submit", function (e) {
    e.preventDefault();
    [nameInput, emailInput, gearSelect, messageInput].forEach(i => clearError(i));

    let hasError = false;
    const emailVal = (emailInput.value || "").trim();
    const gearVal = (gearSelect.value || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailVal) {
      showError(emailInput, "Email is required.");
      hasError = true;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, "Please enter a valid email.");
      hasError = true;
    }

    if (!gearVal) {
      showError(gearSelect, "Please select a gear suggestion.");
      hasError = true;
    }

    if (hasError) return;

    const record = {
      name: nameInput.value.trim(),
      email: emailVal,
      gear: gearVal,
      message: messageInput.value.trim(),
      ts: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem("gear_suggestions") || "[]");
    existing.push(record);
    localStorage.setItem("gear_suggestions", JSON.stringify(existing));
    alert("Thanks — your gear suggestion has been saved!");
    gearForm.reset();
  });

  // ---------- RUNNING TIPS FORM ----------
  const tipsForm = document.getElementById("tips-form");
  const tipName = document.getElementById("tip-name");
  const tipEmail = document.getElementById("tip-email");
  const tipMessage = document.getElementById("tip-message");

  [tipName, tipEmail, tipMessage].forEach(i => {
    i.addEventListener("input", () => {
      const err = document.getElementById(i.id + "-error");
      if (err) err.textContent = "";
    });
  });

  tipsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    [tipName, tipEmail, tipMessage].forEach(i => {
      const err = document.getElementById(i.id + "-error");
      if (err) err.textContent = "";
    });

    let hasError = false;
    const emailVal = (tipEmail.value || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailVal) {
      const err = document.getElementById("tip-email-error");
      err.textContent = "Email is required.";
      hasError = true;
    } else if (!emailRegex.test(emailVal)) {
      const err = document.getElementById("tip-email-error");
      err.textContent = "Please enter a valid email.";
      hasError = true;
    }

    if (hasError) return;

    const tipRecord = {
      name: tipName.value.trim(),
      email: emailVal,
      tip: tipMessage.value.trim(),
      ts: Date.now(),
    };
    const existingTips = JSON.parse(localStorage.getItem("running_tips") || "[]");
    existingTips.push(tipRecord);
    localStorage.setItem("running_tips", JSON.stringify(existingTips));
    alert("Thanks — your running tip has been saved!");
    tipsForm.reset();
  });
});