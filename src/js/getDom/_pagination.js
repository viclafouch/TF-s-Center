const paginations = function getPagination(root = document) {
  const pages = []

  root.querySelectorAll('[data-page]').forEach((e) => {
    pages.push({
      numPage: parseInt(e.getAttribute('data-page')),
      isNext: e.getAttribute('data-link-type') === 'next',
      isPrev: e.getAttribute('data-link-type') === 'prev',
      url: e.getAttribute('href'),
      isActual: e.classList.contains('yt-uix-button-toggled'),
    })
  })

  return pages
}

export default paginations
