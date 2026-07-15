// Function to toggle loading animation
function loadingAnimationToggle(isLoading) {
    const loaderAnimation = document.getElementById("loader-animation");
    if (isLoading) {
        loaderAnimation.classList.remove("hidden");
    } else {
        loaderAnimation.classList.add("hidden");
    }   
}

const displayPhone = (data) => {
    const cardContainer = document.getElementById("phones-section");
    cardContainer.innerHTML = "";

    data.forEach((phone) => {
        const productCard = document.createElement("div");
        productCard.classList.add("phone-card");
        
        // Added onclick handler to fetch details based on phone slug
        productCard.innerHTML = `
            <div class="phone-img-container">
                <img src="${phone.image}" alt="iphone-image">
            </div>
            <h3>${phone.phone_name}</h3>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <span class="price">$ 999</span>
            <button onclick="handleShowDetails('${phone.slug}')" class="btn show-details-btn">Show Details</button>
        `;
        
        cardContainer.appendChild(productCard);
    });
};

const handleSearch = () => {
    loadingAnimationToggle(true); // Loading start
    
    const searchText = document.getElementById("search-input-field").value;
    
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => {
            displayPhone(data.data);
            loadingAnimationToggle(false); // Loading stop after data is loaded
        })
        .catch(error => {
            console.log(error);
            loadingAnimationToggle(false); // Stop loading if error occurs
        });
};

// --- Show Details functionality ---
const handleShowDetails = async (id) => {
    // Fetch individual phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    // Show modal
    const modal = document.getElementById("details-modal");
    const modalContainer = document.getElementById("modal-details-container");
    
    modalContainer.innerHTML = `
        <img src="${phone.image}" alt="phone" />
        <h3>${phone.name}</h3>
        <p><strong>Brand:</strong> ${phone.brand}</p>
        <p><strong>Storage:</strong> ${phone.mainFeatures?.storage || "Not Available"}</p>
        <p><strong>Display:</strong> ${phone.mainFeatures?.displaySize || "Not Available"}</p>
        <p><strong>Chipset:</strong> ${phone.mainFeatures?.chipSet || "Not Available"}</p>
        <p><strong>Release:</strong> ${phone.releaseDate || "No release date found"}</p>
    `;
    
    modal.classList.remove("hidden");
}

// Function to close modal
const closeModal = () => {
    document.getElementById("details-modal").classList.add("hidden");
}

// --- Enter key functionality for Search ---
document.getElementById("search-input-field").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission if any
        handleSearch();
    }
});