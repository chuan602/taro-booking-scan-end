export const usernameCreater = (payload) => ({
    type: 'login/username',
    payload
});

export const passwordCreater = (payload) => ({
    type: 'login/password',
    payload
});
