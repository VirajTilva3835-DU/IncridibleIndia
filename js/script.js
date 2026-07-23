document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById("themeSwitch");


  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
});

// === Interactive Travel Trips Planner JS ===

// Destinations list
const destinations = {
  north: {
    historic: ["Taj Mahal (Agra)", "Red Fort (Delhi)", "Qutub Minar (Delhi)", "India Gate (Delhi)"],
    nature: ["Shimla (Himachal)", "Manali (Himachal)", "Nainital (Uttarakhand)", "Rishikesh (Uttarakhand)"],
    spiritual: ["Golden Temple (Amritsar)", "Vaishno Devi (J&K)", "Varanasi Ghats (UP)", "Haridwar (Uttarakhand)"],
    wildlife: ["Jim Corbett National Park", "Hemis National Park (Ladakh)"]
  },
  west: {
    historic: ["Hawa Mahal (Jaipur)", "Udaipur City Palace", "Jaisalmer Fort", "Ajanta & Ellora Caves"],
    nature: ["Rann of Kutch (Gujarat)", "Mount Abu (Rajasthan)"],
    spiritual: ["Somnath Temple (Gujarat)", "Shirdi Sai Baba Temple"],
    wildlife: ["Gir National Park (Gujarat)", "Ranthambore National Park"]
  },
  east: {
    historic: ["Konark Sun Temple (Odisha)", "Victoria Memorial (Kolkata)", "Jagannath Temple (Puri)"],
    nature: ["Darjeeling (West Bengal)", "Shillong (Meghalaya)", "Chilika Lake (Odisha)"],
    spiritual: ["Kamakhya Temple (Assam)", "Tawang Monastery"],
    wildlife: ["Kaziranga National Park", "Sundarbans National Park"]
  },
  south: {
    historic: ["Mysore Palace (Karnataka)", "Thanjavur Big Temple", "Hampi Ruins (Karnataka)", "Charminar (Hyderabad)"],
    nature: ["Munnar (Kerala)", "Coorg (Karnataka)", "Ooty (Tamil Nadu)"],
    spiritual: ["Meenakshi Temple (Madurai)", "Tirupati Balaji Temple"],
    wildlife: ["Periyar Wildlife Sanctuary", "Bandipur National Park"]
  }
};

// Itinerary Day-by-Day Templates
const itineraryTemplates = {
  historic: {
    days: [
      { title: "Arrival & Historic Walking Tour", desc: "Arrive at your heritage destination, check into your stay, and spend the afternoon on a guided walking tour of ancient lanes, markets, and regional architecture." },
      { title: "Signature Monument Exploration", desc: "Spend the day exploring the primary heritage landmark. Hire a local guide to learn about the intricate craftsmanship, royal legacy, and architectural history." },
      { title: "Museums & Local Artisan Workshops", desc: "Visit local museums containing royal collections and antique artifacts. Spend the evening learning from local craftspeople preserving century-old arts." },
      { title: "Fortresses & Light Show", desc: "Climb up to the dominant fortress overlooking the city. In the evening, attend a spectacular sound and light show narrating historical battles and legends." },
      { title: "Traditional Culinary Trail", desc: "Embark on an guided tasting tour to sample age-old recipes, historic street food joints, and learn the culinary histories of the region." },
      { title: "Day Excursion to Archaeological Ruins", desc: "Take a day trip to explore nearby cave carvings, stepwells, or ancient archaeological ruins showing early civilizations." },
      { title: "Souvenir Shopping & Departure", desc: "Spend your final morning buying local textiles, handicraft souvenirs, enjoying local tea blends, and preparing for your departure." }
    ],
    tips: [
      "Hire only government-authorized guides with official license cards.",
      "Wear comfortable walking shoes since historic sites require significant walking.",
      "Monuments often charge camera entry fees; prepare cash or scan official UPI."
    ]
  },
  nature: {
    days: [
      { title: "Arrival in Scenic Valleys", desc: "Arrive amidst beautiful landscapes, check into your scenic room/cabin, and spend the evening enjoying mountain views and a relaxing stroll." },
      { title: "Lake Exploration & Boat Ride", desc: "Visit the local lakes of the region. Enjoy a tranquil early morning boat ride, walk along the lakeside walkway, and capture panoramic mountain views." },
      { title: "Nature Trail & Sunrise Trek", desc: "Wake up early for a sunrise trek to a local peak. Spend the day walking through dense pine forests or meadows, enjoying the local flora and bird life." },
      { title: "Cable Car Ride & Hilltop Viewpoints", desc: "Take a cable car ride up to a famous viewpoint for views of snowy peaks, deep green valleys, and beautiful horizons." },
      { title: "Waterfalls & Adventure Activities", desc: "Excursion to a scenic local waterfall. Try soft adventure activities like ziplining, river rafting, or mountain biking if available." },
      { title: "Leisure Exploration of Local Village", desc: "Spend a relaxing day visiting an organic farming community village, learning about local lifestyle, and eating fresh, locally grown food." },
      { title: "Local Market & Departure", desc: "Shop for locally-grown tea leaves, seasonal fruits, spices, or homemade woolens, then check out and start your journey back." }
    ],
    tips: [
      "Carry light woolens or windcheaters as high altitudes can experience quick weather changes.",
      "Keep dynamic weather forecasts in mind, especially before planning treks or cable cars.",
      "Respect nature - carry reusable bottles and avoid single-use plastics."
    ]
  },
  spiritual: {
    days: [
      { title: "Arrival & Riverbank Walk", desc: "Arrive at the holy city, check into your ashram or hotel, and take a peaceful walk along the sacred river ghats or temple pathways." },
      { title: "Temple Darshan & Evening Prayer Ceremony", desc: "Attend early morning temple prayers. In the evening, secure a spot at the ghats to witness a grand, sensory prayer ritual filled with lamps and chanting." },
      { title: "Meditation & Yoga Session", desc: "Participate in a guided morning meditation and yoga session led by spiritual instructors to experience traditional Indian wellness." },
      { title: "Sacred Walking Loop", desc: "Embark on a sacred walking pilgrimage loop (Parikrama) visiting minor shrines, ancient tree sites, and learning regional folklore." },
      { title: "Ashram & Philosophy Session", desc: "Visit a local ashram, engage with saints or scholars, and attend a session on Indian philosophy and spiritual culture." },
      { title: "Community Service & Feast", desc: "Volunteer at the community kitchen (Langar/Annadanam). Help prepare meals and participate in the grand community vegetarian feast." },
      { title: "Morning prayers & Departure", desc: "Participate in a quiet early morning chanting class, buy sacred offerings or incense, and check out for your departure." }
    ],
    tips: [
      "Dress modestly; keep shoulders and knees covered when entering religious structures.",
      "Footwear must be left at temple gates; socks are highly recommended for hot stone floors.",
      "Always ask for permission before taking photos of ascetics, devotees, or inside holy shrines."
    ]
  },
  wildlife: {
    days: [
      { title: "Arrival at Sanctuary Lodge", desc: "Arrive at your jungle lodge, check in, and join an evening slideshow orientation hosted by a naturalist detailing the park's wildlife species." },
      { title: "Early Morning & Afternoon Safaris", desc: "Board open safaris for forest exploration. Search for apex predators, deer herds, and hornbills while observing calls and tracks." },
      { title: "Guided Nature Walk", desc: "Take a walking safari with an armed forest ranger along the buffer zones. Learn about pugmarks, insects, trees, and minor trails." },
      { title: "Nature Center & Tribal Exhibit", desc: "Visit the interpretive nature display and local community museum to learn about tribal co-existence and national conservation programs." },
      { title: "Lakeside Sunset Watching", desc: "Drive to a scenic lake reservoir bordering the sanctuary where wildlife frequently gathers for water at sunset." },
      { title: "Village Cycle Tour & Conservation Meet", desc: "Take a bicycle ride through local buffer zone villages, visiting local handicraft centers and discussing forest protection with locals." },
      { title: "Final Morning Safari & Departure", desc: "Take a last safari drive, enjoy a hearty breakfast, pack your belongings, and start your return journey." }
    ],
    tips: [
      "Wear earthy colors (khaki, olive green, beige) to avoid drawing wildlife attention.",
      "Maintain absolute silence inside the sanctuary and never discard waste or food scraps.",
      "Safari slots are strictly limited; book park entry passes online several weeks in advance."
    ]
  }
};

// Budget category rates per day (in INR)
const budgetRates = {
  eco: { transport: 500, stay: 1000, food: 400, activities: 300 },
  mid: { transport: 1500, stay: 3500, food: 1000, activities: 800 },
  lux: { transport: 4000, stay: 10000, food: 2500, activities: 2000 }
};

// State trackers for steps
let currentStep = 1;

// Next step navigation
function nextStep(step) {
  // Validate current panel selections before proceeding
  if (step === 1) {
    const region = document.querySelector('input[name="plannerRegion"]:checked');
    if (!region) return alert("Please select a region to explore!");
  } else if (step === 2) {
    const interest = document.querySelector('input[name="plannerInterest"]:checked');
    if (!interest) return alert("Please select your travel vibe!");
  } else if (step === 3) {
    const duration = document.querySelector('input[name="plannerDuration"]:checked');
    if (!duration) return alert("Please select a trip duration!");
  }

  // Update DOM panels
  document.getElementById(`step-panel-${step}`).style.display = "none";
  document.getElementById(`step-panel-${step + 1}`).style.display = "block";
  
  // Update Stepper visually
  document.getElementById(`step-ind-${step + 1}`).classList.add("active");
  document.getElementById(`step-ind-${step}`).classList.add("completed");
  
  currentStep = step + 1;
}

// Previous step navigation
function prevStep(step) {
  document.getElementById(`step-panel-${step}`).style.display = "none";
  document.getElementById(`step-panel-${step - 1}`).style.display = "block";
  
  document.getElementById(`step-ind-${step}`).classList.remove("active");
  document.getElementById(`step-ind-${step - 1}`).classList.remove("completed");
  document.getElementById(`step-ind-${step - 1}`).classList.add("active");
  
  currentStep = step - 1;
}

// Reset the planner to initial state
function restartPlanner() {
  document.getElementById("plannerResults").style.display = "none";
  document.getElementById("plannerForm").style.display = "block";
  document.getElementById("step-panel-1").style.display = "block";
  
  // Hide all other panels
  for (let i = 2; i <= 4; i++) {
    document.getElementById(`step-panel-${i}`).style.display = "none";
  }
  
  // Reset stepper elements
  const steps = document.querySelectorAll(".step");
  steps.forEach((s, idx) => {
    if (idx === 0) {
      s.className = "step active";
    } else {
      s.className = "step";
    }
  });
  
  currentStep = 1;
  document.getElementById("plannerForm").reset();
  
  // Scroll to planner top
  document.getElementById("travelTripsPlanner").scrollIntoView({ behavior: "smooth" });
}

// Attach event listeners when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const plannerForm = document.getElementById("plannerForm");
  const next1 = document.getElementById("btn-next-1");
  const next2 = document.getElementById("btn-next-2");
  const next3 = document.getElementById("btn-next-3");
  const back2 = document.getElementById("btn-back-2");
  const back3 = document.getElementById("btn-back-3");
  const back4 = document.getElementById("btn-back-4");
  const restartBtn = document.getElementById("btn-restart-planner");

  if (next1) next1.addEventListener("click", () => nextStep(1));
  if (next2) next2.addEventListener("click", () => nextStep(2));
  if (next3) next3.addEventListener("click", () => nextStep(3));
  if (back2) back2.addEventListener("click", () => prevStep(2));
  if (back3) back3.addEventListener("click", () => prevStep(3));
  if (back4) back4.addEventListener("click", () => prevStep(4));
  if (restartBtn) restartBtn.addEventListener("click", restartPlanner);

  if (plannerForm) {
    plannerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const regionVal = document.querySelector('input[name="plannerRegion"]:checked').value;
      const interestVal = document.querySelector('input[name="plannerInterest"]:checked').value;
      const durationVal = parseInt(document.querySelector('input[name="plannerDuration"]:checked').value, 10);
      const budgetVal = document.querySelector('input[name="plannerBudget"]:checked').value;
      
      // 1. Set text badges
      const regionNames = { north: "North India", west: "West India", east: "East India", south: "South India" };
      const vibeNames = { historic: "🏛️ Cultural & Historic", nature: "🏞️ Scenic Nature", spiritual: "🛕 Devotional", wildlife: "🐅 Wildlife Safari" };
      const budgetNames = { eco: "🎒 Economy Budget", mid: "🚕 Moderate Comfort", lux: "👑 Luxury Explorer" };
      
      document.getElementById("resRegion").textContent = regionNames[regionVal];
      document.getElementById("resVibe").textContent = vibeNames[interestVal];
      document.getElementById("resDuration").textContent = `📅 ${durationVal} Days`;
      document.getElementById("resBudget").textContent = budgetNames[budgetVal];
      
      // 2. Load places pills
      const placesList = destinations[regionVal][interestVal] || [];
      const resPlacesUl = document.getElementById("resPlaces");
      resPlacesUl.innerHTML = placesList.map(place => `<li>${place}</li>`).join("");
      
      // 3. Generate Day-by-Day timeline
      const template = itineraryTemplates[interestVal];
      const timelineContainer = document.getElementById("itineraryTimeline");
      timelineContainer.innerHTML = "";
      
      for (let dayNum = 1; dayNum <= durationVal; dayNum++) {
        let dayData;
        if (durationVal === 3) {
          if (dayNum === 1) dayData = template.days[0];
          else if (dayNum === 2) dayData = template.days[1];
          else dayData = template.days[6]; // departure
        } else if (durationVal === 7) {
          dayData = template.days[dayNum - 1] || template.days[0];
        } else {
          // 14 days logic
          const idx = (dayNum - 1) % template.days.length;
          dayData = { ...template.days[idx] };
          dayData.title = `Day ${dayNum}: ${dayData.title.split(": ").pop()}`;
        }
        
        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";
        timelineItem.innerHTML = `
          <div class="timeline-day"></div>
          <div class="timeline-content">
            <div class="timeline-title">Day ${dayNum} — ${dayData.title}</div>
            <div class="timeline-desc">${dayData.desc}</div>
          </div>
        `;
        timelineContainer.appendChild(timelineItem);
      }
      
      // 4. Calculate and render budget table
      const rates = budgetRates[budgetVal];
      const transportCost = rates.transport * durationVal;
      const stayCost = rates.stay * durationVal;
      const foodCost = rates.food * durationVal;
      const activitiesCost = rates.activities * durationVal;
      const totalCost = transportCost + stayCost + foodCost + activitiesCost;
      
      const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
      
      const budgetBody = document.getElementById("budgetTableBody");
      budgetBody.innerHTML = `
        <tr>
          <td>🚗 Local Travel & Transfers</td>
          <td>${formatCurrency(transportCost)}</td>
        </tr>
        <tr>
          <td>🏨 Stays & Accommodation</td>
          <td>${formatCurrency(stayCost)}</td>
        </tr>
        <tr>
          <td>🍽️ Meals & Dining Experience</td>
          <td>${formatCurrency(foodCost)}</td>
        </tr>
        <tr>
          <td>🎟️ Sightseeing, Permits & Guided Activities</td>
          <td>${formatCurrency(activitiesCost)}</td>
        </tr>
      `;
      document.getElementById("totalEstimatedCost").textContent = formatCurrency(totalCost);
      
      // 5. Fill specific local tips
      const tipsUl = document.getElementById("itinerarySpecificTips");
      tipsUl.innerHTML = template.tips.map(tip => `<li>${tip}</li>`).join("");
      
      // 6. Transition display view
      plannerForm.style.display = "none";
      const resultsDiv = document.getElementById("plannerResults");
      resultsDiv.style.display = "block";
      resultsDiv.scrollIntoView({ behavior: "smooth" });
    });
  }
});
