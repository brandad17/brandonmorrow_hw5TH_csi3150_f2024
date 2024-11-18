
// Elements for filtering
const minPriceInput = document.getElementById("minPrice")
const maxPriceInput = document.getElementById("maxPrice")
const modelYearInput = document.getElementById("yearFilter")
const manufacturerInput = document.getElementById("manufacturerFilter")
const colorInput = document.getElementById("colorFilter")
const maxMileageInput = document.getElementById("maxMileage")

// Buttons
document.getElementById("filterBtn").addEventListener("click", applyFilters);
document.getElementById("clearBtn").addEventListener("click", clearSelection);

function applyFilters() {
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);
    const modelYear = modelYearInput.value;
    const manufacturer = manufacturerInput.value;
    const color = colorInput.value;
    const maxMileage = parseInt(maxMileageInput.value);

    // Filter car array for criteria
    const filteredCars = usedCars.applyFilters((car) => {
        const carPrice = car.price;
        const carYear = car.year.toString();
        const carManufacturer = car.make;
        const carColor = car.color;
        const carMileage = car.mileage;
    
        return (
        carPrice >= minPrice &&
        carPrice <= maxPrice &&
        carMileage <= maxMileage &&
        (manufacturer === "allManufacturers" ||
            carManufacturer === manufacturer) &&
        (color === "allColors" || carColor === color) &&
        (modelYear === "allYears" || carYear === modelYear)
        );
    })

    //Display cars with filters
    displayCars(filteredCars);
}

function clearSelection() {
    minPriceInput.value = "0";
    maxPriceInput.value = "0";
    modelYearInput.value = "allYears";
    make.value = "allManufacturers";
    colorInput.value = "allColors";
    maxMileageInput.value = "1000000"; // Default high mileage
    displayCars();
}


function displayCars(cars) {
  const carList = document.getElementById("car-listings");
  carList.innerHTML = ""; // Clear previous results

  if (cars.length === 0) {
    carList.innerHTML =
      "<p>No cars match your criteria. Please try different filters.</p>";
    return;
  }

  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.innerHTML =
      //adding img path for the imgs to transfer when filters are applied
      `
            <img src="${car.image}" alt="">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>Price: $${car.price}</p>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
        `;
    carList.appendChild(carCard);
  });
}