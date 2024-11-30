import { initialCards } from './cards.js';

// Общие функции

function closeByOverlay(event) {
    closeModal(event.target);
}

function addOverlayListener() {
    const popup = document.querySelector('.popup_is-opened');
    popup.addEventListener('click', closeByOverlay);
}

function removeOverlayListener() {
    const popup = document.querySelector('.popup_is-opened');
    popup.removeEventListener('click', closeByOverlay);
}

function closeByEscape(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');

    const popupContent = popup.querySelector('.popup__content');

    document.addEventListener('keydown', closeByEscape);

    popup.addEventListener('click', closeByOverlay);
    popupContent.addEventListener('mouseleave', addOverlayListener);
    popupContent.addEventListener('mouseenter', removeOverlayListener);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    const popupContent = popup.querySelector('.popup__content');
    popup.removeEventListener('click', closeByOverlay);
    popupContent.removeEventListener('mouseleave', addOverlayListener);
    popupContent.removeEventListener('mouseenter', removeOverlayListener);
    document.removeEventListener('keydown', closeByEscape);
}



// Функции валидации форм

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('popup__input_error');
    errorElement.classList.add('popup__error-text_active');
};

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__error-text_active');
};

function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((element) => (!element.validity.valid))
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
    }
    else {
        buttonElement.classList.remove('popup__button_inactive');
    }
};

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};



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

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    setEventListeners(formElement);
}); 