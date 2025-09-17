// fetch categories data from API
loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data) => displayCategories(data.categories))
}

displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");

    for(let category of categories) {
        // console.log(category);
        const categoryDiv = document.createElement("div");
        categoryDiv. innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`
        categoryContainer.appendChild(categoryDiv);
    }
}

loadCategories();
