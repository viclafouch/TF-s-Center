export const randomId = () => Math.floor(Math.random() * 1000000)

export const redirectToWebCache = (link, newTab = true) =>
  window.open(`http://webcache.googleusercontent.com/search?q=cache:${link}`, newTab ? '_blank' : '')

export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

export const serializeForm = formElement => {
  const formData = new FormData(formElement)
  return Object.fromEntries(
    Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)])
  )
}

export const orderByDesc = (templates, key) => [...templates].sort((a, b) => new Date(b[key]) - new Date(a[key]))

export const shuffle = array =>
  array
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
