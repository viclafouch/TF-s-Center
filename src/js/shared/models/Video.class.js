export class Video {
    constructor(
        video = {}
    ) {
        this.url = video.url
        this.nodeVideo = video.nodeVideo
        this.nodeDescription = video.nodeDescription
        this.textTitle = video.textTitle
    }
}