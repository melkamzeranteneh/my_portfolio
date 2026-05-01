"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ArticleMeta } from "@/app/lib/mdx";

type BlogCardsProps = {
  posts: ArticleMeta[];
};

import { BookOpen, ArrowRight } from "lucide-react";

export function BlogCards({ posts }: BlogCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post, index) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`game-panel group p-6 border border-white/5 rounded-sm flex flex-col hover:border-accent/40 transition-colors ${
            index === 0 ? "sm:col-span-2" : "sm:col-span-1"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-accent/60" />
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent/60">
                {post.readingTime}
              </p>
            </div>
            <div className="h-[1px] w-6 bg-white/10" />
          </div>
          
          <h3 className={`font-bold tracking-tight text-white group-hover:text-accent transition-colors ${
            index === 0 ? "text-xl sm:text-2xl" : "text-base"
          }`}>
            {post.title}
          </h3>
          
          <p className="mt-3 flex-grow text-[13px] leading-relaxed text-muted">
            {post.excerpt}
          </p>
          
          <div className="mt-6 border-t border-white/5 pt-4">
            <Link
              href={`/articles/${post.slug}`}
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:underline transition group/link"
            >
              <span>Access Log</span>
              <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
