import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";


interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // پشتیبانی از جداول و ...
        rehypePlugins={[rehypeHighlight]} // رنگی کردن کدها
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}