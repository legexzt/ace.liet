def solve():
    class Node:
        def __init__(self, char, freq, left=None, right=None):
            self.char = char
            self.freq = freq
            self.left = left
            self.right = right
            self.code = ""

    s1 = "abcdef"
    f1 = [5, 9, 12, 13, 16, 45]

    s2 = "abcd"
    f2 = [10, 20, 30, 40]

    def build_and_print(s, f):
        nodes = []
        for i in range(len(s)):
            nodes.append(Node(s[i], f[i]))
        
        nodes.sort(key=lambda x: x.freq)
        q1 = nodes
        q2 = []

        def get_min():
            if not q1 and not q2:
                return None
            if not q1:
                return q2.pop(0)
            if not q2:
                return q1.pop(0)
            if q1[0].freq <= q2[0].freq:
                return q1.pop(0)
            else:
                return q2.pop(0)

        for _ in range(len(s) - 1):
            left = get_min()
            right = get_min()
            parent = Node('$', left.freq + right.freq, left, right)
            q2.append(parent)

        root = q2.pop(0)
        
        output = []
        def preorder(node, current_code):
            if not node:
                return
            if node.left is None and node.right is None:
                output.append(current_code)
                return
            preorder(node.left, current_code + "0")
            preorder(node.right, current_code + "1")

        preorder(root, "")
        print(" ".join(output))

    build_and_print(s1, f1)
    build_and_print(s2, f2)

solve()
