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

let currentGuest = null;

function checkGuest() {
  const name = document.getElementById("guestName").value.trim();
  if (guestList[name]) {
    currentGuest = name;
    document.getElementById("seatInfo").innerText = 
      `Welcome ${name}! You have ${guestList[name]} seat(s) reserved.`;
    generateAttendeeInputs(guestList[name]);
    document.getElementById("rsvpForm").classList.remove("hidden");
    document.getElementById("message").innerText = "";
  } else {
    document.getElementById("message").innerText = 
      "Name not found. Please contact Mark & Cy for assistance.";
  }
}

function generateAttendeeInputs(seats) {
  const container = document.getElementById("attendeeInputs");
  container.innerHTML = "";
  for (let i = 0; i < seats; i++) {
    container.innerHTML += 
      `<input type="text" placeholder="Attendee ${i+1}" class="attendee">`;
  }
}

function submitRSVP() {
  if (!currentGuest) return;
  
  const attendance = document.getElementById("attendance").value;
  const attendees = Array.from(document.querySelectorAll(".attendee"))
    .map(input => input.value.trim()).filter(v => v);

  fetch("https://script.google.com/macros/s/AKfycbwhxMOykaFsjmNAllQkkxhu9rg021cv3536cks5Yz_F5e3ywkx6s3zvqlZu8tmzgLgcnw/exec", {
    method: "POST",
    body: JSON.stringify({
      guestName: currentGuest,
      attendance: attendance,
      attendees: attendees
    })
  })
  .then(() => {
    document.getElementById("message").innerText = "RSVP submitted! Thank you 💕";
    document.getElementById("rsvpForm").classList.add("hidden");
  })
  .catch(() => {
    document.getElementById("message").innerText = "Error submitting RSVP. Try again.";
  });
}
