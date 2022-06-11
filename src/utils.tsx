import {
  DEFAULTS_ALIGN,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_HIGHLIGHT,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_KBD,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_MEDIA_EMBED,
  DEFAULTS_MENTION,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_SEARCH_HIGHLIGHT,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSUPSCRIPT,
  DEFAULTS_TABLE,
  DEFAULTS_TODO_LIST,
  DEFAULTS_UNDERLINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ResetBlockTypePluginOptions,
  setDefaults,
  // autoformat
  AutoformatRule,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  toggleList,
  unwrapList
} from "@udecode/slate-plugins";
import { Editor } from "slate";

export const headingTypes = [
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
];

export const options = {
  ...setDefaults(DEFAULTS_PARAGRAPH, {}),
  ...setDefaults(DEFAULTS_MENTION, {}),
  ...setDefaults(DEFAULTS_BLOCKQUOTE, {}),
  ...setDefaults(DEFAULTS_CODE_BLOCK, {}),
  ...setDefaults(DEFAULTS_LINK, {}),
  ...setDefaults(DEFAULTS_IMAGE, {}),
  ...setDefaults(DEFAULTS_MEDIA_EMBED, {}),
  ...setDefaults(DEFAULTS_TODO_LIST, {}),
  ...setDefaults(DEFAULTS_TABLE, {}),
  ...setDefaults(DEFAULTS_LIST, {}),
  ...setDefaults(DEFAULTS_HEADING, {}),
  ...setDefaults(DEFAULTS_ALIGN, {}),
  ...setDefaults(DEFAULTS_BOLD, {}),
  ...setDefaults(DEFAULTS_ITALIC, {}),
  ...setDefaults(DEFAULTS_UNDERLINE, {}),
  ...setDefaults(DEFAULTS_STRIKETHROUGH, {}),
  ...setDefaults(DEFAULTS_CODE, {}),
  ...setDefaults(DEFAULTS_KBD, {}),
  ...setDefaults(DEFAULTS_SUBSUPSCRIPT, {}),
  ...setDefaults(DEFAULTS_HIGHLIGHT, {}),
  ...setDefaults(DEFAULTS_SEARCH_HIGHLIGHT, {})
};

export const inlineTypes = [options.mention.type, options.link.type];

const resetBlockTypesCommonRule = {
  types: [options.bold.type, options.code_block.type, options.todo_li.type],
  defaultType: options.p.type
};

export const optionsResetBlockTypes: ResetBlockTypePluginOptions = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Enter",
      predicate: isBlockAboveEmpty
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Backspace",
      predicate: isSelectionAtBlockStart
    }
  ]
};

//auto format
const preFormat = (editor: Editor) => unwrapList(editor, options);

export const autoformatRules: AutoformatRule[] = [
  {
    type: options.h1.type,
    markup: "#",
    preFormat
  },
  {
    type: options.h2.type,
    markup: "##",
    preFormat
  },
  {
    type: options.h3.type,
    markup: "###",
    preFormat
  },
  {
    type: options.h4.type,
    markup: "####",
    preFormat
  },
  {
    type: options.h5.type,
    markup: "#####",
    preFormat
  },
  {
    type: options.h6.type,
    markup: "######",
    preFormat
  },
  {
    type: options.li.type,
    markup: ["*", "-"],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...options, typeList: options.ul.type });
    }
  },
  {
    type: options.li.type,
    markup: ["1.", "1)"],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...options, typeList: options.ol.type });
    }
  },
  {
    type: options.todo_li.type,
    markup: ["[]"]
  },
  {
    type: options.blockquote.type,
    markup: [">"],
    preFormat
  },
  {
    type: MARK_BOLD,
    between: ["**", "**"],
    mode: "inline",
    insertTrigger: true
  },
  {
    type: MARK_BOLD,
    between: ["__", "__"],
    mode: "inline",
    insertTrigger: true
  },
  {
    type: MARK_ITALIC,
    between: ["*", "*"],
    mode: "inline",
    insertTrigger: true
  },
  {
    type: MARK_ITALIC,
    between: ["_", "_"],
    mode: "inline",
    insertTrigger: true
  },
  {
    type: MARK_CODE,
    between: ["`", "`"],
    mode: "inline",
    insertTrigger: true
  },
  {
    type: MARK_STRIKETHROUGH,
    between: ["~~", "~~"],
    mode: "inline",
    insertTrigger: true
  },
  {
    trigger: "`",
    type: options.code_block.type,
    markup: "``",
    mode: "inline-block",
    preFormat: (editor) => unwrapList(editor, options)
  }
];

const createParagraph = (text: string, mark?: string) => {
  const leaf = { text };
  if (mark) {
    leaf[mark] = true;
  }

  return {
    type: options.p.type,
    children: [leaf]
  };
};

export const initialValues = [
  {
    children: [
      {
        type: "h1",
        children: [
          {
            text: "💅 Marks"
          }
        ]
      },
      {
        type: "h2",
        children: [
          {
            text: "💧 Basic Marks"
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text:
              "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code."
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text:
              "You can customize the type, the component and the hotkey for each of these."
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This text is bold.",
            bold: true
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This text is italic.",
            italic: true
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This text is underlined.",
            underline: true
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This text is bold, italic and underlined.",
            bold: true,
            italic: true,
            underline: true
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This is a strikethrough text.",
            strikethrough: true
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This is an inline code.",
            code: true
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "These are "
          },
          {
            text: "a subscript",
            subscript: true
          },
          {
            text: " and "
          },
          {
            text: "a superscript",
            superscript: true
          },
          {
            text: "."
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "You can also press "
          },
          {
            text: "Super + B",
            kbd: true
          },
          {
            text: " to mark selected text bold or "
          },
          {
            text: "Super + I",
            kbd: true
          },
          {
            text: " to mark it italic."
          }
        ]
      },
      {
        type: "align_center",
        children: [
          {
            type: "p",
            children: [
              {
                text: "This is align center"
              }
            ]
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: ""
          }
        ]
      },
      {
        type: "align_right",
        children: [
          {
            type: "p",
            children: [
              {
                text: "This is align right"
              }
            ]
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: ""
          }
        ]
      }
    ]
  }
];
