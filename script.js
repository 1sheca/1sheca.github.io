// Fill this with your profile data from profile.pdf
const profileData = {
    name: "Vanshika Sharma",
    title: "ASE @Mamsys | Google DSC Lead '23 | MLSA-β",
    about: `Assistant System Engineer at Mamsys World, Google DSC Lead, and Microsoft Learn Student Ambassador. Passionate about Machine Learning, Agile Methodologies, and building real-life solutions. Recognized for leadership, collaboration, and advocacy for diversity in tech.`,
    skills: [
        "Machine Learning",
        "Agile Methodologies",
        "Python (Programming Language)",
        "SQL",
        "Software Architecture",
        "Cloud Computing"
    ],
    projects: [
        {
            name: "Automation Testing Utility",
            description: "Developed a dynamic Python utility for refined Excel processing and seamless JSON data handling, enhancing database queries and automating report delivery.",
            link: "#"
        },
        {
            name: "Google DSC Initiatives",
            description: "Led and organized workshops and events to increase awareness about Google products and technologies, developing real-life solutions to local challenges.",
            link: "#"
        }
    ],
    contact: [
        { type: "Email", value: "vanshikas174@gmail.com", link: "mailto:vanshikas174@gmail.com" },
        { type: "LinkedIn", value: "www.linkedin.com/in/1sheca", link: "https://www.linkedin.com/in/1sheca" }
    ],
    languages: [
        "French (Elementary)",
        "English (Native or Bilingual)",
        "Hindi (Native or Bilingual)"
    ],
    certifications: [
        "Hands-On SQL Server Management Studio, SQL Queries, AzureStudio",
        "AWS Sage Maker Masterclass",
        "Machine Learning with Python",
        "Software Architecture",
        "IBM Cloud Essentials"
    ],
    awards: [
        "Certificate of Honour in 1st and 2nd Korea-India Friendship Event, Embassy of Republic of Korea"
    ],
    education: [
        {
            school: "SRM University Sonepat, Haryana",
            degree: "BTech, Computer Science with specialization in Data Science and Artificial Intelligence",
            period: "October 2020 - May 2024"
        },
        {
            school: "Sadhu Vaswani International School for Girls",
            degree: "Science - PCMB",
            period: "July 2006 - March 2020"
        }
    ]
};

// Populate the page
window.onload = function() {
    document.getElementById('name').textContent = profileData.name;
    document.getElementById('title').textContent = profileData.title;
    document.getElementById('about-text').textContent = profileData.about;

    // Social links (profile-socials)
    const socials = [
        { icon: 'fa-linkedin', url: 'https://www.linkedin.com/in/1sheca', label: 'LinkedIn' },
        { icon: 'fa-envelope', url: 'mailto:vanshikas174@gmail.com', label: 'Email' }
    ];
    const socialsDiv = document.getElementById('profile-socials');
    if (socialsDiv) {
        socials.forEach(s => {
            const a = document.createElement('a');
            a.href = s.url;
            a.target = '_blank';
            a.title = s.label;
            a.innerHTML = s.icon === 'fa-envelope' ? '✉️' : '<i class="fab ' + s.icon + '"></i>';
            socialsDiv.appendChild(a);
        });
    }

    // Skills
    const skillsList = document.getElementById('skills-list');
    profileData.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    // Projects
    const projectsList = document.getElementById('projects-list');
    profileData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p><a href="${project.link}" target="_blank">View Project</a>`;
        projectsList.appendChild(card);
    });

    // Contact
    const contactList = document.getElementById('contact-list');
    profileData.contact.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${contact.link}" target="_blank">${contact.type}: ${contact.value}</a>`;
        contactList.appendChild(li);
    });

    // Languages, Certifications, Awards, Education (optional sections)
    addOptionalSection('Languages', profileData.languages);
    addOptionalSection('Certifications', profileData.certifications);
    addOptionalSection('Honors & Awards', profileData.awards);
    addEducationSection(profileData.education);
};

function addOptionalSection(title, items) {
    if (!items || !items.length) return;
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.innerHTML = `<h2>${title}</h2><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    main.appendChild(section);
}

function addEducationSection(education) {
    if (!education || !education.length) return;
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.innerHTML = `<h2>Education</h2><ul>${education.map(e => `<li><strong>${e.school}</strong><br>${e.degree}<br><em>${e.period}</em></li>`).join('')}</ul>`;
    main.appendChild(section);
}

// Profile photo upload
const photoUpload = document.getElementById('photo-upload');
const profilePhoto = document.getElementById('profile-photo');
photoUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            profilePhoto.src = evt.target.result;
            profilePhoto.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Hamburger menu functionality for mobile
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
  navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// Smooth scrolling for navigation links
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      e.preventDefault();
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Contact form demo handler
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for reaching out! (Demo only)");
    contactForm.reset();
  });
}
