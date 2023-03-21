function stringToNodes(stribg) {
  const nodes = [];
  new DOMParser()
    .parseFromString(stribg, "text/html")
    .head.childNodes.forEach((i) => {
      if (i.tagName === "SCRIPT") {
        nodes.push(i);
      }
    });
  return nodes;
}

function nodeToElement(node) {
  const el = document.createElement("script");
  node.getAttributeNames().forEach((name) => {
    el.setAttribute(name, node.getAttribute(name));
  });

  el.textContent = node.textContent;
  return el;
}

function appendElement(string, destination = "head") {
  stringToNodes(string).forEach((node) => {
    const el = nodeToElement(node);

    document[destination].appendChild(el);
  });
}

(function (window) {
  window.cs = function ({ headerCode, footerCode }) {
    if (typeof window !== "undefined") {
      try {
        appendElement(headerCode, "head");
        appendElement(footerCode, "body");
      } catch (error) {}
    }
  };
})(window, document);
