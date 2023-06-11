// Exercise options for the dropdown menu
let exerciseOptions = [
  'Exercise 1',
  'Exercise 2',
  'Exercise 3',
  'Seated Chest Press',
  'added in script.js'
  // Add more exercises here
];

let selectedExercise = exerciseOptions[0];
let selectedWeight = 0;
let selectedReps = 0;

// Function to populate exercise options
function populateExerciseOptions() {
  const exerciseSelect = document.getElementById('exerciseSelect');
  exerciseSelect.innerHTML = ''; // Clear the dropdown menu before populating

  exerciseOptions.forEach((exercise) => {
    const option = document.createElement('option');
    option.value = exercise;
    option.textContent = exercise;
    exerciseSelect.appendChild(option);
  });
}

// Function to handle new set button click
function handleNewSet() {
  // Retrieve the selected exercise
  selectedExercise = document.getElementById('exerciseSelect').value;

  // Retrieve the weight input
  const weightInput = document.getElementById('weightInput');
  selectedWeight = weightInput.value ? parseFloat(weightInput.value) : 0;

  // Retrieve the repetitions input
  const repsInput = document.getElementById('repsInput');
  selectedReps = repsInput.value ? parseInt(repsInput.value) : 0;

  // Store previous set values
  const previousSet = {
    exercise: selectedExercise,
    weight: selectedWeight,
    reps: selectedReps
  };

  // Submit previous set to the server
//This is the new code
//the following is the new code

fetch('/workout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(previousSet)
})
  .then((response) => {
    if (response.ok) {
      console.log('Set data submitted successfully');
      // Reset input fields for a new set
      weightInput.value = '';
      repsInput.value = '';
    } else {
      console.error('Failed to submit set data');
    }
  })
  .catch((error) => {
    console.error('Error submitting set data: ', error);
  });

// Add event listener to the start workout button
document.getElementById('startWorkoutBtn').addEventListener('click', () => {
  document.getElementById('startWorkoutBtn').disabled = true; // Disable the button after clicking
  document.getElementById('workoutForm').style.display = 'block';
  // Store the start date/time to use as a unique identifier for the workout
  const startDateTime = new Date().toISOString();
});

// Initialize exercise options
populateExerciseOptions();

// Add event listener to the new set button
document.getElementById('newSetBtn').addEventListener('click', handleNewSet);




//   This is the prev code..
//   fetch('/workout', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(previousSet)
//   })
//   .then((response) => {
//     if (response.ok) {
//       console.log('Set data submitted successfully');
//       // Reset input fields for a new set
//       weightInput.value = '';
//       repsInput.value = '';
//     } else {
//       console.error('Failed to submit set data');
//     }
//   })
//   .catch((error) => {
//     console.error('Error submitting set data: ', error);
//   });
}