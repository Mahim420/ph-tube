// Remove class
const removeClass = () => {
    const allActiveClass = document.getElementsByClassName('active');
    for (let btn of allActiveClass) {
        btn.classList.remove('active');
    }
};

const timeAgo = (seconds) => {
    const totalSeconds = parseInt(seconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
        return `${hours} hrs ${minutes} min ago`;
    }
    if (minutes > 0) {
        return `${minutes} min ago`;
    }
    return 'Just now';
};



const disPlayVideoDetailes = (details) => {
    console.log(details)

    const oldModal = document.getElementById('modals_detailes');
    if (oldModal) oldModal.remove();

    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="modals_detailes" class="modal">
            <div class="modal-box">
                <h3 id="modal-title" class="text-lg font-bold">${details.title}</h3>
                <p class="py-4">${details.description || 'No description available'}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    `;

    document.body.appendChild(div);
};




const showDetailsButton = async (video_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`);
    const data = await res.json();
    disPlayVideoDetailes(data.video);
    document.getElementById('modals_detailes').showModal();
};

// Display NavData
const displayNavData = (categories) => {
    const navItem = document.getElementById('nav-item');
    const navList = document.getElementById('nav-list')
    categories.forEach(element => {
        const li = document.createElement('li');
        const li_2 = document.createElement('li');
        li.innerHTML = `<button id="btn-${element.category_id}" onclick="categoryWiseVideo(${element.category_id})" class="btn btn-sm">${element.category}</button>`;
        li_2.innerHTML = `<a>${element.category}</a>`;
        navList.appendChild(li_2);
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
            const newCard = document.createElement('div');
            newCard.innerHTML = `
        <div class="card bg-base-100 h-80 w-72 shadow-sm">
                <figure class="relative">
                    <img class="w-full h-52 object-cover" src="${el.thumbnail}" alt="Shoes" />
                    <span class="absolute text-white px-2 rounded bottom-2 right-2 bg-[#171717]">${el.others?.posted_date ? timeAgo(el.others.posted_date) : ''}</span>
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
                     <button onclick="showDetailsButton('${el.video_id}')" class="btn mt-7 btn-block">View Detailes</button>
                </div>
            </div>
        `;
            videoSections.appendChild(newCard);
        })
    }
};


// Loading Nav data
const loadAllData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");

    const data = await res.json();
    displayNavData(data.categories);
};

// Load all allsections Video
const loadVideo = async (input = "") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`);
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


// Implement search functionality
document.getElementById('search-input').addEventListener('keyup', (event) => {
    const value = event.target.value;
    loadVideo(value)
})

loadAllData();