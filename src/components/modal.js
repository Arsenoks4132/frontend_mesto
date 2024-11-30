// Работа с попапами

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

export { openModal, closeModal }