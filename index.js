document.addEventListener("DOMContentLoaded", () => {

    const images = {
        0: {
            image: "./images/image1.png",
            caption: "Max planck after quantum physics"
        },
        1: {
            image: "./images/image2.png",
            caption: "Overkill"
        },
        2: {
            image: "./images/image3.png",
            caption: "Why are you here?"
        },
        3: {
            image: "./images/image4.png",
            caption: "Newtons first law"
        },
        4: {
            image: "./images/image5.png",
            caption: "Yes I'm an engineer"
        },
        5: {
            image: "./images/image6.png",
            caption: "Phyiscs is not math, but kinda"
        },
        6: {
            image: "./images/image7.png",
            caption: "Euler jumpscare!"
        },
        7: {
            image: "./images/image8.png",
            caption: "Semiwho?"
        },
        8: {
            image: "./images/image9.png",
            caption: "Sum vs integral"
        }
    }


    let currentIndex = 0;
    const imageElement = document.getElementById("meme-image");
    const memeCaption = document.getElementById("meme-caption");

    document.getElementById("btn-next").addEventListener("click", () => {
        console.log(currentIndex);
        currentIndex = (currentIndex + 1) % Object.keys(images).length;
        imageElement.src = images[currentIndex].image;
        memeCaption.textContent = images[currentIndex].caption;
    });

    document.getElementById("btn-prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + Object.keys(images).length) % Object.keys(images).length;
        imageElement.src = images[currentIndex].image;
        memeCaption.textContent = images[currentIndex].caption;
    });
});