import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  value,
  setValue,
  props,
  style,
}: {
  value: string;
  setValue: (value: string) => void;
  props?: any;
  style?: React.CSSProperties;
}) => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "video", "formula"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }, { table: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions,
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "color",
    "code-block",
    "size",
    "font",
    "background",
  ];
  const handleOnChange = (newVal: string) => {
    if (newVal.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      newVal = ""; // that's for handling empty tags
    }
    setValue(newVal);
  };
  return (
    <ReactQuill
      {...props}
      theme="snow"
      value={value}
      onChange={handleOnChange}
      style={style}
      formats={formats}
      modules={modules}
      placeholder="Enter a description *"
    />
  );
};

export default RichTextEditor;
