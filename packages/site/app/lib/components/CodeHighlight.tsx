import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ClientOnly } from "remix-utils/client-only";

interface Props {
    value: {
        code: string;
        language: string;
    };
}

const customNightOwl = {
    ...nightOwl,
    comment: { color: "currentColor", fontStyle: "italic", opacity: 0.8 },
};

const CodeBlock = ({ value }: Props) => {
    const { code, language } = value;

    const languageMap: Record<string, string> = {
        golang: "go",
        typescipt: "typescript",
        sh: "bash",
    };

    const correctLanguage = languageMap[language] ?? language;

    return (
        <ClientOnly>
            {() => (
                <SyntaxHighlighter
                    showLineNumbers={false}
                    showInlineLineNumbers={true}
                    language={correctLanguage}
                    style={customNightOwl}
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
