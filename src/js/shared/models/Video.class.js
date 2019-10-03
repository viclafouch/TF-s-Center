export class Video {
  constructor(video = {}) {
    this.categoryId = video.categoryId
    this.channelTitle = video.channelTitle
    this.description = video.description
    this.videoAddedTime = video.videoAddedTime
    this.viewCount = video.viewCount
    this.title = video.title
    this.id = video.id
    this.channelUrl = video.channelUrl
    this.channelId = video.channelId
    this.publishedAt = video.publishedAt ? new Date(video.publishedAt) : new Date()
    this.tags = video.tags || []
    this.active = true
    this.isRemoved = video.isRemoved || false
    this.isReviewed = video.isReviewed || false
    this.isAgeRestricted = video.isAgeRestricted || false
    this.selected = false
    this.getThumbnail()
  }

  getThumbnail() {
    this.thumbnails = {
      default: {
        url: `https://i.ytimg.com/vi/${this.id}/default.jpg`,
        width: 120,
        height: 90
      },
      medium: {
        url: `https://i.ytimg.com/vi/${this.id}/mqdefault.jpg`,
        width: 320,
        height: 180
      },
      high: {
        url: `https://i.ytimg.com/vi/${this.id}/hqdefault.jpg`,
        width: 480,
        height: 360
      },
      standard: {
        url: `https://i.ytimg.com/vi/${this.id}/sddefault.jpg`,
        width: 640,
        height: 480
      },
      maxres: {
        url: `https://i.ytimg.com/vi/${this.id}/maxresdefault.jpg`,
        width: 1280,
        height: 720
      }
    }
  }

  getVideoUrl() {
    return `/watch?v=${this.id}`
  }

  getVideoEmbed() {
    return `https://www.youtube-nocookie.com/embed/${this.id}?autoplay=1&rel=0&showinfo=0&iv_load_policy=3`
  }
}

export default Video
