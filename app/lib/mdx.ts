import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
};

export type Article = {
  meta: ArticleMeta;
  markdown: string;
  html: string;
  headings: ArticleHeading[];
};

export type ArticleHeading = {
  id: string;
  text: string;
  level: number;
};

const ARTICLES_DIR = path.join(process.cwd(), "public", "assets", "articles");

function fallbackTitleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function pickTitle(markdown: string, slug: string): string {
  const headingMatch = markdown.match(/^#\s+(.+)$/m);
  if (headingMatch?.[1]) {
    return headingMatch[1].trim();
  }
  return fallbackTitleFromSlug(slug);
}

function pickExcerpt(markdown: string): string {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
  if (!lines.length) {
    return "Read the full article.";
  }
  const excerpt = lines[0];
  return excerpt.length > 160 ? `${excerpt.slice(0, 157)}...` : excerpt;
}

function estimateReadingTime(markdown: string): string {
  const words = markdown
    .replace(/```[\s\S]*?```/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInlineMarkdown(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .trim();
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderMarkdownToHtml(markdown: string): {
  html: string;
  headings: ArticleHeading[];
} {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlBlocks: string[] = [];
  const headings: ArticleHeading[] = [];
  const headingIds = new Map<string, number>();

  let paragraphBuffer: string[] = [];
  let listItems: string[] = [];
  let orderedListItems: string[] = [];
  let inCodeBlock = false;
  let codeBlockBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }
    htmlBlocks.push(`<p>${renderInlineMarkdown(paragraphBuffer.join(" "))}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listItems.length) {
      return;
    }
    htmlBlocks.push(
      `<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`
    );
    listItems = [];
  };

  const flushOrderedList = () => {
    if (!orderedListItems.length) {
      return;
    }
    htmlBlocks.push(
      `<ol>${orderedListItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ol>`
    );
    orderedListItems = [];
  };

  const flushCodeBlock = () => {
    if (!codeBlockBuffer.length) {
      return;
    }
    htmlBlocks.push(
      `<pre><code>${escapeHtml(codeBlockBuffer.join("\n"))}</code></pre>`
    );
    codeBlockBuffer = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        flushCodeBlock();
      } else {
        flushParagraph();
        flushList();
        flushOrderedList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockBuffer.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushOrderedList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const level = headingMatch[1].length;
      const headingText = stripInlineMarkdown(headingMatch[2].trim());
      const baseId = slugifyHeading(headingText) || "section";
      const duplicateCount = headingIds.get(baseId) ?? 0;
      headingIds.set(baseId, duplicateCount + 1);
      const headingId = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`;
      headings.push({
        id: headingId,
        text: headingText,
        level,
      });
      htmlBlocks.push(
        `<h${level} id="${headingId}">${renderInlineMarkdown(headingMatch[2].trim())}</h${level}>`
      );
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      flushOrderedList();
      listItems.push(listMatch[1].trim());
      continue;
    }

    const orderedListMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      flushParagraph();
      flushList();
      orderedListItems.push(orderedListMatch[1].trim());
      continue;
    }

    const quoteMatch = line.match(/^>\s+(.+)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      flushOrderedList();
      htmlBlocks.push(`<blockquote>${renderInlineMarkdown(quoteMatch[1])}</blockquote>`);
      continue;
    }

    paragraphBuffer.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushOrderedList();
  flushCodeBlock();

  return {
    html: htmlBlocks.join("\n"),
    headings,
  };
}

async function readArticleMarkdown(slug: string): Promise<string | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export async function fetchArticles(): Promise<ArticleMeta[]> {
  let fileNames: string[] = [];
  try {
    fileNames = await readdir(ARTICLES_DIR);
  } catch {
    return [];
  }

  const markdownFiles = fileNames
    .filter((fileName) => fileName.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const articles = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/i, "");
      const markdown = await readArticleMarkdown(slug);
      if (!markdown) {
        return null;
      }

      return {
        slug,
        title: pickTitle(markdown, slug),
        excerpt: pickExcerpt(markdown),
        readingTime: estimateReadingTime(markdown),
      } satisfies ArticleMeta;
    })
  );

  return articles.filter((article): article is ArticleMeta => article !== null);
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const markdown = await readArticleMarkdown(slug);
  if (!markdown) {
    return null;
  }

  const meta: ArticleMeta = {
    slug,
    title: pickTitle(markdown, slug),
    excerpt: pickExcerpt(markdown),
    readingTime: estimateReadingTime(markdown),
  };

  const rendered = renderMarkdownToHtml(markdown);

  return {
    meta,
    markdown,
    html: rendered.html,
    headings: rendered.headings,
  };
}
