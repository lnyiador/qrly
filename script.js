const input = document.getElementById("qr-input");
const generateButton = document.getElementById("generate-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("qr-result");

generateButton.addEventListener("click", function () {
    const text = input.value.trim();

    if (text === "") {
        result.innerHTML = "<p>Please enter some text or a website link.</p>";
        return;
    }

    result.innerHTML = "";

    const qrContainer = document.createElement("div");
    result.appendChild(qrContainer);

    new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#4c1d95",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "⬇️ Download QR Code";
    result.appendChild(downloadButton);

    downloadButton.addEventListener("click", function () {
        const canvas = qrContainer.querySelector("canvas");

        if (!canvas) {
            alert("Please wait for your QR code to finish generating.");
            return;
        }

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "my-qr-code.png";
        link.click();
    });
});

clearButton.addEventListener("click", function () {
    input.value = "";
    result.innerHTML = "";
    input.focus();
});
