
using System;

public class Solution
{
    public int MinimumPairRemoval(int[] input)
    {
        int countPairRemoval = 0;
        if (input.Length < 2)
        {
            return countPairRemoval;
        }

        QueueNode head = CreateQueue(input);
        while (!IsNondecreasingQueue(head))
        {
            QueueNode firstMemberOfPairToRemove = FindFirstMemberOfPairToRemove(head);
            UpdateQueue(firstMemberOfPairToRemove);
            ++countPairRemoval;
        }

        return countPairRemoval;
    }

    private QueueNode CreateQueue(int[] input)
    {
        QueueNode head = new QueueNode(int.MaxValue);
        QueueNode current = head;
        foreach (int value in input)
        {
            current.next = new QueueNode(value);
            current = current.next;
        }
        return head;
    }

    private QueueNode FindFirstMemberOfPairToRemove(QueueNode head)
    {
        QueueNode firstMember = null;
        QueueNode current = head.next;
        int minPairSum = int.MaxValue;

        while (current != null)
        {
            if (current.next != null && current.next.value + current.value < minPairSum)
            {
                firstMember = current;
                minPairSum = current.next.value + current.value;
            }
            current = current.next;
        }
        return firstMember;
    }

    private void UpdateQueue(QueueNode firstMemberOfPairToRemove)
    {
        firstMemberOfPairToRemove.value += firstMemberOfPairToRemove.next.value;
        firstMemberOfPairToRemove.next = firstMemberOfPairToRemove.next.next;
    }

    private bool IsNondecreasingQueue(QueueNode head)
    {
        QueueNode current = head.next;
        while (current != null)
        {
            if (current.next != null && current.next.value < current.value)
            {
                return false;
            }
            current = current.next;
        }
        return true;
    }
}

class QueueNode
{
    public int value;
    public QueueNode next;

    public QueueNode(int value)
    {
        this.value = value;
    }
}
