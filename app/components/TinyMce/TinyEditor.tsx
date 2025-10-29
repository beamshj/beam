// import { Dispatch, SetStateAction, useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import { Editor as TinyMCEEditor } from 'tinymce';

// export default function TinyEditor({ setNewsContent,newsContent }: {newsContent?:string | boolean, setNewsContent: Dispatch<SetStateAction<string>> }) {
//     const editorRef = useRef<TinyMCEEditor | null>(null);

//     const handleEditorChange = (content: string) => {
//         console.log("called")
//         setNewsContent(content); // Update state as the editor content changes
//         console.log(content); // Log the current content
//     };

//     return (
//         <>
//             <Editor
//                 apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
//                 onInit={(_evt, editor) => {
//                     editorRef.current = editor
//                 }}
//                 initialValue = {newsContent && typeof newsContent=="string" ?  newsContent :"<p>This is the initial content of the editor.</p>"}
//                 init={{
//                     height: 500,
//                     menubar: false,
//                     advcode_inline: true,
//                     theme: 'silver',
//                     image_title: true,
//                     automatic_uploads: true,
//                     file_picker_types: 'image',

//                     content_css: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
//                     content_style: `
//         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
//         body { padding: 10px; }
//         p:not(:last-child) {
//  margin-bottom: calc(4px * 3);
// }
// }
//     `,
//                     plugins: [
//                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
//                         'code', 'image',
//                     ],
//                     file_picker_callback: (cb) => {
//                         const input = document.createElement('input');
//                         input.setAttribute('type', 'file');
//                         input.setAttribute('accept', 'image/*');

//                         input.addEventListener('change', (e) => {
//                             const target = e.target as HTMLInputElement
//                             if (target && target.files) {
//                                 const file = target.files[0];
//                                 const reader = new FileReader();
//                                 reader.addEventListener('load', () => {
//                                     const id = 'blobid' + (new Date()).getTime();
//                                     if (editorRef.current) {
//                                         const blobCache = editorRef.current.editorUpload.blobCache;
//                                         if (reader.result && typeof reader.result == "string") {
//                                             const base64 = reader.result.split(',')[1];
//                                             const blobInfo = blobCache.create(id, file, base64);
//                                             blobCache.add(blobInfo);

//                                             cb(blobInfo.blobUri(), { title: file.name });

//                                         }
//                                     } else {
//                                         console.error("TinyMCE editor is not initialized yet!");
//                                     }

//                                 });
//                                 reader.readAsDataURL(file);
//                             }

//                         })
//                         input.click();
//                     },
//                     toolbar: 'undo redo | blocks | ' +
//                         'bold italic forecolor | alignleft aligncenter ' +
//                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                         'removeformat | help | code | image',

//                     setup: (editor) => {
//                         editor.on("change", () => {
//                             handleEditorChange(editorRef.current?.getContent() || "");
//                         });
//                         // Ensure jQuery is loaded before the plugin (add jQuery via a global script or import)
//                         if (typeof window !== 'undefined' && !window.jQuery) {
//                             const script = document.createElement('script');
//                             script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
//                             script.onload = () => {
//                                 console.log('jQuery loaded');
//                             };
//                             document.head.appendChild(script);
//                         }
//                     },
//                 }}
//             />
//             {/* <button onClick={log}>Log editor content</button> */}
//         </>
//     );
// }

// import { Dispatch, SetStateAction, useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { Editor as TinyMCEEditor } from "tinymce";

// export default function TinyEditor({
//   setNewsContent,
//   newsContent,
// }: {
//   newsContent?: string | boolean;
//   setNewsContent: Dispatch<SetStateAction<string>>;
// }) {
//   const editorRef = useRef<TinyMCEEditor | null>(null);

//   const handleEditorChange = (content: string) => {
//     setNewsContent(content);
//   };

//   return (
//     <>
//       <Editor
//         apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
//         onInit={(_evt, editor) => {
//           editorRef.current = editor;
//         }}
//         initialValue={
//           newsContent && typeof newsContent === "string"
//             ? newsContent
//             : "<p>This is the initial content of the editor.</p>"
//         }
//         init={{
//           height: 500,
//           menubar: false,
//           theme: "silver",
//           image_title: true,
//           automatic_uploads: true,
//           file_picker_types: "image",

//           content_css:
//             "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
//           content_style: `
//             body { padding: 10px; font-family: 'Inter', sans-serif; }
//             p:not(:last-child) { margin-bottom: 12px; }
//             span[data-highlight] {
//               background-color: #fff176 !important;
//               color: #000 !important;
//               padding: 0 3px !important;
//               border-radius: 2px;
//             }
//           `,

//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "help",
//             "wordcount",
//             "textcolor",
//           ],

//           toolbar:
//             "undo redo | blocks | bold italic forecolor backcolor | " +
//             "alignleft aligncenter alignright alignjustify | " +
//             "bullist numlist outdent indent | removeformat | code | image | highlight",

//           setup: (editor) => {
//             // ✅ Custom highlight button — adds bg, color, padding
//             editor.ui.registry.addButton("highlight", {
//               text: "Highlight",
//               tooltip: "Highlight selected text",
//               onAction: () => {
//                 const selectedText = editor.selection.getContent({
//                   format: "html",
//                 });

//                 if (selectedText) {
//                   // Wrap selection in a span with inline style + data attribute
//                   editor.selection.setContent(
//                     `<span data-highlight style="background-color:#ffff00; color:#000; padding:0 3px;">${selectedText}</span>`
//                   );
//                 }
//               },
//             });

//             editor.on("change", () => {
//               handleEditorChange(editorRef.current?.getContent() || "");
//             });

//             // Optional: ensure jQuery is available for older plugins
//             if (typeof window !== "undefined" && !window.jQuery) {
//               const script = document.createElement("script");
//               script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
//               document.head.appendChild(script);
//             }
//           },
//         }}
//       />
//     </>
//   );
// }

// import { Dispatch, SetStateAction, useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import type { Editor as TinyMCEEditor, EditorEvent } from "tinymce";

// type TinyMceNodeChangeEvent = {
//   element: HTMLElement | null;
// };

// export default function TinyEditor({
//   setNewsContent,
//   newsContent,
// }: {
//   newsContent?: string | boolean;
//   setNewsContent: Dispatch<SetStateAction<string>>;
// }) {
//   const editorRef = useRef<TinyMCEEditor | null>(null);

//   const handleEditorChange = (content: string) => {
//     setNewsContent(content);
//   };

//   return (
//     <>
//       <Editor
//         apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
//         onInit={(_evt, editor) => {
//           editorRef.current = editor;
//         }}
//         initialValue={
//           newsContent && typeof newsContent === "string"
//             ? newsContent
//             : "<p>This is the initial content of the editor.</p>"
//         }
//         init={{
//           height: 500,
//           menubar: false,
//           theme: "silver",
//           image_title: true,
//           automatic_uploads: true,
//           file_picker_types: "image",
//           content_css:
//             "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
//           content_style: `
//             body { padding: 10px; font-family: 'Inter', sans-serif; }
//             p:not(:last-child) { margin-bottom: 12px; }
//             span[data-highlight] {
//               background-color: #ffeb3b !important;
//               color: #000 !important;
//               padding: 0 3px !important;
//               border-radius: 2px;
//             }
//           `,

//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "help",
//             "wordcount",
//           ],

//           toolbar:
//             "undo redo | blocks | bold italic forecolor | " +
//             "alignleft aligncenter alignright alignjustify | " +
//             "bullist numlist outdent indent | removeformat | code | image | highlight",

//           setup: (editor) => {
//             // 🔆 Register the custom Highlight toggle button
//             editor.ui.registry.addToggleButton("highlight", {
//               text: "Highlight",
//               tooltip: "Toggle highlight for selected text",
//               icon: "highlight-bg-color",
//               onAction: () => {
//                 const node = editor.selection.getNode();

//                 // If inside highlighted span → remove highlight
//                 if (
//                   node &&
//                   node.nodeName === "SPAN" &&
//                   node.dataset.highlight !== undefined
//                 ) {
//                   editor.dom.remove(node, true); // unwrap span but keep text
//                 } else {
//                   const selectedText = editor.selection.getContent({
//                     format: "html",
//                   });
//                   if (selectedText) {
//                     editor.selection.setContent(
//                       `<span data-highlight style="background-color:#ffff00; color:#000; padding:0 3px;">${selectedText}</span>`
//                     );
//                   }
//                 }
//               },
//               onSetup: (api) => {
//                 const nodeChangeHandler = (
//                   e: EditorEvent<TinyMceNodeChangeEvent>
//                 ) => {
//                   const element = e.element;
//                   const isHighlighted =
//                     element?.nodeName === "SPAN" &&
//                     element.dataset?.highlight !== undefined;
//                   api.setActive(!!isHighlighted);
//                 };

//                 editor.on("NodeChange", nodeChangeHandler);
//                 return () => editor.off("NodeChange", nodeChangeHandler);
//               },
//             });

//             // Update content on change
//             editor.on("change", () => {
//               handleEditorChange(editorRef.current?.getContent() || "");
//             });
//           },
//         }}
//       />
//     </>
//   );
// }

import { Dispatch, SetStateAction, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor, EditorEvent } from "tinymce";

// Define type for NodeChange event payload
type NodeChangePayload = {
  element: Element | null;
};

export default function TinyEditor({
  setNewsContent,
  newsContent,
}: {
  newsContent?: string | boolean;
  setNewsContent: Dispatch<SetStateAction<string>>;
}) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleEditorChange = (content: string) => {
    setNewsContent(content);
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={
        newsContent && typeof newsContent === "string"
          ? newsContent
          : "<p>This is the initial content of the editor.</p>"
      }
      init={{
        height: 500,
        menubar: false,
        theme: "silver",
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        content_css:
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        content_style: `
          body { padding: 10px; font-family: 'Inter', sans-serif; }
          p:not(:last-child) { margin-bottom: 12px; }
          span[data-highlight] {
            background-color: #ffeb3b !important;
            color: #000 !important;
            padding: 0 3px !important;
            border-radius: 2px;
          }
        `,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic forecolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | code | image | highlight",
        setup: (editor) => {
          // Highlight toggle button
          editor.ui.registry.addToggleButton("highlight", {
            text: "Highlight",
            tooltip: "Toggle highlight for selected text",
            icon: "highlight-bg-color",
            onAction: () => {
              const node = editor.selection.getNode();

              if (
                node &&
                node.nodeName === "SPAN" &&
                (node as HTMLElement).dataset.highlight !== undefined
              ) {
                editor.dom.remove(node, true); // unwrap
              } else {
                const selectedText = editor.selection.getContent({
                  format: "html",
                });
                if (selectedText) {
                  editor.selection.setContent(
                    `<span data-highlight style="background-color:#ffff00; color:#000; padding:0 3px;">${selectedText}</span>`
                  );
                }
              }
            },
            onSetup: (api) => {
              const nodeChangeHandler = (e: EditorEvent<NodeChangePayload>) => {
                const element = e.element;
                const isHighlighted =
                  element?.nodeName === "SPAN" &&
                  (element as HTMLElement).dataset.highlight !== undefined;
                api.setActive(!!isHighlighted);
              };

              editor.on("NodeChange", nodeChangeHandler);
              return () => editor.off("NodeChange", nodeChangeHandler);
            },
          });

          editor.on("change", () => {
            handleEditorChange(editorRef.current?.getContent() || "");
          });
        },
      }}
    />
  );
}
