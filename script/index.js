const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden")
  document.getElementById("video-container").classList.add("hidden")
}
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden")
  document.getElementById("video-container").classList.remove("hidden")
}


// Remove active class from previous category button
removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }

  // console.log(activeButtons);
};

// fetch categories data from API
loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// fetch video data from API
loadVideos = async (searchText = "") => {
  showLoader();
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  );
  const data = await response.json();
  removeActiveClass();
  document.getElementById("btn-all").classList.add("active");
  displayVideos(data.videos);
};

// load video details in modal
const loadVideoDetails = async (video_id) => {
  // console.log(video_id);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`
  );
  const data = await response.json();
  // console.log(data.video);
  displayVideoDetails(data.video);
};

// Display videos based on category
loadVideosByCategory = (category_id) => {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${category_id}`);
      clickedButton.classList.add("active");
      // console.log(clickedButton);
      displayVideos(data.category);
    });
  // console.log(data.category);
};

// display categories in the UI
displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  for (let category of categories) {
    // console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadVideosByCategory('${category.category_id}')" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`;
    categoryContainer.appendChild(categoryDiv);
  }
};
displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");

  // clear previous videos
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
      <div
        class="flex flex-col justify-center text-center items-center col-span-4 py-20"
      >
        <img class="w-[150px]" src="assets/Icon.png" alt="video-not-found" />
        <h2 class="text-2xl font-bold pt-4">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;
  }

  videos.forEach((video) => {
    // console.log(video);
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
            ${video.authors[0].verified == true ? `<img src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt="verified" class="w-5 h-5" />` : ""}
          </p>
          <p class="text-sm text-gray-500">${video.others.views} views</p>  
        </div>
      </div>
      <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
      </div>
    `;
    videoContainer.append(videoCard);
  });
  hideLoader();
};

// display video details in modal
const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
      <div class="card bg-black image-full shadow-sm">
        <div class="card-body">
        <img src="${video.thumbnail}" alt="video"  class="image-full rounded-lg py-4"/>
          <h2 class="card-title font-semibold">${video.title}</h2>
          <p>${video.description}</p>
          <p class="font-semibold">${video.others.views} views</p>
        </div>
      </div>
    `;
};

// search functionality
document.getElementById("search-input").addEventListener("keyup", (e)=> {
  const searchText = e.target.value;
  // console.log(searchText);
  loadVideos(searchText);
})

loadCategories();
loadVideos();
