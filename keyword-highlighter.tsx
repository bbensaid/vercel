"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample dictionary - in a real app, this would come from your backend
const KEYWORD_DICTIONARY = {
  "Green Mountain Care Board":
    "An independent group created by the Vermont Legislature in 2011 to oversee the development of health care policy in Vermont.",
  Medicaid:
    "A joint federal and state program that helps with medical costs for some people with limited income and resources.",
  healthcare:
    "The organized provision of medical care to individuals or a community.",
  reform: "To make changes in something in order to improve it.",
  "payment models":
    "Methods of paying healthcare providers for services rendered.",
};

export function KeywordHighlighter({ text }: { text: string }) {
  const [highlightedText, setHighlightedText] = useState<React.ReactNode>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!text) {
      setHighlightedText("");
      return;
    }

    // Create a regex pattern for all keywords
    const keywords = Object.keys(KEYWORD_DICTIONARY);

    // Filter keywords based on search term
    const filteredKeywords = searchTerm
      ? keywords.filter((k) =>
          k.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : keywords;

    if (filteredKeywords.length === 0) {
      setHighlightedText(text);
      return;
    }

    const pattern = new RegExp(
      `(${filteredKeywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "gi"
    );

    // Split text by keywords and create React elements
    const parts = text.split(pattern);
    const elements = parts.map((part, index) => {
      // Check if this part matches any keyword (case-insensitive)
      const matchedKeyword = filteredKeywords.find(
        (keyword) => keyword.toLowerCase() === part.toLowerCase()
      );

      if (matchedKeyword) {
        const definition =
          KEYWORD_DICTIONARY[matchedKeyword as keyof typeof KEYWORD_DICTIONARY];
        return (
          <span key={index} className="group relative">
            <span className="font-bold text-red-600">{part}</span>
            <span className="absolute left-0 top-full z-10 mt-1 hidden w-64 rounded-md border bg-background p-2 text-xs shadow-md group-hover:block">
              {definition}
            </span>
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });

    setHighlightedText(<>{elements}</>);
  }, [text, searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="font-medium">Keyword Highlights</h3>
        <div className="relative w-48">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter keywords..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {text ? (
          <div className="text-sm leading-relaxed">{highlightedText}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No document text to analyze</p>
          </div>
        )}
      </div>
    </div>
  );
}
