const textarea = document.querySelector("textarea");
const btn = document.querySelector("button");
let isSpeaking = false;

const textToSpeech = () => {
    const synth = window.speechSynthesis;
    const text = textarea.value.trim(); // Trim to remove any unnecessary whitespace

    if (!synth.speaking && text) {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
        btn.innerText = "Pause";
        isSpeaking = true;
        
        utterance.onend = () => {
            isSpeaking = false;
            btn.innerText = "Convert to Speech";
        };
    }

    if (text.length > 50) {
        if (synth.speaking) {
            if (isSpeaking) {
                btn.innerText = "Pause";
                synth.resume();
                isSpeaking = false;
            } else {
                btn.innerText = "Resume";
                synth.pause();
                isSpeaking = true;
            }
        }
    } else {
        btn.innerText = "Speaking";
    }

    setInterval(() => {
        if (!synth.speaking && isSpeaking) {
            isSpeaking = false;
            btn.innerText = "Convert to Speech";
        }
    }, 1000); // Check every second
};

btn.addEventListener("click", textToSpeech);
