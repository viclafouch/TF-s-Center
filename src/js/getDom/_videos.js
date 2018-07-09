import { Video } from "../shared/models/Video.class";

/**
 * Getting my all videos to an array
 * @return videos videos
 */

let videos = function getVideos() {
    const list = document.getElementsByClassName('deputy-flag-item yt-tile-default');

    const videos = []

    for (var item of list) {
        let channelTitle, channelUrl, videoAddedTime, viewCount = null;
        let title = item.getElementsByTagName('h3')[0].textContent.trim();
        let description = item.getElementsByClassName('deputy-item-description-summary')[0].innerHTML.trim();
        let id = item.getElementsByClassName('yt-uix-sessionlink ')[0].getAttribute('href').split('=')[1]

        let isRemoved = item.getElementsByClassName('removed-on-text').length > 0;
        let isReviewed = item.getElementsByClassName('reviewed-on-text').length > 0;

        if (!isRemoved && item.getElementsByClassName('yt-user-name').length > 0) {
            videoAddedTime = item.getElementsByClassName('video-date-added')[0].textContent;
            channelTitle = item.getElementsByClassName('yt-user-name')[0].textContent;
            channelUrl = item.getElementsByClassName('yt-user-name')[0].getAttribute('href');
            viewCount = item.getElementsByClassName('viewcount')[0].textContent
        } else {
            title = null;
        }

        videos.push(new Video({
            title: title,
            channelTitle: channelTitle,
            channelUrl: channelUrl,
            viewCount: viewCount,
            id: id,
            videoAddedTime: videoAddedTime,
            description: description,
            isReviewed: isReviewed,
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/"+id+"/default.jpg",
                    width: 120,
                    height: 90
                },
                medium: {
                    url: "https://i.ytimg.com/vi/"+id+"/mqdefault.jpg",
                    width: 320,
                    height: 180
                },
                high: {
                    url: "https://i.ytimg.com/vi/"+id+"/hqdefault.jpg",
                    width: 480,
                    height: 360
                },
                standard: {
                    url: "https://i.ytimg.com/vi/"+id+"/sddefault.jpg",
                    width: 640,
                    height: 480
                },
                maxres: {
                    url: "https://i.ytimg.com/vi/"+id+"/maxresdefault.jpg",
                    width: 1280,
                    height: 720
                }
            },
            isRemoved: isRemoved,
        }))
    }

    return videos;
}


export default videos