
class Solution {
    
    fun minimumPairRemoval(input: IntArray): Int {
        var countPairRemoval = 0
        if (input.size < 2) {
            return countPairRemoval
        }

        val head: QueueNode = createQueue(input)
        while (!isNondecreasingQueue(head)) {
            val firstMemberOfPairToRemove: QueueNode = findFirstMemberOfPairToRemove(head)!!
            updateQueue(firstMemberOfPairToRemove)
            ++countPairRemoval
        }

        return countPairRemoval
    }

    private fun createQueue(input: IntArray): QueueNode {
        val head = QueueNode(Int.MAX_VALUE)
        var current = head
        for (value in input) {
            current.next = QueueNode(value)
            current = current.next!!
        }
        return head
    }

    private fun findFirstMemberOfPairToRemove(head: QueueNode): QueueNode? {
        var firstMember: QueueNode? = null
        var current = head.next
        var minPairSum = Int.MAX_VALUE

        while (current != null) {
            if (current.next != null && current.next!!.value + current.value < minPairSum) {
                firstMember = current
                minPairSum = current.next!!.value + current.value
            }
            current = current.next
        }
        return firstMember
    }

    private fun updateQueue(firstMemberOfPairToRemove: QueueNode) {
        firstMemberOfPairToRemove.value += firstMemberOfPairToRemove.next!!.value
        firstMemberOfPairToRemove.next = firstMemberOfPairToRemove.next!!.next
    }

    private fun isNondecreasingQueue(head: QueueNode): Boolean {
        var current = head.next
        while (current != null) {
            if (current.next != null && current.next!!.value < current.value) {
                return false
            }
            current = current.next
        }
        return true
    }
}

class QueueNode(var value: Int) {
    var next: QueueNode? = null
}
