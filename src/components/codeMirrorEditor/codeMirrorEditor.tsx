import CodeMirror from '@uiw/react-codemirror';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { langs } from '@uiw/codemirror-extensions-langs';
import './codeMirrorEditor.scss';

function CodeMirrorEditor({
  value,
  onChange,
  readonly,
}: {
  value: string;
  onChange?: (value: string | undefined) => void;
  readonly?: boolean;
}) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={atomone}
      extensions={[langs.json()]}
      height="100%"
      readOnly={readonly}
    />
  );
}

export default CodeMirrorEditor;
