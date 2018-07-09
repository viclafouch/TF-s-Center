import moment from 'moment'

export class Video {
    constructor(
        video = {}
    ) {
        this.categoryId = video.categoryId
        this.channelTitle = video.channelTitle
        this.description = video.description
        this.videoAddedTime = video.videoAddedTime
        this.viewCount = video.viewCount
        this.title = video.title
        this.id = video.id
        this.channelUrl = video.channelUrl
        this.channelId = video.channelId
        this.publishedAt = video.publishedAt ? moment(video.publishedAt) : null
        this.thumbnails = video.thumbnails
        this.tags = video.tags || []
        this.active = true
        this.isRemoved = video.isRemoved || false
        this.isReviewed = video.isReviewed || false
    }

    getVideoUrl() {
        return `/watch?v=${this.id}`
    }
}

export default Video