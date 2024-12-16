const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: 'ee88ed1c-1cf5-49d5-832b-347c2adf9b0c',
        'Content-Type': 'application/json'
    }
}

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function changeProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function changeAvatar(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

export { getInitialCards, getUserInfo, deleteCard, likeCard, unlikeCard, changeProfile, addCard, changeAvatar }