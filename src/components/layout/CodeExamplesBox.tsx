/* Code Example Box for displaying code snippets */

import React from 'react';

interface CodeExampleBoxProps {
  language: string; // 'python', 'node.js', etc.
  title?: string; // Optional title
  code: string; // The actual code to display
}

const CodeExampleBox: React.FC<CodeExampleBoxProps> = ({ language, title, code }) => {
  return (
    <div className="w-full">
      {title && <div className="text-sm mb-2">{title.toUpperCase()} </div>}
      <div className="rounded-lg overflow-hidden bg-gray-900">
        <pre className="p-4 overflow-x-auto text-white">
          <code className={`language-${language} font-mono text-sm`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeExampleBox;
