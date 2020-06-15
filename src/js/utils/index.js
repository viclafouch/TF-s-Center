export const randomId = () => Math.floor(Math.random() * 1000000)

export const redirectToWebCache = (link, newTab = true) =>
  window.open(`http://webcache.googleusercontent.com/search?q=cache:${link}`, newTab ? '_blank' : '')

export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))
