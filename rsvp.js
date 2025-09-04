// Guest list with seat allocation
const guestList = {
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

// Function triggered when clicking "Check"
function checkGuest() {
  alert("✅ The button works!");
}
  const name = document.getElementById("guestName").value.trim();
  const seatInfo = document.getElementById("seatInfo");
  const rsvpForm = document.getElementById("rsvpForm");
  const attendeeInputs = document.getElementById("attendeeInputs");
  const message = document.getElementById("message");

  message.textContent = "";
  attendeeInputs.innerHTML = "";

  if (guestList[name] !== undefined) {
    const seats = guestList[name];
    seatInfo.textContent = `${name}, you have ${seats} reserved seat${seats > 1 ? "s" : ""}.`;
    rsvpForm.classList.remove("hidden");

    if (seats > 1) {
      for (let i = 1; i <= seats; i++) {
        attendeeInputs.innerHTML += `
          <input type="text" id="attendee${i}" placeholder="Guest ${i} Name" required>
        `;
      }
    } else {
      // 1 seat → auto-fill the single guest
      attendeeInputs.innerHTML = `<input type="text" id="attendee1" value="${name}" readonly>`;
    }
  } else {
    seatInfo.textContent = "Sorry, your name was not found on the guest list.";
    rsvpForm.classList.add("hidden");
  }
}

// Function triggered when clicking "Submit RSVP"
function submitRSVP() {
  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const message = document.getElementById("message");

  if (guestList[name] === undefined) {
    message.textContent = "Invalid guest name.";
    return;
  }

  const seats = guestList[name];
  const attendees = [];
  for (let i = 1; i <= seats; i++) {
    const guestName = document.getElementById(`attendee${i}`).value.trim();
    attendees.push(guestName || `Guest ${i}`);
  }

  // Payload to send to Google Sheets later
  const payload = {
    mainGuest: name,
    seatsAllocated: seats,
    attendees: attendees,
    attendance: attendance
  };

  console.log("Submitting RSVP:", payload);

  // TODO: Replace with your Google Apps Script Web App URL
  fetch("https://script.google.com/macros/s/AKfycbxCLI-6iddHLx9ni3goQWXRfyXDDqIZyEefgvCjB1RYB_lYHS9bAN7rMO50Hi52bBnyFQ/exec", {
    method: "POST",
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    message.textContent = "RSVP submitted successfully! Thank you 💖";
  })
  .catch(err => {
    console.error(err);
    message.textContent = "Error submitting RSVP. Please try again.";
  });
}
