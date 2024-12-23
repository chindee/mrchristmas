document.addEventListener("DOMContentLoaded", () => { 
    // เมนู toggle
    const menuToggle = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#menu");
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("show");
        });
    }

    // เลื่อนแบบสมูธ
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (menu.classList.contains("show")) {
                    menu.classList.remove("show");
                }
            }
        });
    });

    // โมดอลรูปภาพ
    const modal = document.querySelector(".modal");
    const modalImage = modal?.querySelector("#modal-image");
    const modalTitle = modal?.querySelector("#modal-title");
    const modalDescription = modal?.querySelector("#modal-description");
    const closeModal = modal?.querySelector(".close");
    const imageContainers = document.querySelectorAll(".image-container");

    imageContainers.forEach(container => {
        container.addEventListener("click", () => {
            const imageSrc = container.querySelector("img").src;
            const title = container.getAttribute("data-title");
            const description = container.getAttribute("data-description");

            if (modal && modalImage && modalTitle && modalDescription) {
                modalImage.src = imageSrc;
                modalTitle.textContent = title || "ไม่มีหัวข้อ";
                modalDescription.textContent = description || "ไม่มีรายละเอียด";
                modal.style.display = "flex";
            }
        });
    });

    closeModal?.addEventListener("click", () => {
        if (modal) modal.style.display = "none";
    });

    modal?.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });

    // เปิด/ปิดเสียง
    const toggleSoundButton = document.querySelector("#toggle-sound");
    const bgMusic = document.querySelector("#bg-music");

    if (bgMusic && toggleSoundButton) {
        toggleSoundButton.textContent = "🔊";
        
        toggleSoundButton.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    toggleSoundButton.textContent = "🔊";
                }).catch(error => {
                    console.log("ไม่สามารถเล่นเสียงได้:", error);
                });
            } else {
                bgMusic.pause();
                toggleSoundButton.textContent = "🔇";
            }
        });
    }

    // Countdown
    const countdownElement = document.querySelector(".countdown");
    const countdownTarget = new Date("2024-12-25T00:00:00+07:00").getTime();
    const updateCountdown = () => {
        const now = Date.now();
        const timeLeft = countdownTarget - now;
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdownElement.textContent = `${days}วัน ${hours}ชั่วโมง ${minutes}นาที ${seconds}วินาที`;
        } else {
            countdownElement.textContent = "Merry Christmas!";
            clearInterval(countdownInterval);
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // การ์ดคำอวยพร
    const images = [
        "/mrchristmas/image/c1.png",
        "/mrchristmas/image/c2.png",
        "/mrchristmas/image/c3.png",
        "/mrchristmas/image/c4.png",
        "/mrchristmas/image/c5.png",
        "/mrchristmas/image/c6.png",
        "/mrchristmas/image/c7.png" 
    ];

    const giftBox = document.getElementById("gift-box");
    const blurLayer = document.getElementById("blur-layer");
    const greetingCard = document.getElementById("greeting-card");

    giftBox.addEventListener("click", () => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imageElement = document.createElement("img");
        imageElement.src = randomImage;
        imageElement.style.width = "100%";
        imageElement.style.borderRadius = "12px";
        greetingCard.innerHTML = ""; 
        greetingCard.appendChild(imageElement);

        blurLayer.style.display = "block";
        greetingCard.classList.remove("hidden");

        setTimeout(() => {
            blurLayer.style.display = "none";
            greetingCard.classList.add("hidden");
        }, 5000);
    });
});
