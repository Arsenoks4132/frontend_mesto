// Создание карточки

import { openModal } from './modal.js'
import { deleteCard, likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, user_id) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.setAttribute('id', card._id);

    cardElement.querySelector('.card__title').textContent = card.name;

    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like-amount');

    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    if (card.owner._id === user_id) {
        cardDeleteButton.addEventListener('click', (event) => {
            event.target.closest('.places__item').remove();
            deleteCard(card._id);
        });
    }
    else {
        cardDeleteButton.remove();
    }

    if (card.likes.some((item) => item._id === user_id)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeAmount.textContent = card.likes.length;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        let cardPromise;
        if (cardLikeButton.classList.contains('card__like-button_is-active')) {
            cardPromise = likeCard(card._id);
        }
        else {
            cardPromise = unlikeCard(card._id);
        }
        cardPromise.then((data) => { cardLikeAmount.textContent = data.likes.length })
    });

    return cardElement;
}

export { createCard };