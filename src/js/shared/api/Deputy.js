export const fetchHistory = () =>
  fetch('https://www.youtube.com/flagging_history')
    .then(StreamResponse => StreamResponse.text())
    .then(StringReponse => {
      const fragment = document.createElement('div')
      fragment.innerHTML = StringReponse
      return getVideos(fragment)
    })