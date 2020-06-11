const statistics = function getStatistics(root = document) {
  let statistics

  if (root.querySelector('#report-stats')) {
    const allFlagsNode = root.querySelectorAll('.report-stat')[1]
    const allActionedNode = root.querySelectorAll('.report-stat')[0]

    const allFlagsNumber = parseInt(allFlagsNode.textContent.replace(/\D+/g, ''))
    const allActionedNumber = parseInt(allActionedNode.textContent.replace(/\D+/g, ''))

    statistics = {
      allFlagged: allFlagsNumber,
      allActioned: allActionedNumber
    }
  }

  return { statistics }
}

export default statistics
