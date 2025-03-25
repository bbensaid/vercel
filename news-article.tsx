import { CalendarIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsArticle({
  article,
}: {
  article: {
    title: string;
    source: string;
    date: string;
    content: string;
  } | null;
}) {
  if (!article) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-2 border-b">
          <h3 className="font-medium">Article Content</h3>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
          <p>Select an article to view its content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b">
        <h3 className="font-medium">Article Content</h3>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>{article.source}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <p>{article.content}</p>

          {/* Additional paragraphs would go here in a real article */}
          <p className="mt-4">
            Healthcare reform continues to be a priority for Vermont as the
            state works to balance quality care with affordability. Stakeholders
            from across the healthcare system are collaborating to find
            innovative solutions to longstanding challenges.
          </p>
        </div>

        <div className="mt-6">
          <Button variant="outline" size="sm">
            Read Full Article
          </Button>
        </div>
      </div>
    </div>
  );
}
