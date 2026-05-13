const mathSubjects = new Set(["Wiskunde A", "Wiskunde B", "Wiskunde C", "Wiskunde D"]);
const noCeSubjects = new Set(["Maatschappijleer", "Lichamelijke opvoeding", "CKV", "BSM", "Informatica", "NLT"]);

const commonBySchool = {
  havo: ["Nederlands", "Engels", "Maatschappijleer", "Lichamelijke opvoeding", "CKV"],
  atheneum: ["Nederlands", "Engels", "Maatschappijleer", "Lichamelijke opvoeding", "CKV"],
  gymnasium: ["Nederlands", "Engels", "Maatschappijleer", "Lichamelijke opvoeding"],
};

const schoolTypes = {
  havo: {
    label: "Havo",
    profiles: {
      cm: {
        label: "CM",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
          { title: "Cultuurvak", key: "cultureChoice", choices: ["Frans", "Duits", "Kunst"], defaultValue: "Kunst", kind: "Profiel" },
        ],
        subjects: ["Geschiedenis", "Aardrijkskunde"],
        freeChoices: ["Frans", "Duits", "Kunst", "Biologie", "Bedrijfseconomie", "BSM", "Economie", "Wiskunde A"],
      },
      cmem: {
        label: "CM+EM",
        subjects: ["Frans", "Duits", "Geschiedenis", "Economie", "Wiskunde A"],
        freeChoices: [],
      },
      em: {
        label: "EM",
        subjects: ["Aardrijkskunde", "Geschiedenis", "Economie", "Wiskunde A"],
        freeChoices: ["Frans", "Duits", "Kunst", "Biologie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"],
      },
      nga: {
        label: "NG-a",
        subjects: ["Scheikunde", "Biologie", "Aardrijkskunde", "Wiskunde A"],
        freeChoices: ["Frans", "Duits", "Kunst", "Economie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"],
      },
      ngn: {
        label: "NG-n",
        subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde A"],
        freeChoices: ["Frans", "Duits", "Kunst", "Economie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"],
      },
      ngnt: {
        label: "NG+NT",
        subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde B"],
        freeChoices: ["Frans", "Duits", "Kunst", "Economie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"],
      },
    },
  },
  atheneum: {
    label: "Atheneum",
    profiles: {
      cm: {
        label: "CM",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
          { title: "Profielkeuze", key: "cultureChoice", choices: ["Frans", "Duits", "Kunst"], defaultValue: "Kunst", kind: "Profiel" },
        ],
        subjects: ["Geschiedenis", "Aardrijkskunde", "Wiskunde C"],
        freeChoices: ["Economie", "Biologie", "Kunst", "BSM"],
      },
      cmem: {
        label: "CM+EM",
        subjects: ["Frans", "Duits", "Geschiedenis", "Economie", "Wiskunde A"],
        freeChoices: ["Aardrijkskunde", "Biologie", "Kunst", "Bedrijfseconomie", "BSM"],
      },
      em: {
        label: "EM",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Aardrijkskunde", "Geschiedenis", "Economie", "Wiskunde A"],
        freeChoices: ["Informatica", "Biologie", "Kunst", "Bedrijfseconomie", "BSM"],
      },
      nga: {
        label: "NGa",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Biologie", "Aardrijkskunde", "Wiskunde A"],
        freeChoices: ["Informatica", "Economie", "Kunst", "Bedrijfseconomie", "BSM"],
        optionalExtra: ["Frans", "Duits"],
      },
      ngn: {
        label: "NGn",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde A"],
        freeChoices: ["Informatica", "Economie", "Kunst", "Bedrijfseconomie", "BSM"],
        optionalExtra: ["Frans", "Duits"],
      },
      ngnt: {
        label: "NG+NT",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Biologie", "Natuurkunde/Physics", "Wiskunde B"],
        freeChoices: ["Informatica", "Economie", "Kunst", "Bedrijfseconomie", "BSM", "Wiskunde D"],
        optionalExtra: ["Frans", "Duits"],
      },
      nt: {
        label: "NT",
        groups: [
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Natuurkunde/Physics", "Wiskunde B", "Wiskunde D"],
        freeChoices: ["Informatica", "Economie", "Bedrijfseconomie", "BSM"],
        optionalExtra: ["Frans", "Duits"],
      },
    },
  },
  gymnasium: {
    label: "Gymnasium",
    profiles: {
      cm: {
        label: "CM",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Geschiedenis", "Aardrijkskunde", "Wiskunde C"],
        freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Economie", "Biologie", "BSM"],
        optionalExtra: ["Latijn", "Grieks"],
      },
      cmem: {
        label: "CM+EM",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
          { title: "Moderne vreemde taal", key: "modernLanguage", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" },
        ],
        subjects: ["Geschiedenis", "Economie", "Wiskunde A"],
        freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Biologie", "BSM", "Aardrijkskunde"],
        optionalExtra: ["Latijn", "Grieks"],
      },
      em: {
        label: "EM",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
        ],
        subjects: ["Aardrijkskunde", "Geschiedenis", "Economie", "Wiskunde A"],
        freeChoices: ["Latijn", "Grieks", "Kunst", "Bedrijfseconomie", "Biologie", "BSM", "Informatica"],
        optionalExtra: ["Latijn", "Grieks"],
      },
      nga: {
        label: "NGa",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Biologie", "Aardrijkskunde", "Wiskunde A"],
        freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Economie", "BSM", "Informatica"],
        optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"],
      },
      ngn: {
        label: "NGn",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde A"],
        freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Economie", "BSM", "Informatica"],
        optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"],
      },
      ngnt: {
        label: "NG+NT",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Biologie", "Natuurkunde/Physics", "Wiskunde B"],
        freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Economie", "BSM", "Informatica", "Wiskunde D"],
        optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"],
      },
      nt: {
        label: "NT",
        groups: [
          { title: "Klassieke taal", key: "classicLanguage", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" },
        ],
        subjects: ["Scheikunde", "Natuurkunde/Physics", "Wiskunde B", "Wiskunde D"],
        freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Bedrijfseconomie", "Economie", "BSM", "Informatica"],
        optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"],
      },
    },
  },
};

const state = {
  schoolKey: "havo",
  profileKey: "cm",
  choices: {},
  freeChoice: "",
  extraEnabled: false,
  extraChoice: "",
  resultRequested: false,
};

const body = document.querySelector("#subjects-body");
const template = document.querySelector("#subject-row-template");
const schoolSelect = document.querySelector("#school-select");
const profileSelect = document.querySelector("#profile-select");
const profileOptions = document.querySelector("#profile-options");
const subjectPreview = document.querySelector("#subject-preview");
const checkButton = document.querySelector("#check-result");
const resetButton = document.querySelector("#reset");
const resultCard = document.querySelector("#result-card");
const statusLabel = document.querySelector("#status-label");
const statusTitle = document.querySelector("#status-title");
const statusCopy = document.querySelector("#status-copy");
const inlineResult = document.querySelector("#inline-result");
const inlineStatusLabel = document.querySelector("#inline-status-label");
const inlineStatusTitle = document.querySelector("#inline-status-title");
const inlineStatusCopy = document.querySelector("#inline-status-copy");
const ceAverage = document.querySelector("#ce-average");
const finalAverage = document.querySelector("#final-average");
const compPoints = document.querySelector("#comp-points");
const failCount = document.querySelector("#fail-count");
const ruleList = document.querySelector("#rule-list");

function init() {
  Object.entries(schoolTypes).forEach(([key, school]) => {
    schoolSelect.append(new Option(school.label, key));
  });

  schoolSelect.value = state.schoolKey;
  schoolSelect.addEventListener("change", () => {
    state.schoolKey = schoolSelect.value;
    state.profileKey = "cm";
    resetProfileState();
    renderProfileSelect();
    renderProfileControls();
    renderSubjects();
  });

  profileSelect.addEventListener("change", () => {
    state.profileKey = profileSelect.value;
    resetProfileState();
    renderProfileControls();
    renderSubjects();
  });

  renderProfileSelect();
  resetProfileState();
  renderProfileControls();
  renderSubjects();
}

function getCurrentSchool() {
  return schoolTypes[state.schoolKey];
}

function getCurrentProfile() {
  return getCurrentSchool().profiles[state.profileKey];
}

function renderProfileSelect() {
  profileSelect.replaceChildren();
  Object.entries(getCurrentSchool().profiles).forEach(([key, profile]) => {
    profileSelect.append(new Option(profile.label, key));
  });
  profileSelect.value = state.profileKey;
}

function resetProfileState() {
  const profile = getCurrentProfile();
  state.choices = {};
  (profile.groups ?? []).forEach((group) => {
    state.choices[group.key] = group.defaultValue;
  });
  state.freeChoice = getAvailableFreeChoices(profile)[0] ?? "";
  state.extraEnabled = false;
  state.extraChoice = getAvailableExtraChoices(profile)[0] ?? "";
}

function renderProfileControls() {
  const profile = getCurrentProfile();
  profileOptions.replaceChildren();

  (profile.groups ?? []).forEach((group) => {
    const choices = getAvailableGroupChoices(group);
    profileOptions.append(createRadioGroup(group.title, group.key, choices, state.choices[group.key], (value) => {
      state.choices[group.key] = value;
      state.freeChoice = keepValidChoice(state.freeChoice, getAvailableFreeChoices(profile));
      state.extraChoice = keepValidChoice(state.extraChoice, getAvailableExtraChoices(profile));
      renderProfileControls();
      renderSubjects();
    }));
  });

  const freeChoices = getAvailableFreeChoices(profile);
  if (freeChoices.length > 0) {
    profileOptions.append(createRadioGroup("Keuzevak", "free-choice", freeChoices, state.freeChoice, (value) => {
      state.freeChoice = value;
      state.extraChoice = keepValidChoice(state.extraChoice, getAvailableExtraChoices(profile));
      renderProfileControls();
      renderSubjects();
    }));
  }

  const extraChoices = getAvailableExtraChoices(profile);
  if (extraChoices.length > 0) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "choice-group";
    fieldset.innerHTML = "<legend>Optioneel: extra taal</legend>";

    const toggle = document.createElement("label");
    toggle.className = "choice-card checkbox-card";
    toggle.innerHTML = `
      <input type="checkbox" ${state.extraEnabled ? "checked" : ""}>
      <span>Extra taal volgen</span>
    `;
    toggle.querySelector("input").addEventListener("change", (event) => {
      state.extraEnabled = event.target.checked;
      renderSubjects();
    });
    fieldset.append(toggle);

    extraChoices.forEach((choice) => {
      const label = document.createElement("label");
      label.className = "choice-card";
      label.innerHTML = `
        <input type="radio" name="extra-choice" value="${choice}" ${state.extraChoice === choice ? "checked" : ""}>
        <span>${choice}</span>
      `;
      label.querySelector("input").addEventListener("change", () => {
        state.extraChoice = choice;
        state.extraEnabled = true;
        renderProfileControls();
        renderSubjects();
      });
      fieldset.append(label);
    });

    profileOptions.append(fieldset);
  }
}

function createRadioGroup(title, name, values, selectedValue, onChange) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "choice-group";
  const legend = document.createElement("legend");
  legend.textContent = title;
  fieldset.append(legend);

  values.forEach((value) => {
    const label = document.createElement("label");
    label.className = "choice-card";
    label.innerHTML = `
      <input type="radio" name="${name}" value="${value}" ${value === selectedValue ? "checked" : ""}>
      <span>${value}</span>
    `;
    label.querySelector("input").addEventListener("change", () => onChange(value));
    fieldset.append(label);
  });

  return fieldset;
}

function getAvailableGroupChoices(group) {
  return group.choices.filter((choice) => {
    if (choice === state.choices[group.key]) return true;
    return !Object.entries(state.choices).some(([key, value]) => key !== group.key && value === choice);
  });
}

function getAvailableFreeChoices(profile) {
  return profile.freeChoices.filter((choice) => !getSelectedChoiceNames().includes(choice));
}

function getAvailableExtraChoices(profile) {
  return (profile.optionalExtra ?? []).filter((choice) => {
    const selected = getSelectedChoiceNames();
    return !selected.includes(choice) && choice !== state.freeChoice;
  });
}

function getSelectedChoiceNames() {
  return Object.values(state.choices).filter(Boolean);
}

function keepValidChoice(current, values) {
  return values.includes(current) ? current : values[0] ?? "";
}

function renderSubjects() {
  const subjects = getSelectedSubjects();
  body.replaceChildren();
  subjectPreview.replaceChildren();

  subjects.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "subject-chip";
    chip.textContent = item.name;
    subjectPreview.append(chip);

    const row = template.content.firstElementChild.cloneNode(true);
    row.dataset.subject = item.name;
    row.dataset.hasCe = String(item.hasCe);
    row.dataset.core = String(item.core);
    row.querySelector(".subject-name").textContent = item.name;
    row.querySelector(".subject-kind").textContent = item.kind;
    row.querySelector(".core-badge").textContent = item.core ? "Ja" : "-";

    const seInput = row.querySelector(".se-grade");
    const ovgInput = row.querySelector(".ovg-grade");
    const ceInput = row.querySelector(".ce-grade");
    const noCe = row.querySelector(".no-ce");

    if (item.name === "Lichamelijke opvoeding") {
      row.dataset.assessment = "ovg";
      seInput.hidden = true;
      ovgInput.hidden = false;
    } else {
      ovgInput.hidden = true;
      seInput.hidden = false;
      row.dataset.assessment = "number";
    }

    if (!item.hasCe) {
      ceInput.disabled = true;
      ceInput.value = "";
      noCe.hidden = false;
    } else {
      noCe.hidden = true;
    }

    syncAssessmentMode(row);
    row.addEventListener("input", calculate);
    row.addEventListener("change", calculate);
    body.append(row);
  });

  calculate();
}

function syncAssessmentMode(row) {
  const isLo = row.dataset.subject === "Lichamelijke opvoeding";
  const seInput = row.querySelector(".se-grade");
  const ovgInput = row.querySelector(".ovg-grade");
  const ceInput = row.querySelector(".ce-grade");
  const noCe = row.querySelector(".no-ce");
  const mode = isLo ? "ovg" : "number";

  row.dataset.assessment = mode;
  seInput.hidden = mode === "ovg";
  ovgInput.hidden = mode !== "ovg";

  if (mode === "ovg") {
    seInput.value = "";
    ceInput.disabled = true;
    ceInput.value = "";
    noCe.hidden = false;
  }
}

function getSelectedSubjects() {
  const profile = getCurrentProfile();
  const subjects = commonBySchool[state.schoolKey].map((name) => subject(name, "Gemeenschappelijk"));

  (profile.groups ?? []).forEach((group) => {
    subjects.push(subject(state.choices[group.key], group.kind));
  });

  profile.subjects.forEach((name) => subjects.push(subject(name, "Profiel")));
  if (state.freeChoice) subjects.push(subject(state.freeChoice, "Keuzevak"));
  if (state.extraEnabled && state.extraChoice) subjects.push(subject(state.extraChoice, "Extra taal"));

  return dedupeSubjects(subjects);
}

function subject(name, kind) {
  return {
    name,
    kind,
    core: name === "Nederlands" || name === "Engels" || mathSubjects.has(name),
    hasCe: !noCeSubjects.has(name),
  };
}

function dedupeSubjects(subjects) {
  const byName = new Map();
  subjects.forEach((item) => {
    if (!byName.has(item.name)) byName.set(item.name, item);
  });
  return [...byName.values()];
}

function roundFinalGrade(value) {
  return Math.floor(value + 0.5);
}

function toGrade(value) {
  const normalized = String(value).trim().replace(",", ".");
  const grade = Number.parseFloat(normalized);
  return Number.isFinite(grade) && grade >= 1 && grade <= 10 ? grade : null;
}

function formatDecimal(value) {
  return Number.isFinite(value) ? value.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "-";
}

function readSubjects() {
  return [...body.querySelectorAll("tr")].map((row) => {
    const assessment = row.dataset.assessment || "number";
    const se = toGrade(row.querySelector(".se-grade").value);
    const hasCe = row.dataset.hasCe === "true";
    const ovg = row.querySelector(".ovg-grade").value;
    const ce = assessment === "number" && hasCe ? toGrade(row.querySelector(".ce-grade").value) : null;
    const complete = assessment === "ovg" ? ovg !== "" : se !== null && (!hasCe || ce !== null);
    const final = assessment === "number" && complete ? roundFinalGrade(hasCe ? (se + ce) / 2 : se) : null;

    return {
      row,
      name: row.dataset.subject,
      core: row.dataset.core === "true",
      hasCe,
      assessment,
      se,
      ce,
      ovg,
      complete,
      final,
    };
  });
}

function compensationFor(final) {
  return Math.max(0, final - 6);
}

function setRule(text, stateName) {
  const item = document.createElement("li");
  item.className = stateName;
  item.textContent = text;
  ruleList.append(item);
}

function calculate() {
  const subjects = readSubjects();
  const completeSubjects = subjects.filter((item) => item.complete);
  const numericSubjects = completeSubjects.filter((item) => item.final !== null);
  const isComplete = completeSubjects.length === subjects.length && subjects.length > 0;
  const ceSubjects = completeSubjects.filter((item) => item.assessment === "number" && item.hasCe);
  const ovgFails = completeSubjects.filter((item) => item.assessment === "ovg" && item.ovg === "O");

  subjects.forEach((item) => {
    const output = item.row.querySelector(".final-grade");
    output.textContent = item.assessment === "ovg" ? item.ovg || "-" : item.final ?? "-";
    output.classList.toggle("fail", (item.final !== null && item.final < 6) || item.ovg === "O");
    output.classList.toggle("pass", (item.final !== null && item.final >= 6) || item.ovg === "V" || item.ovg === "G");
  });

  const ceAvg = ceSubjects.reduce((sum, item) => sum + item.ce, 0) / ceSubjects.length;
  const finalAvg = numericSubjects.reduce((sum, item) => sum + item.final, 0) / numericSubjects.length;
  const finals = numericSubjects.map((item) => item.final);
  const fails = numericSubjects.filter((item) => item.final < 6);
  const coreFails = numericSubjects.filter((item) => item.core && item.final < 6);
  const ckvFails = numericSubjects.filter((item) => item.name === "CKV" && item.final < 6);
  const compensation = finals.reduce((sum, final) => sum + compensationFor(final), 0);
  const hasThree = finals.includes(3);
  const hasBelowFour = finals.some((final) => final < 4);

  ceAverage.textContent = formatDecimal(ceAvg);
  finalAverage.textContent = formatDecimal(finalAvg);
  compPoints.textContent = compensation;
  failCount.textContent = fails.length + ovgFails.length;
  ruleList.replaceChildren();

  if (!isComplete) {
    setRule("Vul bij alle getoonde vakken het SE-cijfer in.", "pending");
    setRule("Kies bij lichamelijke opvoeding O, V of G.", "pending");
    setRule("Vul bij vakken met een centraal examen ook het CE-cijfer in.", "pending");
    setRule("Het gemiddelde van alle CE-cijfers moet minimaal 5,5 zijn.", "pending");
    updateStatus("warning", "Nog niet compleet", "Vul je cijfers in", "Kies je opleiding en profiel. Daarna staan alleen de relevante vakken in de tabel.");
    return;
  }

  const ceRule = ceAvg >= 5.5;
  const noThreeRule = !hasThree;
  const noBelowFourRule = !hasBelowFour;
  const coreRule = coreFails.length <= 1 && coreFails.every((item) => item.final === 5);
  const ckvRule = ckvFails.length === 0;
  const ovgRule = ovgFails.length === 0;
  const pattern = getFailurePattern(fails);
  const compensationRule = pattern.ok && compensation >= pattern.requiredCompensation;
  const passed = ceRule && noThreeRule && noBelowFourRule && coreRule && ckvRule && ovgRule && compensationRule;

  setRule(`CE-gemiddelde is ${formatDecimal(ceAvg)} en moet minimaal 5,5 zijn.`, ceRule ? "pass" : "fail");
  setRule("Er staat geen 3 op je eindlijst.", noThreeRule ? "pass" : "fail");
  setRule("Er staat geen eindcijfer lager dan 4 op je eindlijst.", noBelowFourRule ? "pass" : "fail");
  setRule("Bij Nederlands, Engels en wiskunde staat maximaal een 5, en geen 4 of lager.", coreRule ? "pass" : "fail");
  setRule("CKV is minimaal een 6.", ckvRule ? "pass" : "fail");
  setRule("Lichamelijke opvoeding is geen O.", ovgRule ? "pass" : "fail");
  setRule(pattern.message, compensationRule ? "pass" : "fail");

  if (passed) {
    updateStatus("success", "Geslaagd", "Je bent geslaagd", "Volgens deze havo/vwo-regels haal je de CE-regel, kernvakkenregel en compensatie-eisen.");
    return;
  }

  updateStatus("danger", "Gezakt", "Je bent niet geslaagd", getFailReason({ ceRule, noThreeRule, noBelowFourRule, coreRule, ckvRule, ovgRule, compensationRule, pattern }));
}

function getFailurePattern(fails) {
  const fours = fails.filter((item) => item.final === 4).length;
  const fives = fails.filter((item) => item.final === 5).length;
  const lower = fails.filter((item) => item.final < 4).length;

  if (lower > 0) {
    return { ok: false, requiredCompensation: Infinity, message: "Een eindcijfer lager dan 4 is niet toegestaan." };
  }

  if (fails.length === 0) {
    return { ok: true, requiredCompensation: 0, message: "Alle eindcijfers zijn 6 of hoger; compensatie is niet nodig." };
  }

  if (fives === 1 && fours === 0) {
    return { ok: true, requiredCompensation: 0, message: "Je hebt een 5 en de rest is 6 of hoger; dat mag zonder compensatie." };
  }

  if (fives === 0 && fours === 1) {
    return { ok: true, requiredCompensation: 2, message: "Je hebt een 4; daarvoor heb je minimaal 2 compensatiepunten nodig." };
  }

  if (fives === 2 && fours === 0) {
    return { ok: true, requiredCompensation: 2, message: "Je hebt twee 5'en; daarvoor heb je minimaal 2 compensatiepunten nodig." };
  }

  if (fives === 1 && fours === 1) {
    return { ok: true, requiredCompensation: 3, message: "Je hebt een 5 en een 4; daarvoor heb je minimaal 3 compensatiepunten nodig." };
  }

  return {
    ok: false,
    requiredCompensation: Infinity,
    message: "Deze combinatie van onvoldoendes is niet toegestaan.",
  };
}

function getFailReason(result) {
  if (!result.ceRule) return "Je gemiddelde voor alle centrale examens is lager dan 5,5.";
  if (!result.noThreeRule) return "Met een 3 op je eindlijst ben je sowieso gezakt.";
  if (!result.noBelowFourRule) return "Een eindcijfer lager dan 4 is niet toegestaan.";
  if (!result.coreRule) return "Bij Nederlands, Engels en wiskunde mag je maximaal een 5 hebben.";
  if (!result.ckvRule) return "CKV moet minimaal een 6 zijn.";
  if (!result.ovgRule) return "Lichamelijke opvoeding staat op O. Kies V of G om aan deze controle te voldoen.";
  if (!result.pattern.ok) return result.pattern.message;
  if (!result.compensationRule) return `Je hebt minimaal ${result.pattern.requiredCompensation} compensatiepunten nodig.`;
  return "Een of meer regels worden nog niet gehaald.";
}

function updateStatus(type, label, title, copy) {
  resultCard.className = `status-card is-${type}`;
  statusLabel.textContent = label;
  statusTitle.textContent = title;
  statusCopy.textContent = copy;

  inlineResult.className = `inline-result is-${type}${state.resultRequested ? " is-visible" : ""}`;
  inlineStatusLabel.textContent = label;
  inlineStatusTitle.textContent = title;
  inlineStatusCopy.textContent = copy;
}

checkButton.addEventListener("click", () => {
  state.resultRequested = true;
  calculate();
  inlineResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

resetButton.addEventListener("click", () => {
  [...body.querySelectorAll("tr")].forEach((row) => {
    row.querySelector(".se-grade").value = "";
    row.querySelector(".ce-grade").value = "";
    row.querySelector(".ovg-grade").value = "";
  });
  state.resultRequested = false;
  calculate();
});

init();
