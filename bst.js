class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }

  insert(data) {
    let root = this.root;
    let temp;
    const newNode = new Node(data);
    while (root !== null) {
      temp = root;
      if (newNode.data < root.data) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
    if (newNode.data < temp.data) {
      temp.left = newNode;
    } else {
      temp.right = newNode;
    }
  }

  delete(data) {
    let root = this.root;
    let temp;
    while (root !== null) {
      if (root.data === data) {
        break;
      }
      temp = root;
      if (data < root.data) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
    // if deleting a leaf
    if (root && root.left === null && root.right === null) {
      if (data < temp.data) {
        temp.left = null;
      } else {
        temp.right = null;
      }
      return;
    }
    // if root has one child
    if (root && (root.left === null || root.right === null)) {
      if (root.left !== null) {
        root = root.left;
      } else {
        root = root.right;
      }

      if (root.data < temp.data) {
        temp.left = root;
      } else {
        temp.right = root;
      }
      return;
    }
    // if root has two childs
    if (root && root.left !== null && root.right !== null) {
      let tempL = root.left;
      let tempR = root.right;
      let temp2;

      root = root.right;
      while (root.left !== null) {
        temp2 = root;
        root = root.left;
      }
      let rootChild = root.right;

      // if the first right child is the lowest
      if (root.data !== tempR.data) {
        temp2.left = null;
        root.right = tempR;
      }
      root.left = tempL;

      if (data === this.root.data) {
        this.root = root;
        temp2.left = rootChild;
      } else if (root.data < temp.data) {
        temp.left = root;
      } else {
        temp.right = root;
      }

      return;
    }
    // if cannot find node
    console.log("There's no such node");
    return;
  }

  find(data) {
    const _getNode = (node) => {
      if (node.data === data) return node;
    };
    const node = this.levelOrder(_getNode);
    if (node.length === 0) return null;
    return node;
  }

  levelOrder(func) {
    const queue = [];
    const arr = [];
    let node = this.root;
    if (node === null) return;
    queue.push(node);
    while (queue.length != 0) {
      const current = queue.shift();
      if (func !== undefined) {
        const value = func(current);
        if (value) return value;
      } else {
        arr.push(current.data);
      }
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    return arr;
  }

  preOrder(func, node = this.root, arr = []) {
    if (node === null) return;
    if (func !== undefined) {
      const value = func(node);
      if (value) return value;
    } else {
      arr.push(node.data);
    }
    this.preOrder(func, node.left, arr);
    this.preOrder(func, node.right, arr);
    return arr;
  }

  inOrder(func, node = this.root, arr = []) {
    if (node === null) return;
    this.inOrder(func, node.left, arr);
    if (func !== undefined) {
      const value = func(node);
      if (value) return value;
    } else {
      arr.push(node.data);
    }
    this.inOrder(func, node.right, arr);
    return arr;
  }

  postOrder(func, node = this.root, arr = []) {
    if (node === null) return;
    this.postOrder(func, node.left, arr);
    this.postOrder(func, node.right, arr);
    if (func !== undefined) {
      const value = func(node);
      if (value) return value;
    } else {
      arr.push(node.data);
    }
    return arr;
  }

  height(node) {
    if (node === null) return -1;
    const left = this.height(node.left);
    const right = this.height(node.right);
    return Math.max(left, right) + 1;
  }

  depth(node, root = this.root) {
    if (root === null) return -1;
    let count = -1;
    if (
      root === node ||
      (count = this.depth(node, root.left)) >= 0 ||
      (count = this.depth(node, root.right)) >= 0
    ) {
      return count + 1;
    }

    return count;
  }

  isBalanced() {
    const _checkBalance = (node) => {
      const dif = Math.abs(this.height(node.left) - this.height(node.right));
      if (dif > 1) {
        console.log("The tree is not balanced");
        return dif;
      }
    };
    const result = this.levelOrder(_checkBalance);
    if (result.length === 0) {
      console.log("The tree is balanced");
    }
  }

  rebalance() {
    const arr = this.levelOrder();
    const newRoot = buildTree(arr);
    this.root = newRoot;
  }
}

const removeDup = (arr) => {
  const unique = [...new Set(arr)];
  return unique;
};

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partition = (arr, low, high) => {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
};

const quickSort = (arr, low, high) => {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
};

const createBST = (arr, start, end) => {
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);
  const root = new Node(arr[mid]);

  root.left = createBST(arr, start, mid - 1);
  root.right = createBST(arr, mid + 1, end);

  return root;
};

const buildTree = (arr) => {
  const unique = removeDup(arr);
  let n = unique.length;
  quickSort(unique, 0, n - 1);
  const root = createBST(unique, 0, n - 1);
  return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "???   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "???   "}`, true);
  }
};

const createArr = (num) => {
  const arr = [];
  for (let i = 1; i < num; i++) {
    arr.push(Math.round(Math.random() * 99 + 1));
  }
  return arr;
};

const arr = createArr(16);
const tree = new Tree(buildTree(arr));
prettyPrint(tree.root);

tree.isBalanced();

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
prettyPrint(tree.root);

tree.isBalanced();

tree.rebalance();
prettyPrint(tree.root);

tree.isBalanced();

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
