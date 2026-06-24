const beginBtn = document.getElementById("beginBtn");
const music = document.getElementById("bgMusic");

beginBtn.addEventListener("click", () => {
  music.play();

  document.querySelector(".fade-screen").style.opacity = "1";

  setTimeout(() => {
    document.querySelector(".beginning").scrollIntoView({
      behavior: "smooth",
    });

    document.querySelector(".fade-screen").style.opacity = "0";
  }, 2000);
});
const text = `Do you remember
how all of this started?`;

const typingElement = document.getElementById("typingText");

const dots = document.getElementById("dots");

const rememberLine = document.getElementById("rememberLine");

let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);

    index++;

    setTimeout(typeText, 60);
  } else {
    setTimeout(() => {
      rememberLine.style.opacity = 1;
    }, 1000);
  }
}
const beginningSection = document.querySelector(".beginning");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          dots.style.display = "none";

          typeText();
        }, 2000);
      }
    });
  },
  {
    threshold: 0.4,
  },
);

observer.observe(beginningSection);
const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelector(".memory-image").classList.add("visible");
      }
    });
  },
  {
    threshold: 0.3,
  },
);
document.querySelectorAll(".first-memory").forEach((section) => {
  imageObserver.observe(section);
});
async function loadMemories() {
  const response = await fetch("data/memories.json");

  const memories = await response.json();

  const timeline = document.getElementById("timeline");

  memories.forEach((memory, index) => {
    const side = index % 2 === 0 ? "left" : "right";

    timeline.innerHTML += `

        <div class="memory-card reveal ${side}">

            <div class="memory-content">

                <img
                  src="assets/${memory.image}"
                  alt=""
                >

                <span>
                    ${memory.date}
                </span>

                <p>
                    ${memory.caption}
                </p>

            </div>

        </div>

        `;
  });

  initRevealAnimations();
}

loadMemories();
function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  reveals.forEach((item) => {
    observer.observe(item);
  });
}
const fragments = [
  "Lets take a stroll down the timeline.",
  "You're so peak ngl.",
];
timeline.innerHTML += `

<div class="fragment reveal">

    ${fragments[Math.floor(Math.random() * fragments.length)]}

</div>

`;
const particles = document.querySelector(".particles");

for (let i = 0; i < 100; i++) {
  const particle = document.createElement("span");

  particle.style.left = Math.random() * 100 + "%";

  particle.style.top = Math.random() * 100 + "%";

  particle.style.animationDelay = Math.random() * 15 + "s";

  particle.style.animationDuration = 10 + Math.random() * 20 + "s";
  particle.style.width = 2 + Math.random() * 8 + "px";

  particle.style.height = particle.style.width;
  particle.style.opacity = Math.random() * 0.5;

  particles.appendChild(particle);
}
