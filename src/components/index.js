import '../pages/index.css';

import { openModal, closeModal } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';
import { getInitialCards, getUserInfo, changeProfile, addCard, changeAvatar } from './api.js';

// Пользователь

const thisUser = await getUserInfo().then((data) => data);

// Профиль

function handleProfileFormSubmit(event) {
    event.preventDefault();

    profileFormButton.textContent = "Сохранение...";

    changeProfile(profileNameInput.value, profileTextInput.value)
        .then(userInfo => {
            userName.textContent = userInfo.name;
            userText.textContent = userInfo.about;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            closeModal(profilePopup);
            profileFormButton.textContent = "Сохранить";
        });
}

const userName = document.querySelector('.profile__title');
const userText = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

userName.textContent = thisUser.name;
userText.textContent = thisUser.about;
userAvatar.style.backgroundImage = `url(${thisUser.avatar})`;

const editProfileButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');

const profileFrom = profilePopup.querySelector('.popup__form');

const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileTextInput = profilePopup.querySelector('.popup__input_type_description');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const profileFormButton = profilePopup.querySelector('.popup__button');


const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_avatar');
const avatarFormButton = avatarPopup.querySelector('.popup__button');

userAvatar.addEventListener('click', () => {
    avatarUrlInput.value = userAvatar.style.backgroundImage.slice(5, -2)
    openModal(avatarPopup);
});

editProfileButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileTextInput.value = userText.textContent;
    openModal(profilePopup)
});

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

profileFrom.addEventListener('submit', handleProfileFormSubmit);

function handleAvatarSubmit(event) {
    event.preventDefault();

    avatarFormButton.textContent = "Сохранение...";

    changeAvatar(avatarUrlInput.value)
        .then(userInfo => {
            userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            closeModal(avatarPopup);
            avatarFormButton.textContent = "Сохранить";
        });
}

avatarForm.addEventListener('submit', handleAvatarSubmit);

// Изображение

const imagePopup = document.querySelector('.popup_type_image');

const imageImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

closeImageButton.addEventListener('click', () => closeModal(imagePopup));



// Карточки

const cardsList = document.querySelector('.places__list');

function handleCardFormSubmit(event) {
    event.preventDefault();

    cardFormButton.textContent = "Сохранение...";

    addCard(cardNameInput.value, cardLinkInput.value)
        .then(data => {
            cardsList.prepend(createCard(data, thisUser._id))
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            closeModal(cardPopup);
            cardFormButton.textContent = "Сохранить";
        });

    closeModal(cardPopup);
}

const addCardButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('.popup_type_new-card');

const cardFrom = cardPopup.querySelector('.popup__form');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');
const cardFormButton = cardPopup.querySelector('.popup__button');


addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup)
});

closeCardButton.addEventListener('click', () => closeModal(cardPopup));

cardFrom.addEventListener('submit', handleCardFormSubmit);


cardsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        imageImage.setAttribute('src', '');
        imageImage.setAttribute('src', event.target.src);
        imageCaption.textContent = event.target.alt;
        openModal(imagePopup);
    }
});


// Загрузка страницы

getInitialCards()
    .then((data) => {
        data.forEach((item) => cardsList.append(createCard(item, thisUser._id)));
    });

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