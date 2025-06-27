
public class Solution {

    public int minimumPairRemoval(int[] input) {
        int countPairRemoval = 0;
        if (input.length < 2) {
            return countPairRemoval;
        }

        QueueNode head = createQueue(input);
        while (!isNondecreasingQueue(head)) {
            QueueNode firstMemberOfPairToRemove = findFirstMemberOfPairToRemove(head);
            updateQueue(firstMemberOfPairToRemove);
            ++countPairRemoval;
        }

        return countPairRemoval;
    }

    private QueueNode createQueue(int[] input) {
        QueueNode head = new QueueNode(Integer.MAX_VALUE);
        QueueNode current = head;
        for (int value : input) {
            current.next = new QueueNode(value);
            current = current.next;
        }
        return head;
    }

    private QueueNode findFirstMemberOfPairToRemove(QueueNode head) {
        QueueNode firstMember = null;
        QueueNode current = head.next;
        int minPairSum = Integer.MAX_VALUE;

        while (current != null) {
            if (current.next != null && current.next.value + current.value < minPairSum) {
                firstMember = current;
                minPairSum = current.next.value + current.value;
            }
            current = current.next;
        }
        return firstMember;
    }

    private void updateQueue(QueueNode firstMemberOfPairToRemove) {
        firstMemberOfPairToRemove.value += firstMemberOfPairToRemove.next.value;
        firstMemberOfPairToRemove.next = firstMemberOfPairToRemove.next.next;
    }

    private boolean isNondecreasingQueue(QueueNode head) {
        QueueNode current = head.next;
        while (current != null) {
            if (current.next != null && current.next.value < current.value) {
                return false;
            }
            current = current.next;
        }
        return true;
    }
}

class QueueNode {

    int value;
    QueueNode next;

    QueueNode(int value) {
        this.value = value;
    }
}
