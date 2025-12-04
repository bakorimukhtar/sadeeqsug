document.addEventListener('DOMContentLoaded', function(){
    
  // --- 1. INITIALIZE EMAILJS ---
  // Using your Public Key
  emailjs.init("DXO1Ea2PLN3BDEyRO"); 

  // --- 2. Mobile Menu Fix ---
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if(toggle){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
  }

  // --- 3. Countdown Timer Logic ---
  const electionDate = new Date("December 6, 2025 08:00:00").getTime();
  
  function updateCountdown() {
      const now = new Date().getTime();
      const distance = electionDate - now;

      if (distance < 0) {
          if(document.getElementById("countdown")) document.getElementById("countdown").innerHTML = "ELECTION DAY!";
          return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if(document.getElementById("days")) {
          document.getElementById("days").innerText = days;
          document.getElementById("hours").innerText = hours;
          document.getElementById("minutes").innerText = minutes;
          document.getElementById("seconds").innerText = seconds;
      }
  }
  
  // Run immediately then every second
  setInterval(updateCountdown, 1000);
  updateCountdown();


  // --- 4. PLEDGE FORM HANDLING (EMAILJS) ---
  const pledgeForm = document.getElementById('pledgeForm');
  
  if(pledgeForm){
    pledgeForm.addEventListener('submit', function(e){
      e.preventDefault(); // Stop default reload
      
      const btn = document.getElementById('submitBtn');
      const originalText = btn.innerText;
      
      // Change button to show loading
      btn.innerText = "Sending...";
      btn.disabled = true;

      // Your specific EmailJS IDs
      const serviceID = "service_ojm8ydg";
      const templateID = "template_07hpz0s";

      // Send the form
      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          // SUCCESS
          btn.innerText = "Pledge Confirmed!";
          btn.style.backgroundColor = "#1B8F3A"; // Green
          alert('Thank you! A confirmation email has been sent.');
          pledgeForm.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
              btn.innerText = originalText;
              btn.style.backgroundColor = "";
              btn.disabled = false;
          }, 3000);

        }, (err) => {
          // ERROR
          btn.innerText = originalText;
          btn.disabled = false;
          alert('Failed to send pledge. Please check your internet connection.');
          console.log(JSON.stringify(err));
        });
    });
  }

  // --- 5. Pledge Count (Optional/Hidden) ---
  const countEl = document.getElementById('pledgeCount');
  if(countEl) {
      // Simple visual counter if the element exists in HTML
      const pledges = JSON.parse(localStorage.getItem('pledges') || '[]');
      countEl.innerText = pledges.length;
  }
});