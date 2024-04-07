//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


// Define function to download an image
async function downloadImage(image) {
  try {
    const response = await fetch(image.url);
    if (!response.ok) {
      throw new Error(`Failed to load image's URL: ${image.url}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    throw new Error(`Failed to load image's URL: ${image.url}`);
  }
}

// Add event listener to button
btn.addEventListener("click", async () => {
  try {
    // Download images concurrently
    const imagePromises = images.map(downloadImage);
    const urls = await Promise.all(imagePromises);

    // Display images on the webpage
    output.innerHTML = ""; // Clear previous content
    urls.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      output.appendChild(img);
    });
  } catch (error) {
    console.error(error.message);
  }
});

