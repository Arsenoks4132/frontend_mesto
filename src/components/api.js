const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: 'ee88ed1c-1cf5-49d5-832b-347c2adf9b0c',
        'Content-Type': 'application/json'
    }
}

function sendRequest(urlPath, method, body) {
    const parameters = {
        method: method,
        headers: config.headers,
    }
    if (method !== 'GET') {
        parameters.body = JSON.stringify(body);
    }
    return fetch(`${config.baseUrl}/${urlPath}`, parameters)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function getInitialCards() {
    return sendRequest('cards', 'GET', {});
}

function getUserInfo() {
    return sendRequest('users/me', 'GET', {});
}

function deleteCard(cardId) {
    return sendRequest(`cards/${cardId}`, 'DELETE', {});
}

function likeCard(cardId) {
    return sendRequest(`cards/likes/${cardId}`, 'PUT', {});
}

function unlikeCard(cardId) {
    return sendRequest(`cards/likes/${cardId}`, 'DELETE', {});
}

function changeProfile(name, about) {
    return sendRequest(`users/me`, 'PATCH', {
        name: name,
        about: about
    });
}

function addCard(name, link) {
    return sendRequest(`cards`, 'POST', {
        name: name,
        link: link
    });
}

function changeAvatar(url) {
    return sendRequest(`users/me/avatar`, 'PATCH', {
        avatar: url
    });
}

export { getInitialCards, getUserInfo, deleteCard, likeCard, unlikeCard, changeProfile, addCard, changeAvatar }