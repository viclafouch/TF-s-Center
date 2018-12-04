const user = function getUser() {
    let user;
    const userNode = document.getElementById('yt-masthead-account-picker');

    if (userNode) {
        const avatar = userNode.getElementsByTagName('img')[0].getAttribute('src');
        const username = document.getElementsByClassName('yt-masthead-picker-name')[0].textContent;
        user = { avatar, username }
    }

    return { user }
}

export default user;
