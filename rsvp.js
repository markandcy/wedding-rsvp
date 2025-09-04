/* ======== GUEST LIST ======== */
const guestList = {
  "Cyrel Anne Soriano": 1,
  "Mark Anthony Pena": 1,
  "Antonio Reyes": 2,
  "Jojo Agot": 2,
  "Daniel Herrera": 2,
  "Mykel Mabag": 2,
  "Menchie Dionisio": 2,
  "Godofredo Paguio": 2,
  "Bong Navarro": 2,
  "Peter Almario": 1,
  "Aira Camille Soriano": 6,
  "Trish Anne Castro": 2,
  "Veronica Samson": 2,
  "Vernelee Panlaqui": 1,
  "Dianne Christine Delos Santos": 1,
  "Monviel Perez": 1,
  "Jezariah Garcia": 1,
  "Jovith Cinco": 1,
  "Jay Punongbayan": 1,
  "Kaye Pantaleon": 3,
  "Esmie Pena": 5,
  "Orpha Jamieh Cabatbat": 1,
  "Christine Guzarin": 1,
  "Roneth Pacinio": 1,
  "Crystal Duron": 1,
  "Justine Dela Cruz": 2,
  "Rezan Nullas": 1,
  "Manuel Konrad Carlos": 1,
  "Alyssa Monica Pingol": 1,
  "Erickson Paul Villacorta": 1,
  "Patrick Manahan": 1,
  "Gelo Siguenza": 2,
  "Angelina Gomez": 4,
  "Deborah De Peralta": 3,
  "Arthur Lim": 2,
  "Emily Ivy Cruz": 4,
  "Delson De Peralta": 2,
  "Dave De Peralta": 2,
  "Danny Abenes": 2,
  "Gener Abenes": 2,
  "Jojo Paguio": 2,
  "Kezia Mariel Pena": 4,
  "Marner Santos": 2,
  "Lex Paloma": 2,
  "Nick Famudulan": 2,
  "Argel Catarus": 1,
  "Louie Gavilano": 1,
  "Eddie Sinnung": 1,
  "Abel Josef": 1,
  "Carissa Pilao": 1,
  "Karmela Grace Marquez": 1,
  "Westy Policarpio": 1,
  "Ron Seguismundo": 2,
  "Emman Tablanza": 2,
  "Dada Belen": 2,
  "Mica Sanchez": 2,
  "Chok Amaro": 2,
  "Raf Dela Cruz": 1,
  "Erika Laquindanum": 1,
  "Jesusa Sabire": 2,
  "Katrina Villena": 2,
  "Vanity Ro-an Calamigan": 2,
  "Karen Wella Sebido": 1,
  "Dana Constante": 2,
  "Ellaine Mendoza": 2,
  "Pam Torres": 2,
  "Marvic Gatchalian": 1,
  "Kidong Ebajo": 1,
  "Angel Alegre": 1,
  "Joshua Roi Quijano": 1,
  "Riri Bonifacio": 1,
  "Ferdie del Valle": 2,
  "Josh Aquino": 2,
  "Zajay": 1,
  "Ella": 1
};

/* Build case-insensitive lookup */
const nameLookup = {};
Object.keys(guestList).forEach(n => nameLookup[n.toLowerCase()] = n);

const el = id => document.getElementById(id);

/* Show errors */
function showError(err) {
  console.error(err);
  const debug = el("debug");
  if (debug) {
    debug.style.display = "block";
    debug.textContent = `⚠️ Script error:\n${err.stack || err}`;
  }
}

/* ======== AUTOCOMPLETE ======== */
window.showSuggestions = function () {
  const input = el("guestName").value.toLowerCase();
  const suggestionBox = el("suggestions");
  suggestionBox.innerHTML = "";

  if (input.length < 2) return;

  const matches = Object.keys(guestList).filter(name =>
    name.toLowerCase().includes(input)
  );

  matches.forEach(name => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = name;
    div.onclick = () => {
      el("guestName").value = name;
      suggestionBox.innerHTML = "";
    };
    suggestionBox.appendChild(div);
  });
};

/* ======== CHECK BUTTON ======== */
window.checkGuest = function () {
  try {
    const raw = el("guestName").value.trim();
    const key = nameLookup[raw.toLowerCase()];
    const seatInfo = el("seatInfo");
    const rsvpForm = el("rsvpForm");
    const attendeeInputs = el("attendeeInputs");
    const message = el("message");

    message.textContent = "";
    attendeeInputs.innerHTML = "";

    if (!key) {
      seatInfo.textContent = "❌ Sorry, your name was not found on the guest list.";
      rsvpForm.classList.add("hidden");
      return;
    }

    const seats = guestList[key];
    seatInfo.textContent = `${key}, you have ${seats} reserved seat${seats > 1 ? "s" : ""}.`;
    rsvpForm.classList.remove("hidden");

    if (seats === 1) {
      attendeeInputs.innerHTML = `<p>(No extra names needed — RSVP is just for you ✅)</p>`;
    } else {
      let html = `<input type="text" id="attendee1" value="${key}" readonly>`;
      for (let i = 2; i <= seats; i++) {
        html += `<input type="text" id="attendee${i}" placeholder="Guest ${i} Name">`;
      }
      attendeeInputs.innerHTML = html;
    }
  } catch (err) {
    showError(err);
  }
};

/* ======== SUBMIT BUTTON ======== */
window.submitRSVP = function () {
  try {
    const raw = el("guestName").value.trim();
    const key = nameLookup[raw.toLowerCase()];
    const attendance = el("attendance").value;
    const message = el("message");

    if (!key) {
      message.textContent = "❌ Error: Guest not found.";
      return;
    }

    const seats = guestList[key];
    const attendees = [];

    if (seats === 1) {
      attendees.push(key);
    } else {
      for (let i = 1; i <= seats; i++) {
        const input = el(`attendee${i}`);
        if (input && input.value.trim() !== "") attendees.push(input.value.trim());
      }
      if (attendees.length === 0) attendees.push(key);
    }

    // 🔗 Replace this with your Google Apps Script URL
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwE-IRcY0olWIleWaDKys0j88uhN_3zACe73YvdwjsKMzuENNKoE3W67oxLT8No83KMgg/exec";
    }

    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guestName: key,
        attendance,
        attendees
      })
    }).then(() => {
      message.textContent = "✅ RSVP submitted successfully! Thank you 💕";
      el("rsvpForm").classList.add("hidden");
    }).catch((err) => {
      showError(err);
      message.textContent = "⚠️ There was an error submitting your RSVP. Please try again.";
    });

  } catch (err) {
    showError(err);
  }
};
