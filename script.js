const mathSubjects = new Set(["Wiskunde A", "Wiskunde B", "Wiskunde C", "Wiskunde D"]);
const noCeSubjects = new Set(["Combinatiecijfer", "Lichamelijke opvoeding", "BSM", "Informatica", "NLT"]);
const storageKey = "geslaagd-checker-v1";
const tips = ["Check je kernvakken extra goed.", "Een tiende erbij op CE kan net het verschil maken.", "Begin met het vak waar je laagste cijfer staat.", "Maak eerst oude examens onder tijdsdruk.", "Slaap is ook examenvoorbereiding."];

const commonBySchool = {
  havo: ["Nederlands", "Engels", "Combinatiecijfer", "Lichamelijke opvoeding"],
  atheneum: ["Nederlands", "Engels", "Combinatiecijfer", "Lichamelijke opvoeding"],
  gymnasium: ["Nederlands", "Engels", "Combinatiecijfer", "Lichamelijke opvoeding"],
};

const schoolTypes = {
  havo: {
    label: "Havo",
    profiles: {
      cm: { label: "CM", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }, { title: "Cultuurvak", key: "culture", choices: ["Frans", "Duits", "Kunst"], defaultValue: "Kunst", kind: "Profiel" }], subjects: ["Geschiedenis", "Aardrijkskunde"], freeChoices: ["Frans", "Duits", "Kunst", "Biologie", "Bedrijfseconomie", "BSM", "Economie", "Wiskunde A"] },
      cmem: { label: "CM+EM", subjects: ["Frans", "Duits", "Geschiedenis", "Economie", "Wiskunde A"], freeChoices: [] },
      em: { label: "EM", subjects: ["Aardrijkskunde", "Geschiedenis", "Economie", "Wiskunde A"], freeChoices: ["Frans", "Duits", "Kunst", "Biologie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"] },
      nga: { label: "NG-a", subjects: ["Scheikunde", "Biologie", "Aardrijkskunde", "Wiskunde A"], freeChoices: ["Frans", "Duits", "Kunst", "Economie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"] },
      ngn: { label: "NG-n", subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde A"], freeChoices: ["Frans", "Duits", "Kunst", "Economie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"] },
      ngnt: { label: "NG+NT", subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde B"], freeChoices: ["Frans", "Duits", "Kunst", "Economie", "Bedrijfseconomie", "BSM", "Informatica", "NLT"] },
    },
  },
  atheneum: {
    label: "Atheneum",
    profiles: {
      cm: { label: "CM", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }, { title: "Profielkeuze", key: "culture", choices: ["Frans", "Duits", "Kunst"], defaultValue: "Kunst", kind: "Profiel" }], subjects: ["Geschiedenis", "Aardrijkskunde", "Wiskunde C"], freeChoices: ["Economie", "Biologie", "Kunst", "BSM"] },
      cmem: { label: "CM+EM", subjects: ["Frans", "Duits", "Geschiedenis", "Economie", "Wiskunde A"], freeChoices: ["Aardrijkskunde", "Biologie", "Kunst", "Bedrijfseconomie", "BSM"] },
      em: { label: "EM", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Aardrijkskunde", "Geschiedenis", "Economie", "Wiskunde A"], freeChoices: ["Informatica", "Biologie", "Kunst", "Bedrijfseconomie", "BSM"] },
      nga: { label: "NGa", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Scheikunde", "Biologie", "Aardrijkskunde", "Wiskunde A"], freeChoices: ["Informatica", "Economie", "Kunst", "Bedrijfseconomie", "BSM"], optionalExtra: ["Frans", "Duits"] },
      ngn: { label: "NGn", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde A"], freeChoices: ["Informatica", "Economie", "Kunst", "Bedrijfseconomie", "BSM"], optionalExtra: ["Frans", "Duits"] },
      ngnt: { label: "NG+NT", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Scheikunde", "Biologie", "Natuurkunde/Physics", "Wiskunde B"], freeChoices: ["Informatica", "Economie", "Kunst", "Bedrijfseconomie", "BSM", "Wiskunde D"], optionalExtra: ["Frans", "Duits"] },
      nt: { label: "NT", groups: [{ title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Scheikunde", "Natuurkunde/Physics", "Wiskunde B", "Wiskunde D"], freeChoices: ["Informatica", "Economie", "Bedrijfseconomie", "BSM"], optionalExtra: ["Frans", "Duits"] },
    },
  },
  gymnasium: {
    label: "Gymnasium",
    profiles: {
      cm: { label: "CM", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }, { title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Geschiedenis", "Aardrijkskunde", "Wiskunde C"], freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Economie", "Biologie", "BSM"], optionalExtra: ["Latijn", "Grieks"] },
      cmem: { label: "CM+EM", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }, { title: "Moderne vreemde taal", key: "modern", choices: ["Frans", "Duits"], defaultValue: "Frans", kind: "Profiel" }], subjects: ["Geschiedenis", "Economie", "Wiskunde A"], freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Biologie", "BSM", "Aardrijkskunde"], optionalExtra: ["Latijn", "Grieks"] },
      em: { label: "EM", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }], subjects: ["Aardrijkskunde", "Geschiedenis", "Economie", "Wiskunde A"], freeChoices: ["Latijn", "Grieks", "Kunst", "Bedrijfseconomie", "Biologie", "BSM", "Informatica"], optionalExtra: ["Latijn", "Grieks"] },
      nga: { label: "NGa", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }], subjects: ["Scheikunde", "Biologie", "Aardrijkskunde", "Wiskunde A"], freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Economie", "BSM", "Informatica"], optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"] },
      ngn: { label: "NGn", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }], subjects: ["Scheikunde", "Biologie", "Natuurkunde", "Wiskunde A"], freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Economie", "BSM", "Informatica"], optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"] },
      ngnt: { label: "NG+NT", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }], subjects: ["Scheikunde", "Biologie", "Natuurkunde/Physics", "Wiskunde B"], freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Kunst", "Bedrijfseconomie", "Economie", "BSM", "Informatica", "Wiskunde D"], optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"] },
      nt: { label: "NT", groups: [{ title: "Klassieke taal", key: "classic", choices: ["Latijn", "Grieks"], defaultValue: "Latijn", kind: "Profiel" }], subjects: ["Scheikunde", "Natuurkunde/Physics", "Wiskunde B", "Wiskunde D"], freeChoices: ["Latijn", "Grieks", "Frans", "Duits", "Bedrijfseconomie", "Economie", "BSM", "Informatica"], optionalExtra: ["Latijn", "Grieks", "Frans", "Duits"] },
    },
  },
};

const state = { school: "havo", profile: "cm", choices: {}, freeChoice: "", extraEnabled: false, extraChoice: "", resultRequested: false, grades: {}, darkMode: false, theme: "clean" };
const $ = (selector) => document.querySelector(selector);
const schoolSelect = $("#school");
const profileSelect = $("#profile");
const choicesEl = $("#choices");
const chipsEl = $("#chips");
const rowsEl = $("#rows");
const rowTemplate = $("#row-template");
const rulesEl = $("#rules");
const topResult = $("#top-result");
const inlineResult = $("#inline-result");
const detailsEl = $("#details");
const ceProgressLabel = $("#ce-progress-label");
const ceProgressBar = $("#ce-progress-bar");
const topCeAvg = $("#top-ce-avg");
const topCeBar = $("#top-ce-bar");
const themeToggle = $("#theme-toggle");
let confettiReady = true;
let latestDashboardText = "Nog geen uitslag.";

function init() {
  const hadSavedState = loadSavedState();
  Object.entries(schoolTypes).forEach(([key, school]) => schoolSelect.append(new Option(school.label, key)));
  schoolSelect.value = state.school;
  schoolSelect.addEventListener("change", () => {
    state.school = schoolSelect.value;
    state.profile = "cm";
    state.grades = {};
    resetProfile();
    renderProfiles();
    renderChoices();
    renderSubjects();
    saveState();
  });
  profileSelect.addEventListener("change", () => {
    state.profile = profileSelect.value;
    state.grades = {};
    resetProfile();
    renderChoices();
    renderSubjects();
    saveState();
  });
  $("#check").addEventListener("click", () => {
    state.resultRequested = true;
    saveState();
    confettiReady = true;
    calculate();
    inlineResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  $("#reset").addEventListener("click", resetGrades);
  $("#sample").addEventListener("click", fillExample);
  $("#sample-bottom").addEventListener("click", fillExample);
  themeToggle.addEventListener("click", toggleTheme);
  setupSmartTools();
  applyTheme();
  renderProfiles();
  if (!hadSavedState) resetProfile();
  renderChoices();
  renderSubjects();
}

function currentProfile() { return schoolTypes[state.school].profiles[state.profile]; }
function renderProfiles() {
  profileSelect.replaceChildren();
  Object.entries(schoolTypes[state.school].profiles).forEach(([key, profile]) => profileSelect.append(new Option(profile.label, key)));
  profileSelect.value = state.profile;
}
function resetProfile() {
  const profile = currentProfile();
  state.choices = {};
  (profile.groups || []).forEach((group) => state.choices[group.key] = group.defaultValue);
  state.freeChoice = availableFreeChoices()[0] || "";
  state.extraEnabled = false;
  state.extraChoice = availableExtraChoices()[0] || "";
}
function selectedChoiceNames() { return Object.values(state.choices).filter(Boolean); }
function availableFreeChoices() { return currentProfile().freeChoices.filter((choice) => !selectedChoiceNames().includes(choice)); }
function availableExtraChoices() { return (currentProfile().optionalExtra || []).filter((choice) => !selectedChoiceNames().includes(choice) && choice !== state.freeChoice); }
function keepValid(value, values) { return values.includes(value) ? value : values[0] || ""; }
function renderChoices() {
  choicesEl.replaceChildren();
  const profile = currentProfile();
  (profile.groups || []).forEach((group) => {
    const values = group.choices.filter((choice) => choice === state.choices[group.key] || !Object.entries(state.choices).some(([key, value]) => key !== group.key && value === choice));
    choicesEl.append(radioGroup(group.title, group.key, values, state.choices[group.key], (value) => {
      state.choices[group.key] = value;
      state.freeChoice = keepValid(state.freeChoice, availableFreeChoices());
      state.extraChoice = keepValid(state.extraChoice, availableExtraChoices());
      renderChoices();
      renderSubjects();
      saveState();
    }));
  });
  const freeChoices = availableFreeChoices();
  if (freeChoices.length) {
    choicesEl.append(radioGroup("Keuzevak", "free", freeChoices, state.freeChoice, (value) => {
      state.freeChoice = value;
      state.extraChoice = keepValid(state.extraChoice, availableExtraChoices());
      renderChoices();
      renderSubjects();
      saveState();
    }));
  }
  const extraChoices = availableExtraChoices();
  if (extraChoices.length) {
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = "<legend>Optioneel: extra taal</legend>";
    const toggle = document.createElement("label");
    toggle.className = "choice";
    toggle.innerHTML = `<input type="checkbox" ${state.extraEnabled ? "checked" : ""}><span>Extra taal volgen</span>`;
    toggle.querySelector("input").addEventListener("change", (event) => { state.extraEnabled = event.target.checked; renderSubjects(); saveState(); });
    fieldset.append(toggle);
    extraChoices.forEach((choice) => {
      const label = document.createElement("label");
      label.className = "choice";
      label.innerHTML = `<input type="radio" name="extra" value="${choice}" ${state.extraChoice === choice ? "checked" : ""}><span>${choice}</span>`;
      label.querySelector("input").addEventListener("change", () => { state.extraChoice = choice; state.extraEnabled = true; renderChoices(); renderSubjects(); saveState(); });
      fieldset.append(label);
    });
    choicesEl.append(fieldset);
  }
}
function radioGroup(title, name, values, selected, onChange) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = title;
  fieldset.append(legend);
  values.forEach((value) => {
    const label = document.createElement("label");
    label.className = "choice";
    label.innerHTML = `<input type="radio" name="${name}" value="${value}" ${value === selected ? "checked" : ""}><span>${value}</span>`;
    label.querySelector("input").addEventListener("change", () => onChange(value));
    fieldset.append(label);
  });
  return fieldset;
}
function getSubjects() {
  const profile = currentProfile();
  const subjects = commonBySchool[state.school].map((name) => subject(name, "Gemeenschappelijk"));
  (profile.groups || []).forEach((group) => subjects.push(subject(state.choices[group.key], group.kind)));
  profile.subjects.forEach((name) => subjects.push(subject(name, "Profiel")));
  if (state.freeChoice) subjects.push(subject(state.freeChoice, "Keuzevak"));
  if (state.extraEnabled && state.extraChoice) subjects.push(subject(state.extraChoice, "Extra taal"));
  const byName = new Map();
  subjects.forEach((item) => { if (!byName.has(item.name)) byName.set(item.name, item); });
  return [...byName.values()];
}
function subject(name, kind) { return { name, kind, core: name === "Nederlands" || name === "Engels" || mathSubjects.has(name), hasCe: !noCeSubjects.has(name) }; }
function renderSubjects() {
  const subjects = getSubjects();
  rowsEl.replaceChildren();
  chipsEl.replaceChildren();
  subjects.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item.name;
    chipsEl.append(chip);
    const row = rowTemplate.content.firstElementChild.cloneNode(true);
    row.dataset.subject = item.name;
    row.dataset.hasCe = String(item.hasCe);
    row.dataset.core = String(item.core);
    row.dataset.assessment = item.name === "Lichamelijke opvoeding" ? "ovg" : "number";
    row.querySelector(".subject").textContent = item.name;
    row.querySelector(".kind").textContent = item.kind;
    const core = row.querySelector(".core");
    core.textContent = item.core ? "Kernvak" : "-";
    core.classList.toggle("active", item.core);
    const se = row.querySelector(".se");
    const ovg = row.querySelector(".ovg");
    const ce = row.querySelector(".ce");
    const noCe = row.querySelector(".no-ce");
    const saved = state.grades[item.name] || {};
    se.value = saved.se || "";
    ce.value = saved.ce || "";
    ovg.value = saved.ovg || "";
    if (item.name === "Lichamelijke opvoeding") {
      se.hidden = true;
      ovg.hidden = false;
    } else {
      se.hidden = false;
      ovg.hidden = true;
    }
    if (!item.hasCe) {
      ce.disabled = true;
      ce.value = "";
      noCe.hidden = false;
    } else {
      noCe.hidden = true;
    }
    row.addEventListener("input", () => { saveCurrentGrades(); calculate(); });
    row.addEventListener("change", () => { saveCurrentGrades(); calculate(); });
    rowsEl.append(row);
  });
  calculate();
}
function parseGrade(value) {
  const raw = String(value).trim();
  if (!raw) return { value: null, empty: true, invalid: false };
  const grade = Number.parseFloat(raw.replace(",", "."));
  if (!Number.isFinite(grade) || grade < 1 || grade > 10) return { value: null, empty: false, invalid: true };
  return { value: grade, empty: false, invalid: false };
}
function roundFinal(value) { return Math.floor(value + 0.5); }
function fmt(value, digits = 1) { return Number.isFinite(value) ? value.toLocaleString("nl-NL", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-"; }
function roundTo(value, digits) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
function compFor(final) { return Math.max(0, final - 6); }
function readSubjects() {
  return [...rowsEl.querySelectorAll("tr")].map((row) => {
    const assessment = row.dataset.assessment;
    const seField = row.querySelector(".se");
    const ceField = row.querySelector(".ce");
    const seInfo = parseGrade(seField.value);
    const ovg = row.querySelector(".ovg").value;
    const hasCe = row.dataset.hasCe === "true";
    const ceInfo = assessment === "number" && hasCe ? parseGrade(ceField.value) : { value: null, empty: true, invalid: false };
    const invalid = assessment === "number" && (seInfo.invalid || ceInfo.invalid);
    seField.classList.toggle("invalid", assessment === "number" && seInfo.invalid);
    ceField.classList.toggle("invalid", assessment === "number" && ceInfo.invalid);
    const complete = assessment === "ovg" ? ovg !== "" : !invalid && seInfo.value !== null && (!hasCe || ceInfo.value !== null);
    const final = assessment === "number" && complete ? roundFinal(hasCe ? (seInfo.value + ceInfo.value) / 2 : seInfo.value) : null;
    const invalidFields = [];
    if (assessment === "number" && seInfo.invalid) invalidFields.push("SE");
    if (assessment === "number" && ceInfo.invalid) invalidFields.push("CE");
    return { row, name: row.dataset.subject, core: row.dataset.core === "true", hasCe, assessment, se: seInfo.value, ce: ceInfo.value, ovg, complete, invalid, invalidFields, final };
  });
}
function rule(text, stateName) {
  const item = document.createElement("li");
  item.className = stateName;
  item.textContent = text;
  rulesEl.append(item);
}
function calculate() {
  const subjects = readSubjects();
  const complete = subjects.filter((item) => item.complete);
  const invalidSubjects = subjects.filter((item) => item.invalid);
  const missingSubjects = subjects.filter((item) => !item.complete && !item.invalid);
  const numeric = complete.filter((item) => item.final !== null);
  const exam = numeric.filter((item) => item.name !== "Combinatiecijfer");
  const combo = numeric.find((item) => item.name === "Combinatiecijfer");
  const ceSubjects = complete.filter((item) => item.assessment === "number" && item.hasCe);
  const ovgFails = complete.filter((item) => item.assessment === "ovg" && item.ovg === "O");
  const isComplete = complete.length === subjects.length && subjects.length > 0 && invalidSubjects.length === 0;

  subjects.forEach((item) => {
    const output = item.row.querySelector(".final");
    const badge = item.row.querySelector(".subject-status");
    const isCombo = item.name === "Combinatiecijfer";
    const passedSubject = (item.final !== null && (isCombo ? item.final >= 4 : item.final >= 6)) || item.ovg === "V" || item.ovg === "G";
    const failedSubject = item.final !== null && (isCombo ? item.final < 4 : item.final < 6) || item.ovg === "O";
    output.textContent = item.assessment === "ovg" ? item.ovg || "-" : item.final ?? "-";
    output.classList.toggle("fail", failedSubject);
    output.classList.toggle("pass", passedSubject);
    item.row.classList.toggle("is-row-pass", passedSubject);
    item.row.classList.toggle("is-row-fail", failedSubject);
    item.row.classList.toggle("is-row-warning", item.invalid || !item.complete);
    if (item.invalid) {
      badge.textContent = "⚠️ Ongeldig";
      badge.className = "subject-status is-warning";
    } else if (!item.complete) {
      badge.textContent = "Nog invullen";
      badge.className = "subject-status is-pending";
    } else if (passedSubject) {
      badge.textContent = "✅ Voldoende";
      badge.className = "subject-status is-pass";
    } else {
      badge.textContent = "❌ Onvoldoende";
      badge.className = "subject-status is-fail";
    }
  });

  const ceAvgRaw = ceSubjects.length ? ceSubjects.reduce((sum, item) => sum + item.ce, 0) / ceSubjects.length : NaN;
  const ceAvg = roundTo(ceAvgRaw, 2);
  const finalAvg = exam.length ? exam.reduce((sum, item) => sum + item.final, 0) / exam.length : NaN;
  const finals = exam.map((item) => item.final);
  const fails = exam.filter((item) => item.final < 6);
  const passes = exam.filter((item) => item.final >= 6).length + complete.filter((item) => item.assessment === "ovg" && (item.ovg === "V" || item.ovg === "G")).length + (combo && combo.final >= 4 ? 1 : 0);
  const coreFails = exam.filter((item) => item.core && item.final < 6);
  const comboBelowFour = combo ? combo.final < 4 : false;
  const compensation = finals.reduce((sum, final) => sum + compFor(final), 0) + (combo ? compFor(combo.final) : 0);
  const hasThree = finals.includes(3);
  const hasBelowFour = finals.some((final) => final < 4);

  $("#passes").textContent = passes;
  $("#ce-avg").textContent = fmt(ceAvg, 2);
  $("#final-avg").textContent = fmt(finalAvg);
  $("#comp").textContent = compensation;
  $("#fails").textContent = fails.length + ovgFails.length + (comboBelowFour ? 1 : 0);
  updateCeProgress(ceAvg);

  rulesEl.replaceChildren();
  if (invalidSubjects.length) {
    rule("Er staan cijfers lager dan 1 of hoger dan 10. Pas die eerst aan.", "fail");
    rule("Cijfers moeten tussen 1,0 en 10,0 liggen.", "pending");
    setStatus("warning", "⚠️ Controleer cijfers", "Ongeldige cijfers", "Een cijfer mag niet lager dan 1 of hoger dan 10 zijn.");
    setDetails(invalidSubjects.map((item) => `${item.name}: controleer ${item.invalidFields.join(" en ")}.`), "Dit moet je aanpassen");
    updateSmartDashboard({ subjects, complete, invalidSubjects, missingSubjects, numeric, exam, combo, ceAvg, finalAvg, passes, fails, ovgFails, compensation, isComplete, status: "warning", passed: false, chance: 8, failedMessages: ["Er staan ongeldige cijfers."] });
    confettiReady = true;
    return;
  }

  if (!isComplete) {
    rule("Vul alle SE-cijfers, CE-cijfers en O/V/G-beoordelingen in.", "pending");
    rule("Het CE-gemiddelde moet minimaal 5,50 zijn.", "pending");
    setStatus("warning", "⚠️ Nog niet compleet", "Vul je cijfers in", "Er ontbreken nog cijfers of beoordelingen.");
    setDetails(missingSubjects.map((item) => `${item.name}: nog invullen.`), "Dit ontbreekt nog");
    updateSmartDashboard({ subjects, complete, invalidSubjects, missingSubjects, numeric, exam, combo, ceAvg, finalAvg, passes, fails, ovgFails, compensation, isComplete, status: "pending", passed: false, chance: estimateChance({ ceAvg, finalAvg, fails, compensation, isComplete: false, invalidSubjects }), failedMessages: ["Nog niet alle cijfers zijn ingevuld."] });
    confettiReady = true;
    return;
  }

  const ceRule = ceAvg >= 5.5;
  const coreRule = coreFails.length <= 1 && coreFails.every((item) => item.final === 5);
  const noThreeRule = !hasThree;
  const noBelowFourRule = !hasBelowFour;
  const comboRule = !comboBelowFour;
  const ovgRule = ovgFails.length === 0;
  const pattern = failurePattern(fails);
  const compensationRule = pattern.ok && compensation >= pattern.requiredCompensation;
  const passed = ceRule && coreRule && noThreeRule && noBelowFourRule && comboRule && ovgRule && compensationRule;

  rule(`📊 CE-gemiddelde is ${fmt(ceAvg, 2)} en moet minimaal 5,50 zijn.`, ceRule ? "pass" : "fail");
  rule("Kernvakkenregel: maximaal een 5 bij Nederlands, Engels en wiskunde.", coreRule ? "pass" : "fail");
  rule("Geen eindcijfer is lager dan 4.", noBelowFourRule ? "pass" : "fail");
  rule("Combinatiecijfer is minimaal een 4.", comboRule ? "pass" : "fail");
  rule(pattern.message, compensationRule ? "pass" : "fail");
  rule("Lichamelijke opvoeding is V of G.", ovgRule ? "pass" : "fail");

  const failed = failedMessages({ ceRule, ceAvg, coreRule, coreFails, noThreeRule, noBelowFourRule, comboRule, ovgRule, pattern, compensationRule });
  const chance = estimateChance({ ceAvg, finalAvg, fails, compensation, isComplete, invalidSubjects, passed });
  updateSmartDashboard({ subjects, complete, invalidSubjects, missingSubjects, numeric, exam, combo, ceAvg, finalAvg, passes, fails, ovgFails, compensation, isComplete, status: passed ? "success" : "danger", passed, chance, failedMessages: failed, coreFails });
  if (passed) {
    setStatus("success", "✅ Geslaagd", "Je bent geslaagd", `Je CE-gemiddelde is ${fmt(ceAvg, 2)} en je voldoet aan alle eisen.`);
    setDetails([`📊 CE-gemiddelde: ${fmt(ceAvg, 2)}.`, "✅ Je voldoet aan alle eisen."], "Alles klopt");
    if (confettiReady) {
      launchConfetti();
      playSuccessSound();
      saveResultHistory({ passed, chance, ceAvg, finalAvg });
      confettiReady = false;
    }
  } else {
    setStatus("danger", "❌ Niet geslaagd", "Je bent niet geslaagd", failed[0]);
    setDetails([`📊 CE-gemiddelde: ${fmt(ceAvg, 2)}.`, ...failed.map((message) => `❌ ${message}`)], "Hier voldoe je nog niet aan");
    confettiReady = true;
  }
}
function failurePattern(fails) {
  const fours = fails.filter((item) => item.final === 4).length;
  const fives = fails.filter((item) => item.final === 5).length;
  const lower = fails.filter((item) => item.final < 4).length;
  if (lower > 0) return { ok: false, requiredCompensation: Infinity, message: "Een eindcijfer lager dan 4 is niet toegestaan." };
  if (fails.length === 0) return { ok: true, requiredCompensation: 0, message: "Alle eindcijfers zijn 6 of hoger." };
  if (fives === 1 && fours === 0) return { ok: true, requiredCompensation: 0, message: "Je hebt een 5 en alle andere eindcijfers zijn 6 of hoger." };
  if (fives === 0 && fours === 1) return { ok: true, requiredCompensation: 2, message: "Je hebt een 4, alle andere eindcijfers zijn 6 of hoger en het gemiddelde is minimaal 6,0." };
  if (fives === 2 && fours === 0) return { ok: true, requiredCompensation: 2, message: "Je hebt twee 5'en, alle andere eindcijfers zijn 6 of hoger en het gemiddelde is minimaal 6,0." };
  if (fives === 1 && fours === 1) return { ok: true, requiredCompensation: 3, message: "Je hebt een 5 en een 4, alle andere eindcijfers zijn 6 of hoger en het gemiddelde is minimaal 6,0." };
  return { ok: false, requiredCompensation: Infinity, message: "Deze combinatie van onvoldoendes is niet toegestaan." };
}
function failedMessages(result) {
  const messages = [];
  if (!result.ceRule) messages.push(`Je CE-gemiddelde is ${fmt(result.ceAvg, 2)}. Dat moet minimaal 5,50 zijn.`);
  if (!result.coreRule) messages.push(`Kernvakkenregel niet gehaald: ${result.coreFails.map((item) => `${item.name} (${item.final})`).join(", ")}.`);
  if (!result.noThreeRule) messages.push("Er staat een 3 op je eindlijst. Met een 3 ben je gezakt.");
  if (!result.noBelowFourRule) messages.push("Er staat een eindcijfer lager dan 4. Dat mag niet.");
  if (!result.comboRule) messages.push("Het combinatiecijfer is lager dan 4. Dat mag niet.");
  if (!result.pattern.ok) messages.push(result.pattern.message);
  else if (!result.compensationRule) messages.push("Je hebt te weinig compensatiepunten.");
  if (!result.ovgRule) messages.push("Lichamelijke opvoeding staat op O. Dit moet V of G zijn.");
  return messages.length ? messages : ["Een of meer eisen worden nog niet gehaald."];
}
function setStatus(type, label, title, copy) {
  topResult.className = `result-card is-${type}`;
  $("#top-label").textContent = label;
  $("#top-title").textContent = title;
  $("#top-copy").textContent = copy;
  inlineResult.className = `inline-result is-${type} visible`;
  $("#inline-label").textContent = label;
  $("#inline-title").textContent = title;
  $("#inline-copy").textContent = copy;
}
function setDetails(messages, title) {
  detailsEl.replaceChildren();
  const heading = document.createElement("h3");
  heading.textContent = title;
  const list = document.createElement("ul");
  messages.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    list.append(item);
  });
  detailsEl.append(heading, list);
}
function saveCurrentGrades() {
  const grades = {};
  rowsEl.querySelectorAll("tr").forEach((row) => {
    grades[row.dataset.subject] = {
      se: row.querySelector(".se").value,
      ce: row.querySelector(".ce").value,
      ovg: row.querySelector(".ovg").value,
    };
  });
  state.grades = grades;
  saveState();
}
function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({
    school: state.school,
    profile: state.profile,
    choices: state.choices,
    freeChoice: state.freeChoice,
    extraEnabled: state.extraEnabled,
    extraChoice: state.extraChoice,
    grades: state.grades,
    darkMode: state.darkMode,
    theme: state.theme,
  }));
}
function loadSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!saved) return false;
    if (schoolTypes[saved.school]) state.school = saved.school;
    if (schoolTypes[state.school].profiles[saved.profile]) state.profile = saved.profile;
    state.choices = saved.choices || {};
    state.freeChoice = saved.freeChoice || "";
    state.extraEnabled = Boolean(saved.extraEnabled);
    state.extraChoice = saved.extraChoice || "";
    state.grades = saved.grades || {};
    state.darkMode = Boolean(saved.darkMode);
    state.theme = saved.theme || "clean";
    return true;
  } catch {
    localStorage.removeItem(storageKey);
    return false;
  }
}
function resetGrades() {
  rowsEl.querySelectorAll("tr").forEach((row) => {
    row.querySelector(".se").value = "";
    row.querySelector(".ce").value = "";
    row.querySelector(".ovg").value = "";
  });
  state.resultRequested = false;
  state.grades = {};
  saveState();
  calculate();
}
function setupSmartTools() {
  document.querySelectorAll(".mini-theme").forEach((button) => {
    button.addEventListener("click", () => setDashboardTheme(button.dataset.theme));
  });
  $("#share-result")?.addEventListener("click", shareResult);
  $("#screenshot-result")?.addEventListener("click", () => printExport("#screenshot-result", "Screenshot klaar"));
  $("#pdf-result")?.addEventListener("click", () => printExport("#pdf-result", "PDF maken"));
  applyDashboardTheme();
  applyTimeBackdrop();
  setInterval(applyTimeBackdrop, 10 * 60 * 1000);
}
function setDashboardTheme(theme) {
  state.theme = theme || "clean";
  applyDashboardTheme();
  saveState();
}
function applyDashboardTheme() {
  const theme = state.theme || "clean";
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  document.body.classList.remove("theme-clean", "theme-neon", "theme-duo", "theme-minimal");
  document.body.classList.add(`theme-${theme}`);
  document.querySelectorAll(".mini-theme").forEach((button) => {
    const active = button.dataset.theme === theme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
function applyTimeBackdrop() {
  const hour = new Date().getHours();
  document.body.classList.toggle("time-night", hour < 7 || hour >= 20);
  document.body.classList.toggle("time-day", hour >= 7 && hour < 20);
}
function playSuccessSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    [523, 659, 784].forEach((freq, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = freq;
      oscillator.type = "sine";
      oscillator.connect(gain);
      gain.connect(context.destination);
      gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.08 + 0.18);
      oscillator.start(context.currentTime + index * 0.08);
      oscillator.stop(context.currentTime + index * 0.08 + 0.2);
    });
  } catch {}
}
function saveResultHistory({ passed, chance, ceAvg, finalAvg }) {
  const history = JSON.parse(localStorage.getItem(`${storageKey}-history`) || "[]");
  history.unshift({ date: new Date().toLocaleString("nl-NL"), status: passed ? "Geslaagd" : "Niet geslaagd", chance, ceAvg: fmt(ceAvg, 2), finalAvg: fmt(finalAvg) });
  localStorage.setItem(`${storageKey}-history`, JSON.stringify(history.slice(0, 5)));
  renderHistory();
}
function renderHistory() {
  const list = $("#history-list");
  if (!list) return;
  const history = JSON.parse(localStorage.getItem(`${storageKey}-history`) || "[]");
  list.replaceChildren();
  if (!history.length) {
    list.textContent = "Nog geen eerdere complete berekening.";
    return;
  }
  history.forEach((item) => {
    const row = document.createElement("span");
    row.textContent = `${item.date}: ${item.status}, kans ${item.chance}%, CE ${item.ceAvg}`;
    list.append(row);
  });
}
function estimateChance({ ceAvg, finalAvg, fails, compensation, isComplete, invalidSubjects, passed }) {
  if (invalidSubjects?.length) return 5;
  if (passed) return Math.max(84, Math.round(78 + Math.min(18, compensation * 3)));
  const cePart = Number.isFinite(ceAvg) ? (ceAvg - 5.5) * 15 : 0;
  const avgPart = Number.isFinite(finalAvg) ? (finalAvg - 6) * 10 : 0;
  const failPenalty = (fails?.length || 0) * 13;
  const completeBoost = isComplete ? 4 : -8;
  return Math.max(3, Math.min(97, Math.round(62 + cePart + avgPart + (compensation || 0) * 4 - failPenalty + completeBoost)));
}
function updateSmartDashboard(data) {
  const { subjects, complete, numeric, exam, ceAvg, finalAvg, passes, fails, compensation, status, passed, chance, failedMessages, coreFails } = data;
  const filledText = `${complete.length}/${subjects.length} vakken ingevuld`;
  setText("#sticky-filled", filledText);
  setText("#sticky-status-text", status === "success" ? "Uitstekend" : status === "danger" ? "Risicogebied" : "Nog bezig");
  setText("#sticky-chance", `Kans: ${Number.isFinite(chance) ? chance : "-"}%`);
  setText("#progress-filled-title", filledText);
  const progressPercent = subjects.length ? Math.round((complete.length / subjects.length) * 100) : 0;
  const progressBar = $("#dashboard-progress-bar");
  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  setText("#progress-helper", progressPercent === 100 ? "Alles is ingevuld. De uitslag is compleet." : `Nog ${subjects.length - complete.length} vakken te gaan.`);
  setText("#chance-value", `${Number.isFinite(chance) ? chance : "-"}%`);
  animateChanceCircle(Number.isFinite(chance) ? chance : 0);
  setText("#motivation-text", motivationFor(data));
  setText("#circle-average", fmt(finalAvg));
  setText("#circle-ce", fmt(ceAvg, 2));
  setText("#circle-status", passed ? "OK" : status === "danger" ? "Let op" : "- ");
  const best = numeric.filter((item) => item.final !== null).sort((a, b) => b.final - a.final)[0];
  const worst = numeric.filter((item) => item.final !== null).sort((a, b) => a.final - b.final)[0];
  setText("#highest-grade", best ? `${best.name} (${best.final})` : "-");
  setText("#lowest-grade", worst ? `${worst.name} (${worst.final})` : "-");
  setText("#total-average", fmt(finalAvg));
  setText("#study-points", `${Math.max(0, passes * 5 + compensation * 2)} punten`);
  setText("#national-compare", Number.isFinite(finalAvg) ? `${fmt(finalAvg)} vs 6,4` : "-");
  renderHistory();
  setText("#best-worst-summary", best && worst ? `Beste vak: ${best.name} (${best.final}) | Moeilijkste vak: ${worst.name} (${worst.final})` : "Nog geen analyse");
  setText("#critical-subject", worst ? `Kritiek vak: ${worst.name}` : "Kritiek vak: -");
  renderGradeChart(numeric);
  renderCompareChart(complete.filter((item) => item.hasCe && item.se !== null && item.ce !== null));
  renderDistributionChart(numeric);
  renderRiskList(data, worst);
  renderCollapsedSubjects(subjects);
  const retake = retakeSuggestion(exam, fails, worst);
  setText("#retake-advice", retake);
  setText("#ai-advice", smartAdvice(data, worst, coreFails));
  setText("#core-warning-title", coreFails?.length ? "Let op je kernvakken" : "Kernvakken lijken oké");
  setText("#core-warning-text", coreFails?.length ? `Aandacht voor: ${coreFails.map((item) => item.name).join(", ")}.` : "Geen kernvak staat nu gevaarlijk, zolang de rest ook klopt.");
  const stress = Math.max(8, Math.min(96, 35 + (fails.length * 18) + (Number.isFinite(ceAvg) && ceAvg < 5.5 ? 22 : 0) + (complete.length < subjects.length ? 12 : 0)));
  const stressBar = $("#stress-bar");
  if (stressBar) stressBar.style.width = `${stress}%`;
  setText("#stress-text", stress < 40 ? "Je staat er rustig bij." : stress < 70 ? "Een beetje spanning is normaal." : "Adem in. Pak het kritischste vak eerst.");
  setText("#tips-strip", tips[(complete.length + fails.length) % tips.length]);
  latestDashboardText = `${filledText}. Kans op slagen: ${chance}%. CE-gemiddelde: ${fmt(ceAvg, 2)}. ${failedMessages?.[0] || "Geen aandachtspunt."}`;
}
function motivationFor(data) {
  if (data.passed) return "Je staat er goed voor 🔥";
  if (data.coreFails?.length) return "Let op je kernvakken";
  if (data.fails?.length === 1) return "Nog een voldoende kan het verschil maken";
  if (!data.isComplete) return "Vul de rest in voor een scherpere voorspelling";
  return "Focus op je laagste vak voor de meeste winst";
}
function smartAdvice(data, worst, coreFails) {
  if (coreFails?.length) return `AI advies: focus vooral op ${coreFails.map((item) => item.name).join(" en ")}.`;
  if (worst) return `AI advies: focus vooral op ${worst.name}; daar zit waarschijnlijk de meeste winst.`;
  return "AI advies: vul eerst je cijfers in, dan wordt dit persoonlijker.";
}
function retakeSuggestion(exam, fails, worst) {
  const candidates = [...fails.filter((item) => item.hasCe), ...(worst?.hasCe ? [worst] : [])].filter(Boolean);
  const unique = [...new Map(candidates.map((item) => [item.name, item])).values()];
  if (!unique.length) return "Geen duidelijke herkansing nodig op basis van de ingevulde cijfers.";
  const pick = unique.sort((a, b) => a.final - b.final)[0];
  return `Herkans ${pick.name} voor hoogste winst.`;
}
function renderGradeChart(items) {
  const chart = $("#grade-chart");
  if (!chart) return;
  chart.replaceChildren();
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = `chart-row ${item.final < 6 ? "danger" : "good"}`;
    row.innerHTML = `<span>${item.name}</span><div><b style="width:${Math.max(5, item.final * 10)}%"></b></div><strong>${item.final}</strong>`;
    chart.append(row);
  });
}
function renderCompareChart(items) {
  const chart = $("#se-ce-chart");
  if (!chart) return;
  chart.replaceChildren();
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "compare-row";
    row.innerHTML = `<span>${item.name}</span><div class="compare-bars"><i style="width:${item.se * 10}%">SE ${fmt(item.se)}</i><b style="width:${item.ce * 10}%">CE ${fmt(item.ce)}</b></div>`;
    chart.append(row);
  });
}
function renderDistributionChart(items) {
  const chart = $("#distribution-chart");
  if (!chart) return;
  chart.replaceChildren();
  const buckets = Array.from({ length: 10 }, (_, index) => ({ grade: index + 1, count: 0 }));
  items.forEach((item) => {
    if (item.final !== null) buckets[Math.max(0, Math.min(9, item.final - 1))].count += 1;
  });
  const max = Math.max(1, ...buckets.map((item) => item.count));
  buckets.forEach((bucket) => {
    const bar = document.createElement("div");
    bar.className = bucket.grade < 6 ? "distribution-bar danger" : "distribution-bar good";
    bar.innerHTML = `<span>${bucket.grade}</span><b style="height:${Math.max(6, (bucket.count / max) * 100)}%"></b><strong>${bucket.count}</strong>`;
    chart.append(bar);
  });
}
function renderRiskList(data, worst) {
  const list = $("#risk-list");
  if (!list) return;
  list.replaceChildren();
  const risks = [];
  if (data.invalidSubjects?.length) risks.push(["error", "Ongeldige cijfers", "Een cijfer moet tussen 1 en 10 liggen."]);
  if (Number.isFinite(data.ceAvg) && data.ceAvg < 5.5) risks.push(["error", "CE gemiddelde", `CE staat op ${fmt(data.ceAvg, 2)} en moet 5,50 zijn.`]);
  if (data.coreFails?.length) risks.push(["warning", "Kernvakken", `${data.coreFails.map((item) => item.name).join(", ")} vraagt aandacht.`]);
  if (worst) risks.push([worst.final < 6 ? "error" : "good", "Meest kritisch vak", `${worst.name} staat op ${worst.final}.`]);
  if (!risks.length) risks.push(["good", "Geen groot risico", "Vul cijfers in of blijf je marge bewaken."]);
  risks.slice(0, 4).forEach(([type, title, text]) => {
    const item = document.createElement("div");
    item.className = `risk-item ${type}`;
    item.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
    list.append(item);
  });
}
function renderCollapsedSubjects(subjects) {
  const list = $("#collapsed-subject-list");
  if (!list) return;
  list.replaceChildren();
  subjects.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = `${item.name}${item.core ? " · Kernvak" : ""}`;
    list.append(chip);
  });
}
function setText(selector, text) {
  const el = $(selector);
  if (el) el.textContent = text;
}
function animateChanceCircle(chance) {
  const circle = $("#chance-circle");
  if (!circle) return;
  const current = Number.parseFloat(circle.dataset.chance || "0");
  const target = Math.max(0, Math.min(100, chance));
  const start = performance.now();
  const duration = 520;
  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = current + (target - current) * eased;
    circle.style.setProperty("--score", `${value * 3.6}deg`);
    if (progress < 1) requestAnimationFrame(frame);
    else circle.dataset.chance = String(target);
  }
  requestAnimationFrame(frame);
}
function printExport(selector, label) {
  const button = $(selector);
  const original = button?.textContent || "Export";
  if (button) button.textContent = label;
  window.setTimeout(() => {
    window.print();
    if (button) window.setTimeout(() => button.textContent = original, 900);
  }, 80);
}
async function shareResult() {
  const text = latestDashboardText;
  try {
    if (navigator.share) {
      await navigator.share({ title: "Mijn examencheck", text });
      return;
    }
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    setText("#share-result", "Gekopieerd");
    window.setTimeout(() => setText("#share-result", "Deel je resultaat"), 1400);
  } catch {
    setText("#share-result", "Niet gelukt");
    window.setTimeout(() => setText("#share-result", "Deel je resultaat"), 1400);
  }
}
function updateCeProgress(value) {
  const label = ceProgressLabel;
  const bar = ceProgressBar;
  const visibleLabel = fmt(value, 2);
  const percent = Number.isFinite(value) ? Math.max(0, Math.min(100, (value / 10) * 100)) : 0;
  const stateClass = value >= 5.5 ? "is-good" : Number.isFinite(value) ? "is-low" : "";
  if (label && bar) {
    label.textContent = visibleLabel;
    bar.style.width = `${percent}%`;
    bar.className = stateClass;
  }
  if (topCeAvg && topCeBar) {
    topCeAvg.textContent = visibleLabel;
    topCeBar.style.width = `${percent}%`;
    topCeBar.className = stateClass;
  }
}
function applyTheme() {
  document.documentElement.classList.toggle("dark-mode", state.darkMode);
  document.body.classList.toggle("dark-mode", state.darkMode);
  themeToggle.textContent = state.darkMode ? "Lichte modus" : "Donkere modus";
  themeToggle.setAttribute("aria-pressed", String(state.darkMode));
}
function toggleTheme() {
  state.darkMode = !state.darkMode;
  applyTheme();
  saveState();
}
function fillExample() {
  rowsEl.querySelectorAll("tr").forEach((row) => {
    const name = row.dataset.subject;
    const hasCe = row.dataset.hasCe === "true";
    const assessment = row.dataset.assessment;
    if (assessment === "ovg") {
      row.querySelector(".ovg").value = "V";
      return;
    }
    const se = row.querySelector(".se");
    const ce = row.querySelector(".ce");
    se.value = name === "Combinatiecijfer" ? "7,0" : row.dataset.core === "true" ? "6,1" : "6,8";
    if (hasCe) ce.value = row.dataset.core === "true" ? "6,0" : "6,6";
  });
  state.resultRequested = true;
  saveCurrentGrades();
  confettiReady = true;
  calculate();
  inlineResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function launchConfetti() {
  const container = $("#confetti");
  if (!container) return;
  container.replaceChildren();
  const colors = ["#007c7c", "#009999", "#22c55e", "#f59e0b", "#dff5f3"];
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    container.append(piece);
  }
  window.setTimeout(() => container.replaceChildren(), 1800);
}
init();












