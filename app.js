document.addEventListener('DOMContentLoaded', () => {
  const dogImageContainer = document.getElementById('dog-image-container');
  const fetchDogImageButton = document.getElementById('fetch-dog-image-button');
  const previousButton = document.getElementById('previous-button');
  const errorMessage = document.createElement('p');
  errorMessage.style.color = 'red';

  let currentImage = null;
  let previousImage = null;

  fetchDogImageButton.addEventListener('click', () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const img = document.createElement('img');
          img.src = data.message;
          img.alt = 'Random Dog';
          img.classList.add('dog-image');
          dogImageContainer.innerHTML = '';
          dogImageContainer.appendChild(img);
          previousImage = currentImage; // Store current image as previous image
          currentImage = data.message; // Update current image URL

          // Change background image dynamically
          document.body.style.backgroundImage = `url(${data.message})`;
        } else {
          errorMessage.textContent = 'Failed to fetch dog image. Please try again.';
          dogImageContainer.innerHTML = '';
          dogImageContainer.appendChild(errorMessage);
        }
      })
      .catch(error => {
        errorMessage.textContent = 'Error fetching dog image. Please check your connection and try again.';
        dogImageContainer.innerHTML = '';
        dogImageContainer.appendChild(errorMessage);
        console.error('Error fetching dog image:', error);
      });
  });

  previousButton.addEventListener('click', () => {
    if (previousImage) {
      const img = document.createElement('img');
      img.src = previousImage;
      img.alt = 'Previous Dog';
      img.classList.add('dog-image');
      dogImageContainer.innerHTML = '';
      dogImageContainer.appendChild(img);
      currentImage = previousImage; // Update current image to previous image URL

      // Change background image to previous image dynamically
      document.body.style.backgroundImage = `url(${previousImage})`;
    }
  });
});
