import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Markdown-based blog posts.
 *
 * Posts live as `.md` files in `content/posts/` at the repo root and are committed
 * directly to Git (no Payload collection). The file name (without extension) is the
 * URL slug, e.g. `content/posts/2026-09-08-sample-post.md` -> `/blog/2026-09-08-sample-post`.
 *
 * These helpers only parse frontmatter + raw Markdown via gray-matter. The
 * Markdown -> HTML conversion happens on the display side (added later).
 */

export const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts')

type ExternalLinkPlatform = 'qiita' | 'zenn' | (string & {})

export interface PostExternalLink {
  platform: ExternalLinkPlatform
  url: string
}

/** Frontmatter as authored in the `.md` file. */
export interface PostFrontmatter {
  title: string
  date: string
  summary: string
  externalLinks?: PostExternalLink[]
}

/** A fully resolved post: frontmatter + derived slug + raw Markdown body. */
export interface Post extends PostFrontmatter {
  slug: string
  /** Raw Markdown body (frontmatter stripped). Not converted to HTML here. */
  content: string
}

const MARKDOWN_EXTENSION = '.md'

const normalizeExternalLinks = (value: unknown): PostExternalLink[] => {
  if (!Array.isArray(value)) return []

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return []
    const { platform, url } = entry as Record<string, unknown>
    if (typeof platform !== 'string' || typeof url !== 'string') return []
    return [{ platform, url }]
  })
}

const parsePost = (fileName: string): Post => {
  const slug = fileName.replace(new RegExp(`${MARKDOWN_EXTENSION}$`), '')
  const fullPath = path.join(POSTS_DIRECTORY, fileName)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date: typeof data.date === 'string' ? data.date : '',
    summary: typeof data.summary === 'string' ? data.summary : '',
    externalLinks: normalizeExternalLinks(data.externalLinks),
    content,
  }
}

/**
 * Read every `.md` file in `content/posts/`, parse frontmatter + body, and return
 * the posts sorted by `date` descending (newest first).
 */
export const getAllPosts = (): Post[] => {
  let fileNames: string[]
  try {
    fileNames = fs.readdirSync(POSTS_DIRECTORY)
  } catch {
    // Directory missing (e.g. no posts yet) — treat as empty.
    return []
  }

  return fileNames
    .filter((fileName) => fileName.endsWith(MARKDOWN_EXTENSION))
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

/**
 * Return the single post whose file name (without `.md`) matches `slug`, or
 * `null` if there is no such file.
 */
export const getPostBySlug = (slug: string): Post | null => {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}${MARKDOWN_EXTENSION}`)
  if (!fs.existsSync(fullPath)) return null

  return parsePost(`${slug}${MARKDOWN_EXTENSION}`)
}
