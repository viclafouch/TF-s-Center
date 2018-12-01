const statistics = function getStatistics() {
    if (document.getElementsByTagName("a[href='/flagging_history']")) {
        const h1 = document.getElementsByTagName('h1')[0];

        const allFlagsNode = h1.nextSibling.nextSibling
        const allActionedNode = allFlagsNode.nextSibling.nextSibling

        const allFlagsNumber = parseInt(allFlagsNode.textContent.replace(/\D+/g, ''));
        const allActionedNumber = parseInt(allActionedNode.textContent.replace(/\D+/g, ''));

        return {
            allFlagged: allFlagsNumber,
            allActioned: allActionedNumber
        }
    }

    return null;
}

export default statistics;