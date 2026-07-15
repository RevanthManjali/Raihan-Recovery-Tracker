// =============================
// Raihan Recovery Tracker
// Part 1
// =============================

// Today's Date

const todayDate = document.getElementById("todayDate");

const surgeryDate = document.getElementById("surgeryDate");

const recoveryDay = document.getElementById("recoveryDay");

const progressBar = document.getElementById("progressBar");

const score = document.getElementById("score");

// Show Today's Date

const today = new Date();

todayDate.innerHTML =
today.toDateString();

// Calculate Recovery Day

function calculateRecovery(){

if(!surgeryDate.value) return;

let surgery = new Date(surgeryDate.value);

let difference =
today - surgery;

let days =
Math.floor(difference/(1000*60*60*24))+1;

if(days<1)
days=1;

if(days>30)
days=30;

recoveryDay.innerHTML =
"Day "+days+" of 30";

let percent =
(days/30)*100;

progressBar.style.width =
percent+"%";

score.innerHTML =
"Recovery Score<br>"+Math.round(percent)+"%";

}

// Update when surgery date changes

surgeryDate.addEventListener(
"change",
calculateRecovery
);
// =============================
// Medicine Tracker
// =============================

const medicineName = document.getElementById("medicineName");
const medicineDose = document.getElementById("medicineDose");
const medicineTime = document.getElementById("medicineTime");
const foodTiming = document.getElementById("foodTiming");

const addMedicine = document.getElementById("addMedicine");
const medicineList = document.getElementById("medicineList");

let medicines = [];

function displayMedicines(){

medicineList.innerHTML="";

if(medicines.length===0){

medicineList.innerHTML="<p>No medicines added.</p>";

return;

}

medicines.forEach((medicine,index)=>{

let div=document.createElement("div");

div.className="card";

div.innerHTML=`

<h4>${medicine.name}</h4>

<p><strong>Dosage:</strong> ${medicine.dose}</p>

<p><strong>Time:</strong> ${medicine.time}</p>

<p><strong>${medicine.food}</strong></p>

<label>

<input type="checkbox">

Medicine Taken

</label>

<br><br>

<button onclick="deleteMedicine(${index})">

🗑 Delete

</button>

`;

medicineList.appendChild(div);

});

}

addMedicine.addEventListener("click",()=>{

if(medicineName.value===""){

alert("Enter Medicine Name");

return;

}

medicines.push({

name:medicineName.value,

dose:medicineDose.value,

time:medicineTime.value,

food:foodTiming.value

});

medicineName.value="";

medicineDose.value="";

medicineTime.value="";

foodTiming.selectedIndex=0;

displayMedicines();

});

function deleteMedicine(index){

medicines.splice(index,1);

displayMedicines();

}
// =============================
// Auto Save & Load
// =============================

function saveData(){

localStorage.setItem(
"raihanMedicines",
JSON.stringify(medicines)
);

localStorage.setItem(
"doctorInstructions",
document.getElementById("doctorInstructions").value
);

localStorage.setItem(
"dailyNotes",
document.getElementById("dailyNotes").value
);

localStorage.setItem(
"sleepHours",
document.getElementById("sleepHours").value
);

localStorage.setItem(
"painLevel",
document.getElementById("painLevel").value
);

localStorage.setItem(
"surgeryDate",
surgeryDate.value
);

}

function loadData(){

// Medicines

let savedMedicines=
localStorage.getItem("raihanMedicines");

if(savedMedicines){

medicines=
JSON.parse(savedMedicines);

displayMedicines();

}

// Doctor Instructions

let doctor=
localStorage.getItem("doctorInstructions");

if(doctor){

document.getElementById("doctorInstructions").value=doctor;

}

// Notes

let notes=
localStorage.getItem("dailyNotes");

if(notes){

document.getElementById("dailyNotes").value=notes;

}

// Sleep

let sleep=
localStorage.getItem("sleepHours");

if(sleep){

document.getElementById("sleepHours").value=sleep;

}

// Pain

let pain=
localStorage.getItem("painLevel");

if(pain){

document.getElementById("painLevel").value=pain;

document.getElementById("painValue").innerHTML=pain;

}

// Surgery Date

let surgery=
localStorage.getItem("surgeryDate");

if(surgery){

surgeryDate.value=surgery;

calculateRecovery();

}

}

// Auto Save Events

document.getElementById("doctorInstructions")
.addEventListener("keyup",saveData);

document.getElementById("dailyNotes")
.addEventListener("keyup",saveData);

document.getElementById("sleepHours")
.addEventListener("keyup",saveData);

document.getElementById("painLevel")
.addEventListener("input",()=>{

document.getElementById("painValue").innerHTML=
document.getElementById("painLevel").value;

saveData();

});

surgeryDate.addEventListener(
"change",
saveData
);

// Save medicines after adding

addMedicine.addEventListener(
"click",
saveData
);

// Load everything

loadData();
// =============================
// Recovery Score
// =============================

const dietBoxes = document.querySelectorAll(".diet");
const waterBoxes = document.querySelectorAll(".water");
const exerciseBoxes = document.querySelectorAll(".exercise");

function calculateScore(){

let score = 0;

// Medicines
let medicineTaken =
document.querySelectorAll("#medicineList input[type='checkbox']:checked").length;

score += medicineTaken * 10;

// Diet
dietBoxes.forEach(box=>{
if(box.checked) score += 2;
});

// Water
waterBoxes.forEach(box=>{
if(box.checked) score += 2;
});

// Exercise
exerciseBoxes.forEach(box=>{
if(box.checked) score += 5;
});

// Sleep
let sleep =
parseInt(document.getElementById("sleepHours").value)||0;

if(sleep>=7)
score+=10;

// Pain

let pain =
parseInt(document.getElementById("painLevel").value)||0;

if(pain<=3)
score+=15;
else if(pain<=5)
score+=10;
else if(pain<=7)
score+=5;

if(score>100)
score=100;

document.getElementById("recoveryScore").innerHTML=
score+"%";

document.getElementById("dailyProgress").style.width=
score+"%";

}

// Auto Update

document.querySelectorAll("input").forEach(input=>{

input.addEventListener("change",()=>{

calculateScore();

saveData();

});

});

calculateScore();
// =============================
// Save Checkboxes
// =============================

function saveCheckboxes(){

const data={

diet:[],

water:[],

exercise:[]

};

dietBoxes.forEach(box=>{

data.diet.push(box.checked);

});

waterBoxes.forEach(box=>{

data.water.push(box.checked);

});

exerciseBoxes.forEach(box=>{

data.exercise.push(box.checked);

});

localStorage.setItem(

"checkboxData",

JSON.stringify(data)

);

}

function loadCheckboxes(){

let saved=

JSON.parse(localStorage.getItem("checkboxData"));

if(!saved) return;

dietBoxes.forEach((box,index)=>{

box.checked=saved.diet[index];

});

waterBoxes.forEach((box,index)=>{

box.checked=saved.water[index];

});

exerciseBoxes.forEach((box,index)=>{

box.checked=saved.exercise[index];

});

calculateScore();

}

document.querySelectorAll(".diet,.water,.exercise")

.forEach(box=>{

box.addEventListener("change",()=>{

saveCheckboxes();

calculateScore();

});

});

loadCheckboxes();
// =============================
// Daily Recovery History
// =============================

function getTodayKey(){

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth()+1).padStart(2,"0");

const day = String(today.getDate()).padStart(2,"0");

return `${year}-${month}-${day}`;

}

function saveDailyRecord(){

const key="Recovery_"+getTodayKey();

const record={

date:getTodayKey(),

recoveryScore:
document.getElementById("recoveryScore").innerText,

pain:
document.getElementById("painLevel").value,

sleep:
document.getElementById("sleepHours").value,

doctorInstructions:
document.getElementById("doctorInstructions").value,

notes:
document.getElementById("dailyNotes").value,

medicines:medicines,

diet:[],

water:[],

exercise:[]

};

dietBoxes.forEach(box=>{

record.diet.push(box.checked);

});

waterBoxes.forEach(box=>{

record.water.push(box.checked);

});

exerciseBoxes.forEach(box=>{

record.exercise.push(box.checked);

});

localStorage.setItem(

key,

JSON.stringify(record)

);

}

document.querySelectorAll("input, textarea, select").forEach(item=>{

item.addEventListener("change",saveDailyRecord);

});

saveDailyRecord();
// =============================
// Reset Today's Tracker
// =============================

function resetToday(){

if(!confirm("Reset today's recovery data?"))
return;

document.querySelectorAll("input[type='checkbox']").forEach(box=>{
box.checked=false;
});

document.getElementById("doctorInstructions").value="";

document.getElementById("dailyNotes").value="";

document.getElementById("sleepHours").value="";

document.getElementById("painLevel").value=0;

document.getElementById("painValue").innerHTML=0;

medicines=[];

displayMedicines();

calculateScore();

saveData();

saveCheckboxes();

}
// =============================
// Auto Refresh Progress
// =============================

setInterval(()=>{

calculateRecovery();

calculateScore();

},5000);
// =============================
// Startup
// =============================

window.onload=function(){

loadData();

loadCheckboxes();

calculateRecovery();

calculateScore();

};
