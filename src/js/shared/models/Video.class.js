export class Video {
    constructor(
        video = {}
    ) {
        this.url = video.url
        this.nodeVideo = video.nodeVideo
        this.nodeDescription = video.nodeDescription
        this.textTitle = video.textTitle
        this.isRemoved = video.isRemoved
        this.id = null
        this.creator = video.creator
        this.channelLink = video.channelLink
        this.viewCount = video.viewCount
        this.thumbnail = video.thumbnail

        this.getId();
    }

    getId() {
        this.id = this.url.split("=")[1];
    }
}