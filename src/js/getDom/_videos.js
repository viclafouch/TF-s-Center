import { Video } from "../shared/models/Video.class";

/**
 * Getting my all videos to an array
 * @return videos videos
 */

let videos = function getVideos() {
    const list = document.getElementsByClassName('deputy-flag-item yt-tile-default');

    const videos = []

    for (var item of list) {
        let creator, viewCount, channelLink = null;
        let nodeDescription = item.getElementsByClassName('deputy-item-description-summary')[0].innerHTML.trim();
        let textTitle = item.getElementsByTagName('h3')[0].textContent.trim();
        let url = item.getElementsByClassName('yt-uix-sessionlink ')[0].getAttribute('href');
        let thumbnail = item.getElementsByTagName('img')[0].getAttribute('src');
        let nodeVideo = item.getElementsByClassName('deputy-item-thumb-player')[0].innerHTML.trim();

        let isRemoved = item.getElementsByClassName('removed-on-text').length > 0;

        if (!isRemoved && item.getElementsByClassName('yt-user-name').length > 0) {
            creator = item.getElementsByClassName('yt-user-name')[0].textContent;
            channelLink = item.getElementsByClassName('yt-user-name')[0].getAttribute('href');
            viewCount = item.getElementsByClassName('viewcount')[0].textContent.replace(/\D+/g, '');
        } else {
            textTitle = nodeDescription = null;
        }

        videos.push(new Video({
            url: url,
            nodeVideo: nodeVideo,
            nodeDescription: nodeDescription,
            textTitle: textTitle,
            creator: creator,
            channelLink: channelLink,
            viewCount: viewCount,
            isRemoved: isRemoved,
            thumbnail: thumbnail
        }))
    }

    return videos;
}


export default videos