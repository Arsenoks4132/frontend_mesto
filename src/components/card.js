// Создание карточки

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, user_id) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.setAttribute('id', card._id);

    cardElement.querySelector('.card__title').textContent = card.name;

    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like-amount');

    if (card.owner._id !== user_id) {
        cardDeleteButton.remove();
    }

    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);

    if (card.likes.some(item => item._id === user_id)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeAmount.textContent = card.likes.length;

    return cardElement;
}

export { createCard };