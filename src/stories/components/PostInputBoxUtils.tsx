import {Quill} from "react-quill";
import emojiRegex from "emoji-regex";
import { compact } from 'lodash';
import twemoji from 'twemoji';

export const getEmojiUrl = (emoji: string) => {
  let code = twemoji?.convert.toCodePoint(emoji);
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${code}.svg`;
};

export const registerCustomFormat = () => {
  const Inline = Quill.import("blots/inline");
  const Embed = Quill.import("blots/embed");

  class CustomExceed extends Inline {}
  CustomExceed.blotName = "exceed";
  CustomExceed.tagName = "exceed";
  Quill.register(CustomExceed);

  class EmojiBlot extends Embed {
    static create(data: any) {
      const isObject = typeof data === "object";
      const emoji = isObject ? data.emoji : data;
      const src = isObject ? data.src : getEmojiUrl(emoji);
      const node = super.create();
      node.innerHTML = `<img src="${src}" alt="${emoji}"/>`;
      return node;
    }

    static value(node: any) {
      const emojiMatch = node.innerHTML.match(emojiRegex());
      const srcMatch = node.innerHTML.match(/<img src="([^"]+)"/);
      return {
        emoji: emojiMatch ? emojiMatch[0] : "",
        src: srcMatch ? srcMatch[1] : "",
      };
    }
  }
  EmojiBlot.blotName = "emoji";
  EmojiBlot.tagName = "emoji";
  Quill.register(EmojiBlot);
};
export const quillHelper = (() => {
  let quill: any | null = null;

  function createQuillHelper() {
    registerCustomFormat();
    const div = document.createElement("div");
    div.setAttribute("id", "quillHelperWrapper");
    div.style.display = "none";
    div.innerHTML = `<div id="quillHelper"/>`;
    document.body.appendChild(div);
    const _quill = new Quill("#quillHelper", {
      theme: "snow",
    });
    return _quill;
  }

  function htmlToDelta(html: string) {
    if (!quill) {
      quill = createQuillHelper();
    }
    const delta = quill.clipboard.convert(html);
    return delta;
  }

  function deltaToHtml(delta: any) {
    if (!quill) {
      quill = createQuillHelper();
    }
    quill.setContents(delta);
    const html = quill.root.innerHTML;
    return html;
  }

  return {
    htmlToDelta,
    deltaToHtml,
  };
})();
const spaceSymbols = "♕۞❀"; // \s
const newlineSymbols = "•ั๑♧"; // \n
const encodeSpace = (text: string) => {
  let result = /<[^>]+>/.test(text)
    ? text
        .replace(/([^>]*)</g, (all: string) => {
          return all
            .replace(/\n/g, newlineSymbols)
            .replace(/\s/g, spaceSymbols);
        })
        .replace(/>([^<]*)/g, (all: string) => {
          return all
            .replace(/\n/g, newlineSymbols)
            .replace(/\s/g, spaceSymbols);
        })
    : text.replace(/\n/g, newlineSymbols).replace(/\s/g, spaceSymbols);
  result = result.replace(
    new RegExp(`(<[^\/>]+>)${newlineSymbols}(<\/[^>]+>)`, "g"),
    "$1\n$2",
  );
  return result;
};
const decodeSpace = (insert: string) => {
  const result =
    typeof insert === "string"
      ? insert
          .replace(new RegExp(`${newlineSymbols}(\n)`, "g"), "$1")
          .replace(new RegExp(`(${spaceSymbols})`, "g"), " ")
          .replace(new RegExp(`${newlineSymbols}`, "g"), "\n")
      : insert;
  return result;
};
export const htmlToDelta = (html: string, type?: string) => {
  const delta = quillHelper.htmlToDelta(encodeSpace(html));
  const ops = delta
    ? compact(
        delta.ops.map((item: any, index: number) => {
          if (type === "final") {
            item?.attributes?.link &&
              (item.attributes.link = item.attributes.link.replace(
                /_isMyself|_isMention/,
                "",
              ));
          } else if (/.+\n$/.test(item?.insert) && !delta.ops[index + 1]) {
            item.insert = item?.insert.replace(/\n$/, "");
          }
          return {...item, insert: decodeSpace(item.insert)};
        }),
      )
    : [{insert: ""}];

  return {
    ops: [
      ...ops,
    ],
  };
};
export const changeTextToHtml: any = ({
  text = "",
}: {
  text: string;
}) => {
  if (typeof text !== "string") return null;
  const needChange =
    new RegExp(`${emojiRegex().source}`).test(text)

  let html = text
  html = html
      .replace(/\uFEFF/g, "")
      .replace(new RegExp(`(${emojiRegex().source})`, "g"), (emoji) => {
        const emojiUrl = getEmojiUrl(emoji);
        return `<emoji><span contenteditable="false"><img src="${emojiUrl}" alt="${emoji}"></span></emoji>`
      });
  return {
    isChanged: needChange,
    html,
  };
};

export const handleTextMatcher = (
  node: any,
  delta: any,
) => {
  const text = node.data || "";
  const {isChanged, html} =
    changeTextToHtml({text}) ??
    {};
  const _isChanged = /\s+/.test(text) || isChanged;
  const _delta = _isChanged ? htmlToDelta(html||"") : delta;
  const ops: any[] = [];
  _delta.ops.forEach((o: any) => {
    ops.push({
      insert: o.insert,
      attributes: {
        ...(o.attributes ?? {}),
      },
    });
  });
  return {
    ops,
  };
};

export const handleCursorText = (quill: any, maxLength: number) => {
  setLinesFormat({quill});
  // handleExceed({quill, maxLength, operate: "format"});
};


export const setLinesFormat = ({quill}: {quill: any}) => {
  const range = quill.getSelection();
  const rangeIndex = range?.index ?? 0;
  const index = rangeIndex === 0 ? 0 : rangeIndex - 1;
  const length = index === 0 ? 2 : 3;
  const [, offset] = quill.getLine(index);
  const startIndex = index - offset;
  const lines = quill.getLines(index, length);
  const oldLinesHtml = lines
  .map((l: any, i: number) => {
    return !lines[i - 1] || /^<br\/?>$/.test(lines[i - 1].domNode.innerHTML)
      ? l.domNode.innerHTML
      : `\n${l.domNode.innerHTML}`;
  })
  .join("").replace(/\uFEFF/g, "");
  const linesText = getRichContent(
    oldLinesHtml,
    "text",
  );
  const oldTextWithoutOldEmojis = getRichContent(
    oldLinesHtml,
    "text",
    " "
  )
  const oldLength = oldTextWithoutOldEmojis.length
  replaceDelta({quill, text:linesText, startIndex, oldLinesHtml, oldLength});
  range &&
    quill.setSelection(
      startIndex+getTextLength(oldTextWithoutOldEmojis.slice(0, offset+1)),
      range.length,
    );
};

export const isEqualHtml = (a: string, b: string) => {
  return a.replace(/\uFEFF/g, "") === b.replace(/\uFEFF/g, "").replace(/<br\/?>/g, "\n");
};

export const replaceDelta = ({quill, text, startIndex, oldLinesHtml, oldLength}: {quill: any, text: string, startIndex: number, oldLinesHtml: string, oldLength: number}) => {
  const {html: content} = changeTextToHtml({
    text,
  });
  if (isEqualHtml(content,oldLinesHtml)) return;
  const {ops} = htmlToDelta(content);
  quill.deleteText(startIndex, oldLength);
  quill.updateContents({
    ops: [
      ...(startIndex === 0 ? [] : [{retain: startIndex}]), // set insert position first
      ...ops,
    ],
  });
};
export const getFinalText = (quill: any) => {
  const html = quill.root.innerHTML;
  const finalText = getRichContent(html, "text");
  return finalText.trim() ? finalText : "";
};
export const handleExceed = ({quill, maxLength, operate = "format"}: {quill: any, maxLength: number, operate: string}) => {
  const editorText = getFinalText(quill);
  if (!editorText) return;
  const is2LengthEmojiInSplitPoint = !editorText
    .slice(maxLength - 1, maxLength + 1)
    .replace(new RegExp(`${emojiRegex().source}`), "");
  const validText = editorText.slice(
    0,
    maxLength - (is2LengthEmojiInSplitPoint ? 1 : 0),
  );
  const _maxLength = getTextLength(validText);

  if (operate === "format") {
    quill.formatText(0, _maxLength, "exceed", false);
    quill.formatText(_maxLength, 99999, "exceed", true);
  } else if (operate === "clear") {
    quill.deleteText(_maxLength, 99999);
    quill.setSelection(_maxLength);
  }
};

export const getTextLength = (text: string) => {
  const length = text.replace(emojiRegex(), "").length;
  const emojisLength = text.match(emojiRegex())?.length ?? 0;
  return length + emojisLength;
};

export const getRichContent = (
  html: string,
  type: string,
  imgPlaceholder?: string,
) => {
  let result = html
    .replace(/\uFEFF/g, "")
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, (all, $1) => {
      return imgPlaceholder
        ? imgPlaceholder
        : $1;
    })
    .replace(/<\/?(span|sup|sub|emoji)[^>]*>/g, "")
    .replace(/(<p><br\/?><\/p>)/g, "\n")
    .replace(/<p[^>]*style=[^>]*>.*<\/p>/g, "")
    .replace(/(<\/em><em>)/g, "")
    .replace(/(<\/strong><strong>)/g, "")
    .replace(/(<\/em><em>)/g, "")
    .replace(/(<\/strong><strong>)/g, "")
    .replace(/(<br\/?>)/g, "\n");
  result =
    type === "final"
      ? result.replace(/<p[^>]*style=[^>]*>.*<\/p>/g, "")
      : result.replace(/<(p)[^>]*>([\s\S]*?)<\/\1>/gi, "$2\n");
  if (type === "text") {
    result = result
      .replace(/<\/?(a)[^>]*>/g, "")
      .replace(/<li[^>]*>\n<\/li>/g, "\n")
      .replace(/<\/h2>|<\/ul>|<\/ol>|<\/li><li[^>]*>/g, "\n")
      .replace(/<\/?(strong|em|h2|ul|ol|li|exceed|highlight|u|s)[^>]*>/g, "");
  } else if (type === "withoutLink") {
    result = result.replace(/<\/?(a)[^>]*>/g, "");
  }
  return decodeHtmlCode(result);
};

export const decodeHtmlCode = (html: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};
