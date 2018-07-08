let user = function getUser() {
    let userNode = document.getElementById('yt-masthead-account-picker');

    if (userNode) {
        let avatar = userNode.getElementsByTagName('img')[0].getAttribute('src');

        let username = document.getElementsByClassName('yt-masthead-picker-name')[0].textContent;

        return { avatar, username }
    }

    return null
}

export default user;
