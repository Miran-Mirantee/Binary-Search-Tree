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

  find(data) {}

  levelOrder(func) {
    // if no function given
    if (func === undefined) {
      const queue = [];
      const arr = [];
      let node = this.root;
      if (node === null) return;
      queue.push(node);
      while (queue.length != 0) {
        const current = queue.shift();
        arr.push(current.data);
        if (current.left !== null) {
          queue.push(current.left);
        }
        if (current.right !== null) {
          queue.push(current.right);
        }
      }
      return arr;
    }
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
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 320];
const arr2 = [50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36];
const root = buildTree(arr);
const root2 = buildTree(arr2);
const tree = new Tree(root);
const tree2 = new Tree(root2);

// prettyPrint(tree.root);
// console.log("----------------------------");
// tree.delete(8);
// prettyPrint(tree.root);

prettyPrint(tree2.root);
// const order = tree2.levelOrder(() => {
//   console.log("test");
// });
const order = tree2.levelOrder();
console.log(order);
