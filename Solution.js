
/**
 * @param {number[]} input
 * @return {number}
 */
var minimumPairRemoval = function (input) {
    let countPairRemoval = 0;
    if (input.length < 2) {
        return countPairRemoval;
    }

    let head = createQueue(input);
    while (!isNondecreasingQueue(head)) {
        let firstMemberOfPairToRemove = findFirstMemberOfPairToRemove(head);
        updateQueue(firstMemberOfPairToRemove);
        ++countPairRemoval;
    }

    return countPairRemoval;
};

/**
 * @param {number[]} input
 * @return {QueueNode}
 */
function createQueue(input) {
    let head = new QueueNode(Number.MAX_SAFE_INTEGER);
    let current = head;
    for (let value of input) {
        current.next = new QueueNode(value);
        current = current.next;
    }
    return head;
}

/**
 * @param {QueueNode} head
 * @return {QueueNode}
 */
function findFirstMemberOfPairToRemove(head) {
    let firstMember = null;
    let current = head.next;
    let minPairSum = Number.MAX_SAFE_INTEGER;

    while (current !== null) {
        if (current.next !== null && current.next.value + current.value < minPairSum) {
            firstMember = current;
            minPairSum = current.next.value + current.value;
        }
        current = current.next;
    }
    return firstMember;
}

/**
 * @param {QueueNode} firstMemberOfPairToRemove
 * @return {void}
 */
function updateQueue(firstMemberOfPairToRemove) {
    firstMemberOfPairToRemove.value += firstMemberOfPairToRemove.next.value;
    firstMemberOfPairToRemove.next = firstMemberOfPairToRemove.next.next;
}

/**
 * @param {QueueNode} head
 * @return {boolean}
 */
function isNondecreasingQueue(head) {
    let current = head.next;
    while (current !== null) {
        if (current.next !== null && current.next.value < current.value) {
            return false;
        }
        current = current.next;
    }
    return true;
}

class QueueNode {

    /**
     * @param {number} value
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
