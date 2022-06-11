import * as React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const htmlWithTable = `<style>p{margin-top:0px; margin-bottom:0px;}</style>
<body class=\"setupTab\" style=\" background-color:#CCCCCC; bEditID:b1st1; bLabel:body;\">
<center >
   <table cellpadding=\"0\" width=\"500\" cellspacing=\"0\" id=\"topTable\" height=\"450\" >
      <tr valign=\"top\" >
        <td style=\" background-color:#FFFFFF; bEditID:r1st1; bLabel:header; vertical-align:top; height:100; text-align:left;\">
          <img border=\"0\" bEditID=\"r1sp1\" bLabel=\"headerImage\" id=\"r1sp1\" src=\"https://force-nosoftware-10552-dev-ed.cs92.my.salesforce.com/servlet/servlet.ImageServer?id=0153F000000iJ3g&oid=00D3F000000JUyg\" ></img>
        </td>
      </tr>
      <tr valign=\"top\" ><td style=\" background-color:#FFFFFF; bEditID:r5st1; bLabel:footer; vertical-align:top; height:100; text-align:left;\"><img border=\"0\" bEditID=\"r5sp1\" bLabel=\"footerImage\" id=\"r5sp1\" src=\"https://force-nosoftware-10552-dev-ed.cs92.my.salesforce.com/servlet/servlet.ImageServer?id=0153F000000iJ45&oid=00D3F000000JUyg\" ></img></td></tr>
   </table>
</center>`;
const htmlWithTable2 = `<center >
          <img border=\"0\" bEditID=\"r1sp1\" bLabel=\"headerImage\" id=\"r1sp1\" src=\"https://force-nosoftware-10552-dev-ed.cs92.my.salesforce.com/servlet/servlet.ImageServer?id=0153F000000iJ3g&oid=00D3F000000JUyg\" ></img>
        <img border=\"0\" bEditID=\"r5sp1\" bLabel=\"footerImage\" id=\"r5sp1\" src=\"https://force-nosoftware-10552-dev-ed.cs92.my.salesforce.com/servlet/servlet.ImageServer?id=0153F000000iJ45&oid=00D3F000000JUyg\" ></img>
</center>`;
const htmlBasic = `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p>
<blockquote><p>A wise quote.</p></blockquote>
<p>A closing paragraph!</p>`;
const htmlLightning = `<html style="overflow-y: hidden;">
<head>
	<title></title>
</head>
<body style="height: auto; min-height: auto;"><span style="font-size:24px;"><span style="font-family:Comic Sans MS,cursive;">24px and Comic Sans</span></span><br />
<br />
<span style="color:#c0392b;">I am red</span>
<ul>
	<li>I am bullet</li>
</ul>

<ol>
	<li>I am numbered</li>
</ol>
<br />
you<span style="color:#1abc9c;"> can </span><span style="font-family:Comic Sans MS,cursive;"><span style="font-size:24px;"><span style="color:#1abc9c;">cus</span>tomize<b> the t</b>ype and the compon</span></span>ent<br />
<br />
<b>the text is bold</b><br />
<br />
<i>the text is italic</i><br />
<br />
<u>this text is underlined</u><br />
<br />
<u><b>this text is bold and under lined</b></u>

<div style="text-align: center;">this text is center</div>

<div style="text-align: right;">the text is right</div>
</body>
</html> 
`;
const { body } = new DOMParser().parseFromString(htmlLightning, "text/html");

const defaultFonts = [
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Verdana"
];
export default function App() {
  const [value, setValue] = React.useState(htmlWithTable2);

  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts
  ].sort();

  return (
    <div className="App">
      <SunEditor
        plugin=""
        setContents={value}
        onChange={setValue}
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            // ['paragraphStyle', 'blockquote'],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript"
            ],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],

            ["table", "horizontalRule", "link", "image", "video"],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            // ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["removeFormat"]

            // ['save', 'template'],
            // '/', Line break
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          defaultTag: "div",
          minHeight: "300px",
          showPathLabel: false,
          font: sortedFontOptions
        }}
      />
      <hr />
      <h2>Example value output:</h2>
      <textarea
        disabled
        value={JSON.stringify(value, null, 2)}
        style={{ width: "100%", resize: "none", height: "600px" }}
      />
    </div>
  );
}
