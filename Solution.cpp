
#include <span>
#include <vector>
using namespace std;

class Solution {

    struct QueueNode {
        int value;
        shared_ptr<QueueNode> next{};
        QueueNode(int value) : value{ value } {}
    };

public:
    int minimumPairRemoval(const vector<int>& input) const {
        int countPairRemoval = 0;
        if (input.size() < 2) {
            return countPairRemoval;
        }

        shared_ptr<QueueNode> head = createQueue(input);
        while (!isNondecreasingQueue(head)) {
            shared_ptr<QueueNode> firstMemberOfPairToRemove = findFirstMemberOfPairToRemove(head);
            updateQueue(firstMemberOfPairToRemove);
            ++countPairRemoval;
        }

        return countPairRemoval;
    }

private:
    shared_ptr<QueueNode> createQueue(span<const int> input) const {
        shared_ptr<QueueNode>  head = make_shared<QueueNode>(numeric_limits<int>::max());
        shared_ptr<QueueNode>  current = head;
        for (int value : input) {
            current->next = make_shared<QueueNode>(value);
            current = current->next;
        }
        return head;
    }

    shared_ptr<QueueNode> findFirstMemberOfPairToRemove(shared_ptr<QueueNode> head) const {
        shared_ptr<QueueNode> firstMember{};
        shared_ptr<QueueNode> current = head->next;
        int minPairSum = numeric_limits<int>::max();

        while (current != nullptr) {
            if (current->next != nullptr && current->next->value + current->value < minPairSum) {
                firstMember = current;
                minPairSum = current->next->value + current->value;
            }
            current = current->next;
        }
        return firstMember;
    }

    void updateQueue(shared_ptr<QueueNode> firstMemberOfPairToRemove) const {
        firstMemberOfPairToRemove->value += firstMemberOfPairToRemove->next->value;
        firstMemberOfPairToRemove->next = firstMemberOfPairToRemove->next->next;
    }

    bool isNondecreasingQueue(shared_ptr<QueueNode> head) const {
        shared_ptr<QueueNode> current = head->next;
        while (current != nullptr) {
            if (current->next != nullptr && current->next->value < current->value) {
                return false;
            }
            current = current->next;
        }
        return true;
    }
};
