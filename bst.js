class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
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

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const root = buildTree(arr);
prettyPrint(root);
