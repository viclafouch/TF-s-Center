const statistics = function getStatistics(root = document) {
    let statistics;
    if (root.getElementsByTagName("a[href='/flagging_history']")) {
        const h1 = root.getElementsByTagName('h1')[0];

        const allFlagsNode = h1.nextSibling.nextSibling
        const allActionedNode = allFlagsNode.nextSibling.nextSibling

        const allFlagsNumber = parseInt(allFlagsNode.textContent.replace(/\D+/g, ''));
        const allActionedNumber = parseInt(allActionedNode.textContent.replace(/\D+/g, ''));

        statistics = {
            allFlagged: allFlagsNumber,
            allActioned: allActionedNumber
        }
    }

  return { statistics };
}

export default statistics;