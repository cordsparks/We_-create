import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCqu49StV4iO8OX7r3K84zmd2waaB7yFv4",
  authDomain: "virtual-project-472c3.firebaseapp.com",
  databaseURL: "https://virtual-project-472c3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "virtual-project-472c3",
  storageBucket: "virtual-project-472c3.firebasestorage.app",
  messagingSenderId: "305440957730",
  appId: "1:305440957730:web:92893438d6ac3a7579717b",
  measurementId: "G-JBYWZTD5XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Save Project Data to Firebase when the button is clicked
document.getElementById('saveButton').addEventListener('click', function() {
    // Define the data to save
    const projectData = {
        name: "Virtual Bike Project",
        status: "In Progress",
        progress: 75
    };

    // Reference to Firebase Database (where the data will be saved)
    const dbRef = ref(database, 'projects/project1');

    // Save the data to Firebase Realtime Database
    set(dbRef, projectData)
        .then(() => {
            alert("Project saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving project: ", error);
        });
});


// Add event listener to save data
document.getElementById("saveButton").addEventListener("click", function () {
  const projectData = {
    name: "Virtual Bike Project",
    status: "In Progress",
    progress: 75
  };

  const dbRef = ref(database, "projects/" + Date.now());
  set(dbRef, projectData)
    .then(() => {
      alert("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
  // Assuming the Firebase config and initialization is done correctly

// Fetch projects and display them
function fetchProjects() {
    onValue(dbRef, (snapshot) => {
        const projectList = document.getElementById('projectItems');
        projectList.innerHTML = ''; // Clear the list before adding new items

        snapshot.forEach((childSnapshot) => {
            const projectKey = childSnapshot.key; // Unique key for each project
            const projectData = childSnapshot.val();

            // Create a list item for each project
            const listItem = document.createElement('li');
            listItem.textContent = `${projectData.name} - ${projectData.status} - ${projectData.progress}%`;

            // Add Edit Button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editProject(projectKey, projectData);

            listItem.appendChild(editButton);
            projectList.appendChild(listItem);
        });
    });
}

// Call fetchProjects when the app loads
fetchProjects();

// Function to edit a project
function editProject(projectKey, projectData) {
    const newName = prompt("Enter new name:", projectData.name);
    const newStatus = prompt("Enter new status:", projectData.status);
    const newProgress = prompt("Enter new progress (%):", projectData.progress);

    if (newName && newStatus && newProgress) {
        const projectRef = ref(database, `projects/${projectKey}`);
        set(projectRef, {
            name: newName,
            status: newStatus,
            progress: parseInt(newProgress, 10)
        }).then(() => {
            alert("Project updated successfully!");
            fetchProjects(); // Refresh the list to show the updated project
        }).catch((error) => {
            console.error("Error updating project:", error);
        });
    }
}

});
