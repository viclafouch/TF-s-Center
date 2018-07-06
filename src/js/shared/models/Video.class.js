export class Video {
    constructor(
        video = {}
    ) {
        this.categoryId = video.categoryId
        this.channelTitle = video.channelTitle
        this.description = video.description
        this.title = video.title
        this.isRemoved = video.isRemoved
        this.id = video.id
        this.channelId = video.channelId
        this.viewCount = video.viewCount
        this.publishedAt = video.publishedAt ? video.publishedAt : null
        this.thumbnails = video.thumbnails
        this.active = false
    }
}

export default Video