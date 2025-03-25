"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Sample news data - in a real app, this would come from an API
const SAMPLE_NEWS = [
  {
    id: 1,
    title: "Vermont Expands Healthcare Access Through New Initiative",
    source: "VT Health News",
    date: "2023-11-15",
    content:
      "Vermont has launched a new initiative to expand healthcare access to rural communities. The program aims to bring medical services to underserved areas through mobile clinics and telehealth options.",
  },
  {
    id: 2,
    title: "Green Mountain Care Board Approves Hospital Budgets",
    source: "Burlington Free Press",
    date: "2023-10-28",
    content:
      "The Green Mountain Care Board has approved hospital budgets for the upcoming fiscal year, with an average increase of 3.2% across the state. The board emphasized the importance of controlling healthcare costs while maintaining quality care.",
  },
  {
    id: 3,
    title: "Study Shows Impact of Vermont's Healthcare Reform Efforts",
    source: "Health Policy Journal",
    date: "2023-09-12",
    content:
      "A new study published in the Health Policy Journal shows that Vermont's healthcare reform efforts have led to a 15% reduction in uninsured residents over the past five years. The study credits expanded Medicaid coverage and innovative payment models for the improvement.",
  },
  {
    id: 4,
    title: "Vermont Legislators Propose New Healthcare Bill",
    source: "VT Public Radio",
    date: "2023-08-05",
    content:
      "Vermont legislators have proposed a new healthcare bill aimed at reducing prescription drug costs for residents. The bill would establish a prescription drug affordability board to review and set limits on drug prices.",
  },
];

export function NewsHeadlines({
  onArticleSelected,
}: {
  onArticleSelected: (article: any) => void;
}) {
  const [news, setNews] = useState<typeof SAMPLE_NEWS>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchNews = () => {
      setIsLoading(true);
      setTimeout(() => {
        setNews(SAMPLE_NEWS);
        setIsLoading(false);
      }, 1000);
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="font-medium">Related News</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
          }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y">
            {news.map((article) => (
              <li
                key={article.id}
                className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onArticleSelected(article)}
              >
                <h4 className="font-medium text-sm">{article.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
