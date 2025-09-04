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

function checkGuest() {
  const inputName = document.getElementById("guestName").value.trim();
  const seats = guestList[inputName];

  if (seats) {
    showRSVPForm(inputName, seats);
  } else {
    alert("Sorry, your name is not on the guest list.");
  }
}

function showRSVPForm(guestName, seats) {
  const formBox = document.getElementById("form-box");
  let fields = "";

  if (seats > 1) {
    fields += `<input type="text" id="guest-1" value="${guestName}" readonly />`;
    for (let i = 2; i <= seats; i++) {
      fields += `<input type="text" id="guest-${i}" placeholder="Guest ${i} Name (optional)" />`;
    }
  }

  formBox.innerHTML = `
    <h2>Hello, ${guestName}!</h2>
    <p>You have <strong>${seats}</strong> seat${seats > 1 ? "s" : ""} reserved.</p>
    <form id="rsvp-form">
      ${fields}
      <button type="button" onclick="submitRSVP('${guestName}', ${seats})">Confirm Attendance</button>
    </form>
    <div id="message"></div>
  `;
}

function submitRSVP(guestName, seats) {
  let attendees = [];

  if (seats === 1) {
    attendees.push(guestName); // auto-add solo guest
  } else {
    for (let i = 1; i <= seats; i++) {
      const field = document.getElementById(`guest-${i}`);
      if (field && field.value.trim()) {
        attendees.push(field.value.trim());
      }
    }
  }

  const message = document.getElementById("message");
  message.innerHTML = `✅ Thank you, ${guestName}! We saved your RSVP for ${attendees.length} guest(s).`;

  // 🔗 Send data to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbxCLI-6iddHLx9ni3goQWXRfyXDDqIZyEefgvCjB1RYB_lYHS9bAN7rMO50Hi52bBnyFQ/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mainGuest: guestName,
      seatsAllocated: seats,
      attendees: attendees
    })
  });
}
