import { jsx } from "slate-hyperscript";

export const deserialize = (el) => {
  console.log("el", el);
  console.log("el nodetype", el.nodeType);
  console.log("el node-name", el.nodeName);
  console.log("el style", el.style?.cssText);

  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children = Array.from(el.childNodes).map(deserialize);

  const styleText = el.style?.cssText || "";

  switch (el.nodeName) {
    case "CENTER":
      return jsx(
        "element",
        { type: "div", style: "text-align: center;" },
        children
      );
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      console.log("br");
      return "\n";
    case "DIV":
      return jsx("element", { type: "paragraph" }, children);
    case "BLOCKQUOTE":
      return jsx("element", { type: "blockquote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "OL":
      return jsx("element", { type: "numbered-list" }, children);
    case "UL":
      return jsx("element", { type: "bulleted-list" }, children);

    case "LI":
      return jsx("element", { type: "list-item", style: styleText }, children);

    case "SPAN":
      const j = jsx("element", { style: styleText }, children);
      console.log("j: ", j);
      return j;

    case "B":
      return jsx(
        "element",
        { text: el.textContent, bold: true, style: styleText },
        children
      );

    case "U":
      return jsx(
        "element",
        { text: el.textContent, underline: true, style: styleText },
        children
      );
    case "I":
      return jsx(
        "element",
        { text: el.textContent, italic: true, style: styleText },
        children
      );
    case "A":
      return jsx(
        "element",
        { type: "a", url: el.getAttribute("href"), style: styleText },
        children
      );
    default:
      console.log("el.textcontet", el.textcontent);
      return el.textContent;
  }
};

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "blockquote" }),
  // H1: () => ({ type: "heading-one" }),
  // H2: () => ({ type: "heading-two" }),
  // H3: () => ({ type: "heading-three" }),
  // H4: () => ({ type: "heading-four" }),
  // H5: () => ({ type: "heading-five" }),
  // H6: () => ({ type: "heading-six" }),
  IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" })
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  B: () => ({ bold: true }),
  U: () => ({ underline: true }),
  SPAN: (el) => ({ style: el.style?.cssText || "" })
};

export const deserialize2 = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes).map(deserialize).flat();

  console.log(el.nodeName);
  if (el.nodeName === "BODY") {
    const j = jsx("fragment", {}, children);
    console.log("body j ", j);
    return j;
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    const k = jsx("element", attrs, children);
    console.log("element k ", k);

    return k;
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => {
      const o = jsx("text", attrs, child);
      console.log("element o: ", o);

      return o;
    });
  }

  return children;
};
