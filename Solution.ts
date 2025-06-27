
function minimumPairRemoval(input: number[]): number {
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

function createQueue(input: number[]): QueueNode {
    let head = new QueueNode(Number.MAX_SAFE_INTEGER);
    let current = head;
    for (let value of input) {
        current.next = new QueueNode(value);
        current = current.next;
    }
    return head;
}

function findFirstMemberOfPairToRemove(head: QueueNode): QueueNode {
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

function updateQueue(firstMemberOfPairToRemove: QueueNode): void {
    firstMemberOfPairToRemove.value += firstMemberOfPairToRemove.next.value;
    firstMemberOfPairToRemove.next = firstMemberOfPairToRemove.next.next;
}

function isNondecreasingQueue(head: QueueNode): boolean {
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

    value: number;
    next: QueueNode;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}
