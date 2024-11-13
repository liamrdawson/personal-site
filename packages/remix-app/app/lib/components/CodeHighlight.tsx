import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  value: {
    code: string;
    language: string;
  };
}

const CodeBlock = ({ value }: Props) => {
  const { code, language } = value;
  return (
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
  );
};

export default CodeBlock;
