// Inisialisasi EmailJS dengan Public Key
emailjs.init("JsEk-JYl5TT3jFm9j"); // Ganti dengan Public Key dari EmailJS

let selectedAnswer = ""; // Menyimpan jawaban yang dipilih
let lastQuestion = ""; // Menyimpan pertanyaan terakhir

const messages = [
    "Are you sure?",
    "I will be very very very sad...",
    "If you say no, I will be really sad... :("
];

let messageIndex = 0;
let noClickCount = 0;

function handleResponse(answer) {
    let questionText = document.getElementById("question");
    let buttonsDiv = document.getElementById("buttons");
    let gifImage = document.getElementById("gif");
    let messageBox = document.getElementById("messageBox");

    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    selectedAnswer = answer;
    lastQuestion = questionText.textContent;

    if (answer === 'yes') {
        questionText.textContent = "Hehe, thank you! Do you have a message for me? And I have flowers for you too!";
        buttonsDiv.style.display = "none";
        gifImage.src = "https://media.tenor.com/ASn97P78H1MAAAAi/peach-cat-goma.gif";
        messageBox.classList.remove("hidden");
    } else {
        if (noClickCount < 3) {
            noButton.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;

            const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
            yesButton.style.fontSize = `${currentSize * 2.2}px`;

            noClickCount++;
        } else {
            questionText.textContent = "...Why? Can you at least tell me the reason? And can I still send you flowers to your home?";
            buttonsDiv.style.display = "none";
            gifImage.src = "https://media1.tenor.com/m/sVPaeSrkl6oAAAAd/cat-sad.gif";
            messageBox.classList.remove("hidden");
        }
    }
}

function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let message = messageInput.value.trim();
    let questionText = document.getElementById("question");
    let gifImage = document.getElementById("gif");
    let flowersBox = document.getElementById("flowersBox");

    if (message === "") {
        alert("Please write a message before sending!");
        return;
    }

    // Kirim email menggunakan EmailJS
    emailjs.send("service_r5at5z8", "template_sj1za8k", {
        question: lastQuestion,
        answer: selectedAnswer,
        message: message
    }).then(
        function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Your message has been sent!");
        },
        function(error) {
            console.log("FAILED...", error);
            alert("Failed to send message.");
        }
    );

    // Hapus message box dan tampilkan bunga
    questionText.textContent = "I still have a flower for you in here too, let's open it!";
    gifImage.src = "https://media.tenor.com/jvsVBSMabc4AAAAe/rose-cat-give-give-rose-to-cat.png";
    messageBox.remove();

    setTimeout(() => {
        flowersBox.classList.remove("hidden");
    }, 1000);
}

function handleFlowersClick() {
    window.location.href = "flowers.html";
}
