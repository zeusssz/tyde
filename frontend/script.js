// Sample scientist data
const scientists = [
    {
        name: "Dr. Marie Thompson",
        title: "Quantum Physicist",
        bio: "Exploring quantum entanglement and its applications in quantum computing. Leading research in quantum teleportation.",
        tags: ["Quantum Physics", "Computing", "Entanglement"],
        status: "Research Active"
    },
    {
        name: "Dr. James Chen",
        title: "Molecular Biologist",
        bio: "Investigating CRISPR applications in genetic diseases. Specialized in gene therapy and DNA repair mechanisms.",
        tags: ["CRISPR", "Genetics", "Medicine"],
        status: "Research Active"
    },
    {
        name: "Dr. Sarah Martinez",
        title: "Climate Scientist",
        bio: "Studying climate change impacts on marine ecosystems. Developing predictive models for ocean acidification.",
        tags: ["Climate", "Oceanography", "Modeling"],
        status: "Research Active"
    },
    {
        name: "Dr. Alex Kumar",
        title: "AI Researcher",
        bio: "Developing novel neural network architectures for natural language processing. Focused on few-shot learning.",
        tags: ["AI", "Machine Learning", "NLP"],
        status: "Research Active"
    },
    {
        name: "Laksh Gandu",
        title: "litti chokhax",
        bio: "Researching exoplanets and their potential for harboring life. Expert in spectroscopic analysis.",
        tags: ["Exoplanets", "Astrobiology", "Spectroscopy"],
        status: "Research Active"
    }
];

let currentIndex = 0;

// Function to display scientist profile
function displayScientist(scientist) {
    document.getElementById('scientistName').textContent = scientist.name;
    document.getElementById('scientistTitle').textContent = scientist.title;
    document.getElementById('scientistBio').textContent = scientist.bio;
    document.getElementById('status').textContent = scientist.status;
    
    // Clear and update tags
    const tagsContainer = document.getElementById('scientistTags');
    tagsContainer.innerHTML = '';
    scientist.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
}

// Function to handle swipe actions
function handleSwipe(direction) {
    const card = document.getElementById('profileCard');
    const message = document.getElementById('responseMessage');
    
    // Remove previous states
    card.classList.remove('liked', 'rejected');
    message.classList.remove('visible', 'like-message', 'reject-message');
    
    // Store the scientist that was just swiped on
    const swipedScientist = scientists[currentIndex];
    
    if (direction === 'right') {
        card.classList.add('liked');
        message.textContent = "It's a research!";
        message.classList.add('visible', 'like-message');
        console.log(`Matched with ${swipedScientist.name}!`);
    } else if (direction === 'left') {
        card.classList.add('rejected');
        message.textContent = "Well until next time :(";
        message.classList.add('visible', 'reject-message');
    }
    
    setTimeout(() => {
        card.classList.remove('liked', 'rejected');
        message.classList.remove('visible', 'like-message', 'reject-message');
        // Move to next scientist
        currentIndex = (currentIndex + 1) % scientists.length;
        displayScientist(scientists[currentIndex]);
    }, 1500); // Increased timeout to show the message longer
}

// Initialize with first scientist
window.addEventListener('DOMContentLoaded', () => {
    displayScientist(scientists[currentIndex]);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        handleSwipe('left');
    } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
    }
});

// Add touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('profileCard').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('profileCard').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleTouchSwipe();
});

function handleTouchSwipe() {
    const swipeThreshold = 50; // minimum distance for a swipe
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swiped left
            handleSwipe('left');
        } else {
            // Swiped right
            handleSwipe('right');
        }
    }
}

// Optional: Add drag functionality
let isDragging = false;
let startX = 0;
let currentX = 0;

const card = document.getElementById('profileCard');

card.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

function startDragging(e) {
    isDragging = true;
    startX = e.clientX - card.offsetLeft;
    card.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    currentX = e.clientX - startX;
    
    // Limit the drag distance
    if (Math.abs(currentX) < window.innerWidth / 2) {
        card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
        updateSwipeOverlay(currentX);
    }
}

function stopDragging() {
    if (!isDragging) return;
    
    isDragging = false;
    card.style.transition = 'transform 0.3s ease';
    
    if (Math.abs(currentX) > 100) {
        // Swipe threshold reached
        handleSwipe(currentX > 0 ? 'right' : 'left');
    } else {
        // Reset position
        card.style.transform = '';
    }
}

function updateSwipeOverlay(offset) {
    const opacity = Math.min(Math.abs(offset) / 100, 1);
    if (offset > 0) {
        // Show like overlay
        card.style.backgroundColor = `rgba(66, 153, 225, ${opacity * 0.2})`; // Changed to blue
    } else {
        // Show reject overlay
        card.style.backgroundColor = `rgba(245, 101, 101, ${opacity * 0.2})`; // Changed to match reject color
    }
}
