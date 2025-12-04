document.addEventListener('DOMContentLoaded', function(){
    
  // --- 1. Mobile Menu Fix (Global) ---
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if(toggle){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
  }

  // --- 2. Countdown Timer Logic (Global) ---
  // We check if the element exists first to avoid errors on pages without the timer
  const countdownEl = document.getElementById("countdown");
  
  if (countdownEl || document.getElementById("days")) {
      const electionDate = new Date("December 6, 2025 08:00:00").getTime();
      
      function updateCountdown() {
          const now = new Date().getTime();
          const distance = electionDate - now;

          if (distance < 0) {
              if(countdownEl) countdownEl.innerHTML = "ELECTION DAY!";
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
  }


  // --- 3. EMAILJS HANDLING (Safe Mode) ---
  // This check prevents the script from crashing on pages that don't have EmailJS loaded
  if (typeof emailjs !== 'undefined') {
      
      emailjs.init("DXO1Ea2PLN3BDEyRO"); 

      // PLEDGE FORM HANDLING
      const pledgeForm = document.getElementById('pledgeForm');
      
      if(pledgeForm){
        pledgeForm.addEventListener('submit', function(e){
          e.preventDefault(); 
          
          const btn = document.getElementById('submitBtn');
          const originalText = btn.innerText;
          
          btn.innerText = "Sending...";
          btn.disabled = true;

          const serviceID = "service_ojm8ydg";
          const templateID = "template_07hpz0s";

          emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
              btn.innerText = "Pledge Confirmed!";
              btn.style.backgroundColor = "#1B8F3A"; 
              alert('Thank you! A confirmation email has been sent.');
              pledgeForm.reset();
              
              setTimeout(() => {
                  btn.innerText = originalText;
                  btn.style.backgroundColor = "";
                  btn.disabled = false;
              }, 3000);

            }, (err) => {
              btn.innerText = originalText;
              btn.disabled = false;
              alert('Failed to send pledge. Please check your internet connection.');
              console.log(JSON.stringify(err));
            });
        });
      }
  }

  // --- 4. Pledge Count (Optional/Hidden) ---
  const countEl = document.getElementById('pledgeCount');
  if(countEl) {
      const pledges = JSON.parse(localStorage.getItem('pledges') || '[]');
      countEl.innerText = pledges.length;
  }
});