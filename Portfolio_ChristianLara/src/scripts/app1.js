import gsap from "gsap";

if (typeof window !== "undefined") {
    import("gsap").then((gsapModule) => {
        const gsap = gsapModule.default;

        document.addEventListener("DOMContentLoaded", function () {
            const container = document.querySelector(".container .items");
            if (!container) {
                console.error("El contenedor '.container .items' no fue encontrado.");
                return;
            }

            let animationTimeout = null;
            let currentlyPlaying = false;

            const images = [
                "/images/01madrileno.png",
                "/images/02mmcd.png",
                "/images/05data.png",
            ];

            function addNewItem(x, y) {
                const newItem = document.createElement("div");
                newItem.className = "item";
                newItem.style.left = `${x - 75}px`;
                newItem.style.top = `${y - 90}px`;

                const img = document.createElement("img");
                img.src = images[Math.floor(Math.random() * images.length)];
                newItem.appendChild(img);

                container.appendChild(newItem);
                manageItemLimit();
            }

            function manageItemLimit() {
                while (container.children.length > 20) {
                    container.removeChild(container.firstChild);
                }
            }

            function startAnimation() {
                if (currentlyPlaying || container.children.length === 0) return;
                currentlyPlaying = true;

                gsap.to(".item", {
                    y: 1000,
                    scale: 0.7,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.025,
                    onComplete: function () {
                        this.targets().forEach((item) => {
                            if (item.parentNode) {
                                item.parentNode.removeChild(item);
                            }
                        });
                        currentlyPlaying = false;
                    },
                });
            }

            container.addEventListener("mousemove", function (event) {
                const rect = container.getBoundingClientRect();
                if (
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                ) {
                    clearTimeout(animationTimeout);
                    addNewItem(event.pageX, event.pageY);
                    animationTimeout = setTimeout(startAnimation, 100);
                }
            });

            window.addEventListener("scroll", function () {
                const scrollPosition = window.pageYOffset;
                container.style.transform = `translateY(${scrollPosition * 0.5}px) translateZ(-1px) scale(2)`;
            });
        });
    }).catch((error) => console.error("Error al cargar GSAP:", error));
}
