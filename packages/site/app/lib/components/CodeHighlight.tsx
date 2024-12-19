import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ClientOnly } from "remix-utils/client-only";

interface Props {
  value: {
    code: string;
    language: string;
  };
}

const CodeBlock = ({ value }: Props) => {
  const { code, language } = value;
  return (
    <ClientOnly>
      {() => (
        <SyntaxHighlighter
          showLineNumbers={false}
          showInlineLineNumbers={true}
          language={language}
          style={nightOwl}
          customStyle={{
            padding: "1em",
            marginTop: "3.2rem",
            fontSize: "1.4rem",
            borderRadius: "0.8rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </ClientOnly>
  );
};

export default CodeBlock;
