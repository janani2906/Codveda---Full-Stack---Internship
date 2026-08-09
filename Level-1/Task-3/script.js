const button = document.getElementById("fetchBtn");
const usersContainer = document.getElementById("users");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");

button.addEventListener("click", fetchUsers);

function fetchUsers() {

    loader.textContent = "Loading Users...";
    usersContainer.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users")

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            return response.json();
        })

        .then(data => {

            loader.innerHTML = "";

            // Total users
            document.getElementById("totalUsers").textContent = data.length;

            // Total companies
            const companies = new Set(
                data.map(user => user.company.name)
            );

            document.getElementById("totalCompanies").textContent =
                companies.size;

            // Total cities
            const cities = new Set(
                data.map(user => user.address.city)
            );

            document.getElementById("totalCities").textContent =
                cities.size;


            // Display users
            data.forEach(user => {

                const card = document.createElement("div");

                card.classList.add("card");

                card.innerHTML = `
                
                    <img 
                        src="https://i.pravatar.cc/150?img=${user.id}" 
                        class="avatar"
                        alt="${user.name}"
                    >

                    <h2>${user.name}</h2>

                    <p>
                        <i class="fa-solid fa-envelope"></i>
                        <strong>Email:</strong>
                        ${user.email}
                    </p>

                    <p>
                        <i class="fa-solid fa-phone"></i>
                        <strong>Phone:</strong>
                        ${user.phone}
                    </p>

                    <p>
                        <i class="fa-solid fa-globe"></i>
                        <strong>Website:</strong>
                        <a 
                            href="https://${user.website}" 
                            target="_blank"
                        >
                            ${user.website}
                        </a>
                    </p>

                    <p>
                        <i class="fa-solid fa-building"></i>
                        <strong>Company:</strong>
                        ${user.company.name}
                    </p>

                    <p>
                        <i class="fa-solid fa-location-dot"></i>
                        <strong>City:</strong>
                        ${user.address.city}
                    </p>
                `;

                usersContainer.appendChild(card);
            });


            // Change button after loading
            button.innerText = "Users Loaded";
            button.disabled = true;
            button.style.opacity = "0.7";

        })

        .catch(error => {

            loader.textContent = "❌ Failed to load users.";

            console.error(error);

        });
}


searchInput.addEventListener("keyup", function () {

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    const noResults = document.getElementById("noResults");

    let found = false;

    cards.forEach(card => {

        const name = card.querySelector("h2")
            .textContent
            .toLowerCase();

        if (name.includes(value)) {

            card.style.display = "block";
            found = true;

        } else {

            card.style.display = "none";

        }

    });

    if (found) {
        noResults.style.display = "none";
    } else {
        noResults.style.display = "block";
    }

});
