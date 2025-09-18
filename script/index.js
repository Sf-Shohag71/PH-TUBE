// fetch categories data from API
loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
// fetch video data from API
loadVideos = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await response.json();
  displayVideos(data.videos);
};

// Display videos based on category
loadVideosByCategory = (category_id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
  .then((res) => res.json())
  .then((data) => displayVideos(data.category));
  // console.log(data.category);
}

// display categories in the UI
displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  for (let category of categories) {
    // console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button onclick="loadVideosByCategory('${category.category_id}')" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`;
    categoryContainer.appendChild(categoryDiv);
  }
};
displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");

  // clear previous videos
  videoContainer.innerHTML = "";

  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100">
        <figure class="relative">
          <img
            src="${video.thumbnail}"
            alt="${video.title}"
            class="w-full h-[150px] object-cover"
          />
          <span
            class="absolute bottom-2 right-2 bg-black text-white text-sm rounded px-2"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="card-body flex gap-3 px-0 flex-row">
          <div class="profile">
            <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ">
              <img src="${video.authors[0].profile_picture}" alt="Avatar" />
            </div>
          </div>
      </div>
      <div class="intro">
        <h2 class="text-sm font-bold">${video.title}</h2>
        <p class="text-sm flex gap-1 py-2 items-center text-gray-500">
          ${video.authors[0].profile_name}
          <img src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt="verified" class="w-5 h-5" />
        </p>
        <p class="text-sm text-gray-500">${video.others.views} views</p>
      </div>
    `;
    videoContainer.append(videoCard);
  });
};

loadCategories();
loadVideos();
