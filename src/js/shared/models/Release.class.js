export class Release {
  constructor(
    release = {}
  ) {
    this.id = release.id
    this.name = release.name
    this.created_at = new Date(release.created_at)
    this.url = release.html_url
    this.body = this.bodyToList(release.body)
  }

  bodyToList(body) {
    return body.split(new RegExp(['\\* ', '\\n'].join('|'), 'g')).filter(e => e.trim())
  }
}

export default Release