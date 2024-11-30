// Функции валидации форм

function showInputError(formElement, inputElement, errorMessage, inputClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    // inputElement.classList.add('popup__input_error');
    // errorElement.classList.add('popup__error-text_active');
    inputElement.classList.add(inputClass);
    errorElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, inputClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    // inputElement.classList.remove('popup__input_error');
    // errorElement.classList.remove('popup__error-text_active');
    inputElement.classList.remove(inputClass);
    errorElement.classList.remove(errorClass);
};

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((element) => (!element.validity.valid))
};

function toggleButtonState(inputList, buttonElement, buttonClass) {
    if (hasInvalidInput(inputList)) {
        // buttonElement.classList.add('popup__button_inactive');
        buttonElement.classList.add(buttonClass);
    }
    else {
        // buttonElement.classList.remove('popup__button_inactive');
        buttonElement.classList.remove(buttonClass);
    }
};

function setEventListeners(formElement, validationSettings) {
    // const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    // const buttonElement = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputClass));
    const buttonElement = formElement.querySelector(validationSettings.buttonClass);
    toggleButtonState(inputList, buttonElement, validationSettings.buttonInactiveClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings.inputErrorClass, validationSettings.errorClass);
            toggleButtonState(inputList, buttonElement, validationSettings.buttonInactiveClass);
        });
    });
};


function enableValidation(validationSettings) {
    // const formList = Array.from(document.querySelectorAll('.popup__form'));
    const formList = Array.from(document.querySelectorAll(validationSettings.formClass))
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings)
    });
};

export { enableValidation };