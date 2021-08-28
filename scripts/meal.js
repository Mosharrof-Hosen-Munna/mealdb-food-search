window.addEventListener("load", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => showButton(data.categories));
});
function showButton(data) {
  const btnContainer = document.getElementById("btn-group");

  data.forEach((item) => {
    const btn = document.createElement("button");
    btn.innerText = item.strCategory;
    btn.className = "btn btn-primary me-1 mb-1 meal";
    btn.setAttribute("onclick", `loadCategoriesData('${item.strCategory}')`);
    btnContainer.appendChild(btn);
  });
}

const loadCategoriesData = async (categoriesName) => {
  const mealBtns = document.getElementsByClassName("meal");
  for (const mealBtn of mealBtns) {
    mealBtn.classList.remove("active");
  }
  event.target.classList.add("active");

  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesName}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayMeals(data.meals);
};

const loadMeal = () => {
  const searchTerm = document.getElementById("search-field");
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.value}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
  searchTerm.value = "";
};

const displayMeals = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  const errorField = document.getElementById("error-msg");
  if (data !== null) {
    data.forEach((item) => {
      errorField.innerText = "";

      const col = document.createElement("div");
      col.classList.add("col");
      col.innerHTML = mealsHTML(item);
      cardContainer.appendChild(col);
    });
  } else {
    errorField.innerText = "No result found";
  }
};

// display meals inner html
function mealsHTML(item) {
  return `
          <div class="card h-100" onclick="loadSingleMeal(${item.idMeal})">
                    <img src="${
                      item.strMealThumb
                    }" class="card-img-top" alt="...">
                    <div class="card-body">
                         <h5 class="card-title">${item.strMeal}</h5>
                          <p class="card-text">${
                            item.strInstructions
                              ? item.strInstructions.slice(0, 100)
                              : ""
                          }</p>

                    </div>
          </div>
          `;
}

// load a single meal by id
function loadSingleMeal(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showSingleMeal(data.meals[0]));
}
// show specification of a single meals
const showSingleMeal = (meal) => {
  const singleMeal = document.getElementById("single-meal");
  singleMeal.textContent = "";
  const div = document.createElement("div");
  div.className = "row g-0";
  div.innerHTML = `
                    
                         <div class="col-md-4">
                              <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                         </div>
                         <div class="col-md-8">
                              <div class="card-body">
                                   <h5 class="card-title">${meal.strMeal}</h5>
                                   <p class="card-text">${meal.strInstructions}</p>
                                   
                              </div>
                         </div>
                    
     `;
  singleMeal.appendChild(div);
};
