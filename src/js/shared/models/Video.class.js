export class Video {
    constructor(
        video = {}
    ) {
        this.categoryId = video.categoryId
        this.channelTitle = video.channelTitle
        this.description = video.description
        this.title = video.title
        this.id = video.id
        this.channelId = video.channelId
        this.viewCount = video.viewCount
        this.publishedAt = video.publishedAt ? video.publishedAt : null
        this.thumbnails = video.thumbnails
        this.active = true
        this.isRemoved = video.isRemoved
    }

    getVideoUrl() {
        return `/watch?v=${this.id}`
    }

    getChannelUrl() {
        return `${this.channelId}`
    }
}

export default Video