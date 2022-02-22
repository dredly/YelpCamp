const ratingForm = document.querySelector('#rating-form');
const starsFeedback = document.querySelector('#stars-feedback');
const zeroStars = document.querySelector('#no-rate');

ratingForm.addEventListener('submit', function (event) {
    if (zeroStars.checked) {
        event.preventDefault();
        event.stopPropagation();
        starsFeedback.innerText = 'Make sure you have selected a rating between 1 and 5 stars';
        starsFeedback.classList.add('text-danger');
        starsFeedback.classList.add('boldfont');
    }
})