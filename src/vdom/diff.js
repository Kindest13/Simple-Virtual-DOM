import render from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // deleting attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  return ($node) => {
    return $node;
  };
};

export default (oldVTree, newVTree) => {
  if (newVTree === undefined) {
    return ($node) => {
      $node.remove();

      return undefined;
    };
  }

  if (typeof oldVTree === "string" || typeof newVTree === "string") {
    if (oldVTree !== newVTree) {
      return ($node) => {
        const $newNode = render(newVTree);
        $node.replaceWith($newNode);

        return $newNode;
      };
    } else {
      return ($node) => $node;
    }
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    return ($node) => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};
