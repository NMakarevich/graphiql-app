import CodeMirror from '@uiw/react-codemirror';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { json } from '@codemirror/lang-json';
import './codeMirrorEditor.scss';

function CodeMirrorEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={atomone}
      extensions={[json()]}
      height="100%"
    />
  );
}

export default CodeMirrorEditor;
