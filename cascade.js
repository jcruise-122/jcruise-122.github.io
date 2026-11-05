document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country-select");
  const levelSelect = document.getElementById("level-select");
  const subjectSelect = document.getElementById("subject-select");
  const paperResults = document.getElementById("paper-results");
  const statusBox = document.getElementById("selection-status");

  if (!countrySelect || !levelSelect || !subjectSelect || !paperResults || !statusBox) return;

  let allPapers = [];

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean))).sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  function resetSelect(select, label, values) {
    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = label;
    select.appendChild(defaultOption);

    values.forEach(function (value) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });

    select.disabled = values.length === 0;
  }

  function updateStatus(message) {
    statusBox.textContent = message;
  }

  function renderPapers() {
    const country = countrySelect.value;
    const level = levelSelect.value;
    const subject = subjectSelect.value;

    const matches = allPapers.filter(function (paper) {
      return paper.country === country && paper.level === level && paper.subject === subject;
    });

    paperResults.innerHTML = "";
    paperResults.hidden = false;

    if (!matches.length) {
      const empty = document.createElement("p");
      empty.textContent = "No papers are listed for this selection yet.";
      paperResults.appendChild(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = "paper-list";

    matches.forEach(function (paper) {
      const item = document.createElement("article");
      item.className = "paper-item";

      const title = document.createElement("h3");
      title.textContent = paper.name;

      const link = document.createElement("a");
      link.className = "button";
      link.href = paper.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open paper";

      item.appendChild(title);
      item.appendChild(link);
      list.appendChild(item);
    });

    paperResults.appendChild(list);
  }

  countrySelect.addEventListener("change", function () {
    const country = countrySelect.value;

    if (!country) {
      resetSelect(levelSelect, "Select a grade or level", []);
      resetSelect(subjectSelect, "Select a subject or course", []);
      paperResults.hidden = true;
      paperResults.innerHTML = "";
      updateStatus("Select a country to begin.");
      return;
    }

    const levels = unique(allPapers
      .filter(function (paper) { return paper.country === country; })
      .map(function (paper) { return paper.level; }));

    resetSelect(levelSelect, "Select a grade or level", levels);
    resetSelect(subjectSelect, "Select a subject or course", []);
    paperResults.hidden = true;
    paperResults.innerHTML = "";
    updateStatus("Now select a grade or level.");
  });

  levelSelect.addEventListener("change", function () {
    const country = countrySelect.value;
    const level = levelSelect.value;

    if (!level) {
      resetSelect(subjectSelect, "Select a subject or course", []);
      paperResults.hidden = true;
      paperResults.innerHTML = "";
      updateStatus("Select a grade or level.");
      return;
    }

    const subjects = unique(allPapers
      .filter(function (paper) {
        return paper.country === country && paper.level === level;
      })
      .map(function (paper) { return paper.subject; }));

    resetSelect(subjectSelect, "Select a subject or course", subjects);
    paperResults.hidden = true;
    paperResults.innerHTML = "";
    updateStatus("Now select a subject or course.");
  });

  subjectSelect.addEventListener("change", function () {
    if (!subjectSelect.value) {
      paperResults.hidden = true;
      paperResults.innerHTML = "";
      updateStatus("Select a subject or course to view matching papers.");
      return;
    }

    const label = countrySelect.value + " / " + levelSelect.value + " / " + subjectSelect.value;
    updateStatus(label);
    renderPapers();
  });

  fetch("papers.json")
    .then(function (response) {
      if (!response.ok) throw new Error("papers.json could not be loaded");
      return response.json();
    })
    .then(function (data) {
      allPapers = Array.isArray(data) ? data : [];

      const countries = unique(allPapers.map(function (paper) { return paper.country; }));
      resetSelect(countrySelect, "Select a country", countries);
      updateStatus(allPapers.length ? "Select a country to begin." : "No papers are available yet.");
    })
    .catch(function (error) {
      console.error("Failed to load papers:", error);
      countrySelect.disabled = true;
      levelSelect.disabled = true;
      subjectSelect.disabled = true;
      updateStatus("Sorry, the papers could not be loaded. Please try again later.");
    });
});
