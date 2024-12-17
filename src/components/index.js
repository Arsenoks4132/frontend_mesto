import '../pages/index.css';

import { openModal, closeModal } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';
import { getInitialCards, getUserInfo, changeProfile, addCard, changeAvatar, likeCard, unlikeCard, deleteCard } from './api.js';

// -----Выбор элементов-----

// Профиль

const userName = document.querySelector('.profile__title');
const userText = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');

const profileFrom = profilePopup.querySelector('.popup__form');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileTextInput = profilePopup.querySelector('.popup__input_type_description');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const profileFormButton = profilePopup.querySelector('.popup__button');

// Аватар

const avatarPopup = document.querySelector('.popup_type_avatar');

const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_avatar');
const avatarFormButton = avatarPopup.querySelector('.popup__button');
const closeAvatarButton = avatarPopup.querySelector('.popup__close');

// Изображение

const imagePopup = document.querySelector('.popup_type_image');

const imageImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

// Места

const cardsList = document.querySelector('.places__list');

const addCardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');

const cardForm = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');
const cardFormButton = cardPopup.querySelector('.popup__button');

// -----Загрузка страницы-----

let userId;

Promise.all([getUserInfo(), getInitialCards()])
    .then(([thisUser, cards]) => {
        userName.textContent = thisUser.name;
        userText.textContent = thisUser.about;
        userAvatar.style.backgroundImage = `url(${thisUser.avatar})`;
        userId = thisUser._id;

        cards.forEach((item) => cardsList.append(createCard(item, userId)));
    })
    .catch(err => console.log(`Ошибка: ${err}`));

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const validationSettings = {
    formClass: '.popup__form',
    inputClass: '.popup__input',
    inputErrorClass: 'popup__input_error',
    buttonClass: '.popup__button',
    buttonInactiveClass: 'popup__button_inactive',
    errorClass: 'popup__error-text_active'
}

enableValidation(validationSettings);

// -----Функционал-----

function handleSubmit(requestPromise, popupElement, formButton, promiseFunc) {
    formButton.textContent = 'Сохранение...';
    requestPromise
        .then(promiseFunc)
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            closeModal(popupElement);
            formButton.textContent = 'Сохранить';
        });
}

// Форма профиля

function handleProfileFormSubmit(event) {
    event.preventDefault();

    handleSubmit(
        changeProfile(profileNameInput.value, profileTextInput.value),
        profilePopup,
        profileFormButton,
        userInfo => {
            userName.textContent = userInfo.name;
            userText.textContent = userInfo.about;
        }
    );
}

editProfileButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileTextInput.value = userText.textContent;
    openModal(profilePopup)
});

profileFrom.addEventListener('submit', handleProfileFormSubmit);
closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

// Форма аватара

function handleAvatarSubmit(event) {
    event.preventDefault();

    handleSubmit(
        changeAvatar(avatarUrlInput.value),
        avatarPopup,
        avatarFormButton,
        userInfo => { userAvatar.style.backgroundImage = `url(${userInfo.avatar})` }
    );
}

userAvatar.addEventListener('click', () => {
    avatarUrlInput.value = userAvatar.style.backgroundImage.slice(5, -2)
    openModal(avatarPopup);
});

avatarForm.addEventListener('submit', handleAvatarSubmit);
closeAvatarButton.addEventListener('click', () => closeModal(avatarPopup));

// Форма добавления карточки

function handleCardFormSubmit(event) {
    event.preventDefault();

    handleSubmit(
        addCard(cardNameInput.value, cardLinkInput.value),
        cardPopup,
        cardFormButton,
        data => cardsList.prepend(createCard(data, userId))
    );
}

addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup)
});

cardForm.addEventListener('submit', handleCardFormSubmit);
closeCardButton.addEventListener('click', () => closeModal(cardPopup));

// Изображение

closeImageButton.addEventListener('click', () => closeModal(imagePopup));



// -----Аггрегация листенеров-----

cardsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        imageImage.setAttribute('src', '');
        imageImage.setAttribute('src', event.target.src);
        imageCaption.textContent = event.target.alt;
        openModal(imagePopup);
    }
    else if (event.target.classList.contains('card__like-button')) {
        event.target.classList.toggle('card__like-button_is-active');
        const likedCard = event.target.closest('.places__item');
        const cardLikeAmount = likedCard.querySelector('.card__like-amount');
        let cardPromise;
        if (event.target.classList.contains('card__like-button_is-active')) {
            cardPromise = likeCard(likedCard.id);
        }
        else {
            cardPromise = unlikeCard(likedCard.id);
        }
        cardPromise
            .then(data => cardLikeAmount.textContent = data.likes.length)
            .catch(err => console.log(`Ошибка: ${err}`))
    }
    else if (event.target.classList.contains('card__delete-button')) {
        const likedCard = event.target.closest('.places__item');
        deleteCard(likedCard.id)
            .then(data => likedCard.remove())
            .catch(err => console.log(`Ошибка: ${err}`));
    }
});