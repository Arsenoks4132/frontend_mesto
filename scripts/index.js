import { initialCards } from './cards.js';

// Общие функции

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}



// Профиль

function handleProfileFormSubmit(event) {
    event.preventDefault();

    userName.textContent = profileNameInput.value;
    userText.textContent = profileTextInput.value;

    closeModal(profilePopup);
}

const userName = document.querySelector('.profile__title');
const userText = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');

const profileFrom = profilePopup.querySelector('.popup__form');

const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileTextInput = profilePopup.querySelector('.popup__input_type_description');
const closeProfileButton = profilePopup.querySelector('.popup__close');


editProfileButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileTextInput.value = userText.textContent;
    openModal(profilePopup)
});

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

profileFrom.addEventListener('submit', handleProfileFormSubmit);



// Изображение

const imagePopup = document.querySelector('.popup_type_image');

const imageImage = imagePopup.querySelector('.popup__image');
const closeImageButton = imagePopup.querySelector('.popup__close');

closeImageButton.addEventListener('click', () => closeModal(imagePopup));



// Карточки

const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = name;

    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name.toLowerCase());

    cardImage.addEventListener('click', () => {
        imageImage.setAttribute('src', '');
        imageImage.setAttribute('src', link);
        openModal(imagePopup);
    });

    cardDeleteButton.addEventListener('click', (event) => event.target.closest('.places__item').remove());

    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('card__like-button_is-active'));

    return cardElement;
}

function handleCardFormSubmit(event) {
    event.preventDefault();

    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));

    closeModal(cardPopup);
}

const addCardButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('.popup_type_new-card');

const cardFrom = cardPopup.querySelector('.popup__form');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');


addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup)
});

closeCardButton.addEventListener('click', () => closeModal(cardPopup));

cardFrom.addEventListener('submit', handleCardFormSubmit);



// Загрузка страницы

initialCards.forEach((item) => cardsList.append(createCard(item.name, item.link)));

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');