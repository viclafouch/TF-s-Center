const user = function getUser() {
    const userNode = document.getElementById('yt-masthead-account-picker');

    if (userNode) {
        const avatar = userNode.getElementsByTagName('img')[0].getAttribute('src');
        const username = document.getElementsByClassName('yt-masthead-picker-name')[0].textContent;
        return { avatar, username }
    }

    return null
}

export default user;
