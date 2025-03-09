async function convertToMp3() {
    const videoUrl = document.getElementById("videoUrl").value;
    const messageDiv = document.getElementById("message");

    if (!videoUrl) {
        messageDiv.innerHTML = "<p class='error'>Please enter a YouTube URL.</p>";
        return;
    }

    messageDiv.innerHTML = "<p class='loading'>Converting... Please wait.</p>";

    try {
        const response = await fetch(`http://localhost:3000/convert?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (data.error) {
            messageDiv.innerHTML = `<p class='error'>Error: ${data.error}</p>`;
        } else {
            messageDiv.innerHTML = `<p class='success'>Download your MP3: <a href="${data.download_url}" target="_blank">Click here</a></p>`;
        }
    } catch (error) {
        messageDiv.innerHTML = `<p class='error'>An error occurred. Please try again.</p>`;
    }
}
