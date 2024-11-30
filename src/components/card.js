// Создание карточки

import { openModal } from './modal.js'

const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = name;

    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

    cardDeleteButton.addEventListener('click', (event) => event.target.closest('.places__item').remove());

    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('card__like-button_is-active'));

    return cardElement;
}

export { createCard };