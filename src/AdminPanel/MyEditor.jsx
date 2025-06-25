import React, { useState ,useRef,useEffect} from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit } from 'reactjs-tiptap-editor';

import { Table } from 'reactjs-tiptap-editor/table'; 

import { FontFamily } from 'reactjs-tiptap-editor/fontfamily'; 
import { Link } from 'reactjs-tiptap-editor/link'; 
import { Heading } from 'reactjs-tiptap-editor/heading'; 
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist'; 
import { ListItem } from 'reactjs-tiptap-editor/listitem'; 
import { TextAlign } from 'reactjs-tiptap-editor/textalign'; // [!code ++]

import { BulletList } from 'reactjs-tiptap-editor/bulletlist'; 
import { Code } from 'reactjs-tiptap-editor/code'; 
import { Bold } from 'reactjs-tiptap-editor/bold'; 
import { Document } from 'reactjs-tiptap-editor/document'; 
import { FontSize } from 'reactjs-tiptap-editor/fontsize'; 
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter'; 
import { Italic } from 'reactjs-tiptap-editor/italic'; 
import { LineHeight } from 'reactjs-tiptap-editor/lineheight'; 
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace'; 
import { TextDirection } from 'reactjs-tiptap-editor/textdirection'; 

import { Image } from 'reactjs-tiptap-editor/image'; 
import 'react-image-crop/dist/ReactCrop.css'; 

import { Video } from 'reactjs-tiptap-editor/video'; 
import { Color } from 'reactjs-tiptap-editor/color'; 

import { Emoji } from 'reactjs-tiptap-editor/emoji'; 
import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf'; 

import { Highlight } from 'reactjs-tiptap-editor/highlight'; 
import { Iframe } from 'reactjs-tiptap-editor/iframe'; 
import { TaskList } from 'reactjs-tiptap-editor/tasklist'; 
import { Drawer } from 'reactjs-tiptap-editor/drawer'; 
import 'easydrawer/styles.css'; 

import { TableOfContents } from 'reactjs-tiptap-editor/tableofcontent'; 

import 'reactjs-tiptap-editor/style.css';

// Dummy button config to avoid runtime error
const dummyButton = () => ({
  component: () => null,
  isActive: () => false,
  onClick: () => {},
  icon: null,
});

const extensions = [
  BaseKit.configure({
    placeholder: { showOnlyCurrent: true },
    characterCount: { limit: 50000 },
  }),

 
  FontFamily,
  Table,
  Link,
  Heading,
  OrderedList,
  ListItem,
  TextAlign,
  BulletList,
  Code,
  Bold,
  Document,
  FontSize,
  FormatPainter,
  Italic,
  LineHeight,
  SearchAndReplace,
  TextDirection.configure({ 
    types: ['heading', 'paragraph', 'blockquote', 'list_item'], 
    directions: ['ltr', 'rtl'], 
    defaultDirection: 'ltr', 
  }),
  
  
  Image.configure({
    upload: async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.top5shots.com/api/uploadImage', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log("result",result);

        const link ="https://api.top5shots.com"+ result?.imageUrl


        // Example: assuming the API returns { url: 'https://example.com/image.jpg' }
        return link;
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Image upload failed.');
        return null;
      }
    },
  }),



  Video.configure({
upload: async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.top5shots.com/api/uploadImage', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log("result",result);

        const link ="https://api.top5shots.com"+ result?.imageUrl


        // Example: assuming the API returns { url: 'https://example.com/image.jpg' }
        return link;
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Image upload failed.');
        return null;
      }
    },
  }), 


  Color,
  Emoji,
  ExportPdf,
  Highlight,
  Iframe,
  TaskList,
  Drawer.configure({
    upload: async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.top5shots.com/api/uploadImage', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log("result",result);

        const link ="https://api.top5shots.com"+ result?.imageUrl


        // Example: assuming the API returns { url: 'https://example.com/image.jpg' }
        return link;
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Image upload failed.');
        return null;
      }
    },
  }),

  TableOfContents
  
];

const MyEditor = ({setEditorContent,editorContent}) => {
  // const [content, setContent] = useState('');
  const editorRef = useRef(null);

  const handleContentChange = (value) => {
    setEditorContent(value);       // Update parent state
    
  };

  useEffect(() => {
    if (editorRef.current && typeof editorRef.current?.setContent === 'function') {
      editorRef.current.setContent(editorContent || '');
    }
  }, [editorContent]);


  // console.log("content",content)
  console.log("ed")

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <RichTextEditor
        output="html"
        ref={editorRef}
        content={editorContent}
        onChangeContent={handleContentChange}
        extensions={extensions}
        label="Rich Text Editor"
        minHeight={300}
      />
    </div>
  );
};

export default MyEditor;
