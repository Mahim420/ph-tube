// Remove class
const removeClass = () => {
    const allActiveClass = document.getElementsByClassName('active');
    for (let btn of allActiveClass) {
        btn.classList.remove('active');
    }
}



// Display NavData
const displayNavData = (categories) => {
    const navItem = document.getElementById('nav-item');
    categories.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = `<button id="btn-${element.category_id}" onclick="categoryWiseVideo(${element.category_id})" class="btn btn-sm">${element.category}</button>`;

        navItem.appendChild(li);
    });

};

// Display Video Functions
const displayVideo = (videos) => {

    const videoSections = document.getElementById("video-sections");
    videoSections.innerHTML = "";

    if (videos.length === 0) {
        const div = document.createElement('div');
        div.classList.add('col-span-4', 'flex', 'pt-20', 'justify-center');
        div.innerHTML = `
                 <div class="flex w-[504px] items-center flex-col text-center">
                    <img src="./assets/Icon.png" alt="">
                    <h3 class="mt-7">Oops!! Sorry, There is no content here</h3>
                </div>
        
        `
        videoSections.appendChild(div);
    }

    else {
        videos.forEach(el => {
            console.log(el)
            const newCard = document.createElement('div');
            newCard.innerHTML = `
        <div class="card bg-base-100 h-80 w-72 shadow-sm">
                <figure class="relative">
                    <img class="w-full h-52 object-cover" src="${el.thumbnail}" alt="Shoes" />
                    <span class="absolute text-white px-2 rounded bottom-2 right-2 bg-[#171717]">3hrs 56 min ago</span>
                </figure>
                <div class="py-4 px-2">
                    <div class="flex gap-2">
                        <div>
                            <div class="avatar">
                                <div class="w-10 rounded-full">
                                    <img alt=""
                                        src="${el.authors[0].profile_picture}" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 class="card-title">
                                ${el.title}
                            </h2>
                            <p id="verified" class="flex gap-1 items-center">
                                <span>${el.authors[0].profile_name}</span>
                                ${el.authors[0].verified ?
                    `<span>
                                         <img class="w-5 h-5" src="./assets/v.png" alt="">
                                    </span>`
                    : ''}
                            </p>
                            <p class="flex items-center gap-2"><span>${el.others.views}</span> <span>views</span></p>
                        </div>
                    </div>
                     <button class="btn mt-7 btn-block">View Detailes</button>
                </div>
            </div>
        `;
            videoSections.appendChild(newCard);
        })
    }
}


// Loading Nav data
const loadAllData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");

    const data = await res.json();
    displayNavData(data.categories);
};

// Load all allsections Video
const loadVideo = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    removeClass();
    const firstBtn = document.getElementById('first-button');
    firstBtn.classList.add('active');
    displayVideo(data.videos);
};


// Loading Categories Video
const categoryWiseVideo = async (id) => {
    removeClass();
    const navIndicator = document.getElementById(`btn-${id}`)
    navIndicator.classList.add('active');
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    displayVideo(data.category);
};


loadAllData();