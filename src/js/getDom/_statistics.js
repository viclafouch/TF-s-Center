let statistics = function getStatistics() {
    if (document.getElementsByTagName("a[href='/flagging_history']")) {
        let h1 = document.getElementsByTagName('h1')[0];

        let allFlagsNode = h1.nextSibling.nextSibling
        let allActionedNode = allFlagsNode.nextSibling.nextSibling

        let allFlagsNumber = parseInt(allFlagsNode.textContent.replace(/\D+/g, ''));
        let allActionedNumber = parseInt(allActionedNode.textContent.replace(/\D+/g, ''));

        return {
            allFlagged: allFlagsNumber,
            allActioned: allActionedNumber
        }
    }

    return null;
}

export default statistics;