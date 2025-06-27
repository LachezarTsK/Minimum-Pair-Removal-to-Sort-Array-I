
package main
import "math"

func minimumPairRemoval(input []int) int {
    countPairRemoval := 0
    if len(input) < 2 {
        return countPairRemoval
    }

    var head *QueueNode = createQueue(input)
    for !isNondecreasingQueue(head) {
        var firstMemberOfPairToRemove *QueueNode = findFirstMemberOfPairToRemove(head)
        updateQueue(firstMemberOfPairToRemove)
        countPairRemoval++
    }

    return countPairRemoval
}

func createQueue(input []int) *QueueNode {
    var head *QueueNode = NewQueueNode(math.MaxInt)
    current := head
    for _, value := range input {
        current.next = NewQueueNode(value)
        current = current.next
    }
    return head
}

func findFirstMemberOfPairToRemove(head *QueueNode) *QueueNode {
    var firstMember *QueueNode
    current := head.next
    minPairSum := math.MaxInt

    for current != nil {
        if current.next != nil && current.next.value+current.value < minPairSum {
            firstMember = current
            minPairSum = current.next.value + current.value
        }
        current = current.next
    }
    return firstMember
}

func updateQueue(firstMemberOfPairToRemove *QueueNode) {
    firstMemberOfPairToRemove.value += firstMemberOfPairToRemove.next.value
    firstMemberOfPairToRemove.next = firstMemberOfPairToRemove.next.next
}

func isNondecreasingQueue(head *QueueNode) bool {
    current := head.next
    for current != nil {
        if current.next != nil && current.next.value < current.value {
            return false
        }
        current = current.next
    }
    return true
}

type QueueNode struct {
    value int
    next  *QueueNode
}

func NewQueueNode(value int) *QueueNode {
    queueNode := &QueueNode{
        value: value,
        next:  nil,
    }
    return queueNode
}
