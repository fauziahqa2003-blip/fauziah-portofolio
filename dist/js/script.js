/* ==========================================================
                    PAGE LOADER
========================================================== */
const loader = document.getElementById("loader");
const LOADER_DURATION = 2000;
window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, LOADER_DURATION);
});

/* ==========================================================
                SCROLL PROGRESS BAR
========================================================== */
const progress = document.querySelector(".progress");
const updateProgressBar = () => {
    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent =
        (scrollTop / documentHeight) * 100;
    progress.style.width = `${scrollPercent}%`;
};
window.addEventListener("scroll", updateProgressBar);
updateProgressBar();

/* ==========================================================
                BACK TO TOP BUTTON
========================================================== */
const scrollTopButton = document.getElementById("scrollTop");
const toggleScrollButton = () => {
    const show = window.scrollY > 120;
    scrollTopButton.classList.toggle("show", show);
};
window.addEventListener("scroll", toggleScrollButton);
scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});
toggleScrollButton();

/* ==========================================================
                    NAVBAR
========================================================== */
const header = document.getElementById("header");
const changeHeader = () => {
    if(window.scrollY > 80){
        header.classList.add("scroll-header");
    }else{
        header.classList.remove("scroll-header");
    }
};
window.addEventListener("scroll", changeHeader);
changeHeader();

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
menuToggle.addEventListener("click",()=>{
    navMenu.classList.toggle("show");
});

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        navMenu.classList.remove("show");
    });
});

const sections = document.querySelectorAll("section[id]");
const activeMenu = () => {
    const scrollY = window.scrollY;
    sections.forEach(section=>{
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`
            .nav-menu a[href*="${sectionId}"]`);
            if(!navLink) return;
            if(
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ){
                navLink.classList.add("active-link");
            }else{
                navLink.classList.remove("active-link");
            }
    });
};
window.addEventListener("scroll",activeMenu);
activeMenu();

/* ==========================================================
                        HERO
========================================================== */
/*========== AOS Animation ==========*/
AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
});
/*========== Typed Text ==========*/
const typed = new Typed("#typing-text", {
    strings: [
        "Data Analyst",
        "Business Analyst",
        "Mathematics Graduate",
        "Optimization Enthusiast"
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1800,
    loop: true,
});

/* ==========================================================
                    ABOUT SECTION
========================================================== */
/*========== Counter Animation ==========*/
const counters = document.querySelectorAll(".counter");
const startCounter = (counter) => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = target / 60;
    const updateCounter = () => {
        count += speed;
        if(count < target){
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
        }else{
            counter.innerText = `${target}+`;
        }
    };
    updateCounter();
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            counters.forEach(counter => {
                if(!counter.classList.contains("counted")){
                    startCounter(counter);
                    counter.classList.add("counted");
                }
            });
        }
    });
},{
    threshold:0.4
    });
    document.querySelectorAll(".about-stats").forEach(section=>{
        observer.observe(section);
});
/* ==========================================================
                         JOURNEY
========================================================== */
const timeline = document.querySelector(".timeline");
const timelineProgress = document.querySelector(".timeline-progress");
window.addEventListener("scroll", () => {
    if(!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const timelineHeight = timeline.offsetHeight;
    let progress = ((windowHeight - rect.top) / (windowHeight + timelineHeight)) * timelineHeight;
    progress = Math.max(0, Math.min(progress, timelineHeight));
     timelineProgress.style.height = `${progress}px`;
});
    const journeyItems = document.querySelectorAll(".timeline-item");
    const journeyObserver = new IntersectionObserver((entries)=>{ 
        entries.forEach(entry=>{
            if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{
    threshold:.4
    });
    journeyItems.forEach(item=>{
        journeyObserver.observe(item);
});

/* ==========================================================
                        SKILLS
========================================================== */
const skillCards = document.querySelectorAll(".skill-card");
const skillObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{
    threshold:0.2
});
skillCards.forEach(card=>{
    skillObserver.observe(card);
});

/* ==========================================================
                    PROJECT FILTER
========================================================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        
        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            if(filter === "all"){
                card.style.display = "block";
            }
            else if(card.classList.contains(filter)){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }
        });
    });
});


/* ==========================================================
                CERTIFICATE CAROUSEL ENGINE
========================================================== */

const cards = [...document.querySelectorAll(".certificate-card")];
const prevBtn = document.querySelector(".cert-prev");
const nextBtn = document.querySelector(".cert-next");

let order = cards.map((_, index) => index);

/* Posisi tetap */
const positions = [
    {
        x: -500,
        scale: 0.60,
        opacity: 0.25,
        z: 1,
        blur: 4
    },

    {
        x: -260,
        scale: 0.82,
        opacity: 0.70,
        z: 2,
        blur: 1
    },

    {
        x: 0,
        scale: 1,
        opacity: 1,
        z: 5,
        blur: 0
    },

    {
        x: 260,
        scale: 0.82,
        opacity: 0.70,
        z: 2,
        blur: 1
    }
];

function renderCarousel(){

    cards.forEach(card=>{
        card.style.display="none";
    });

    order.slice(0,4).forEach((cardIndex,positionIndex)=>{

        const card = cards[cardIndex];
        const pos = positions[positionIndex];

        card.style.display="block";

        card.style.transform=`
        translate(-50%,-50%)
        translateX(${pos.x}px)
        scale(${pos.scale})`;

        card.style.opacity=pos.opacity;
        card.style.filter=`blur(${pos.blur}px)`;
        card.style.zIndex=pos.z;

        if(positionIndex===2){
            card.classList.add("active-card");
        }else{
            card.classList.remove("active-card");
        }

    });

}

renderCarousel();
nextBtn.addEventListener("click",()=>{
    order.push(order.shift());
    renderCarousel();
});

prevBtn.addEventListener("click",()=>{
    console.log("PREV CLICK");
    order.unshift(order.pop());
    console.log(order);
    renderCarousel();
});
const modal = document.querySelector(".certificate-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalCompany = document.querySelector(".modal-company");
const modalPeriod = document.querySelector(".modal-period");
const modalDescription = document.querySelector(".modal-description");
const modalSkills = document.querySelector(".modal-skills");
const downloadBtn = document.querySelector(".download-certificate");
const closeBtn = document.querySelector(".close-modal");
cards.forEach(card => {
    card.addEventListener("click", () => {
        modal.classList.add("show");
        modalImage.src = card.querySelector("img").src;
        modalImage.alt = card.querySelector("img").alt;
        modalTitle.textContent = card.dataset.title;
        modalCompany.textContent = card.dataset.company;
        modalPeriod.textContent = card.dataset.period;
        modalDescription.textContent = card.dataset.description;
        modalSkills.innerHTML = "";
        card.dataset.skills
            .split(",")
            .forEach(skill => {
                const span = document.createElement("span");
                span.textContent = skill.trim();
                modalSkills.appendChild(span);
            });
        downloadBtn.href = card.dataset.file;
    });
});
closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});
modal.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.classList.remove("show");
    }
});
document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
        modal.classList.remove("show");
    }
});

/* ==========================================================
                JOURNEY IN FRAMES
========================================================== */
/* ==========================================================
                JOURNEY IN FRAMES
========================================================== */

const frames = [...document.querySelectorAll(".frame-card")];

let angle = 0;
const radius = 380;
function renderFrames(){

    const total = frames.length;

    frames.forEach((frame,index)=>{

        const theta =
        ((Math.PI*2)/total)*index+angle;

        const x =
        Math.sin(theta)*radius;

        const y =
        Math.cos(theta)*60;

        const scale =
        0.6+(Math.cos(theta)+1)*0.25;

        const opacity =
        0.25+(Math.cos(theta)+1)*0.35;

        frame.style.transform=

        `translate(-50%,-50%)
        translate(${x}px,${y}px)
        scale(${scale})`;

        frame.style.opacity=opacity;

        frame.style.zIndex=
        Math.floor(scale*100);

    });

}
renderFrames();

let animationId;
let isPaused = false;
function animateFrames(){

    if(!isPaused){

        angle += .003;

        renderFrames();

    }

    animationId =
    requestAnimationFrame(animateFrames);

}
animationId = requestAnimationFrame(animateFrames);
const slider =
document.querySelector(".frames-slider");
slider.addEventListener("mouseenter",()=>{

    isPaused=true;

});
slider.addEventListener("mouseleave",()=>{

    isPaused=false;

});