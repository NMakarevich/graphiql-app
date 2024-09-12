import { Editor } from '@monaco-editor/react';
import styles from './monacoEditor.module.scss';

function MonacoEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <div className={styles.Editor}>
      <Editor
        value={value}
        onChange={onChange}
        height="100%"
        theme={'vs-dark'}
      />
    </div>
  );
}

export default MonacoEditor;
