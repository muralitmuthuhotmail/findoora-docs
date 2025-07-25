# Findoora Docs

A modern documentation site built with Next.js 15, featuring MDX content, TypeScript, and a beautiful UI powered by shadcn/ui. Supports flexible content types including blogs, documentation, tutorials, and more.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Flexible Content System**: Support for blogs, docs, tutorials, and any content type
- **MDX Support**: Write content in Markdown with React components
- **Content Categories**: Organize content by type with built-in filtering
- **SEO Optimized**: Built-in metadata, sitemap, and structured data
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Performance**: Optimized images, lazy loading, and bundle analysis
- **Dark Mode**: System-aware theme switching
- **Responsive Design**: Mobile-first responsive layout with app bar navigation
- **Testing**: Comprehensive test coverage with Vitest
- **Type Safety**: Strict TypeScript configuration

## 📁 Project Structure

```
apps/docs/
├── app/                      # Next.js App Router
│   ├── content/             # Content pages (generic content type)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # SEO robots.txt
├── components/              # React components
│   ├── blocks/              # Reusable content blocks
│   ├── layout/              # Layout components (app bar, sidebar, footer)
│   ├── pages/               # Page-specific components
│   ├── seo/                 # SEO components
│   └── ui/                  # UI components
├── lib/                     # Utility functions
│   ├── utils/               # Helper utilities
│   ├── content.ts           # Generic content utilities
│   └── metadata.ts          # SEO metadata helpers
├── posts/                   # MDX content files
├── test/                    # Test files
└── types/                   # TypeScript type definitions
```

## 🛠️ Development

### Prerequisites

- Node.js >= 20
- pnpm >= 10.12.4

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open the site in your browser using the BASE_URL from lib/urls.ts
```

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm preview          # Preview production build locally

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm typecheck        # Run TypeScript type checking
pnpm format           # Format code with Prettier

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
pnpm test:ui          # Run tests with UI

# Analysis
pnpm analyze          # Analyze bundle size
pnpm build:analyze    # Build and analyze bundle
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Base URL for the application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id

# Google Site Verification (optional)
GOOGLE_SITE_VERIFICATION=your-verification-code
```

## 📝 Content Management

### Content System Overview

The docs app uses a flexible content system that supports multiple content types:

- **Content Posts**: Generic content with category-based organization
- **Blogs**: Articles, tutorials, and thoughts (category: "blog")
- **Documentation**: Technical guides and references (category: "docs")
- **Tutorials**: Step-by-step learning materials (category: "tutorial")
- **Custom Types**: Any content category you define

### Adding Content

1. Create a new `.mdx` file in the `posts/` directory
2. Add frontmatter with metadata:

```mdx
---
menuTitle: "Short Title"
title: "Full Content Title"
publishedAt: "2024-01-15"
summary: "A brief description of the content."
image: "/images/content/featured-image.jpg"
category: "blog"
---

Your content here...
```

### Content API Usage

The generic content system provides flexible APIs:

```typescript
// Get all content
import { getContentPosts } from "@/lib/content";
const allContent = getContentPosts();

// Get content by category
const blogPosts = getContentPosts("blog");
const documentation = getContentPosts("docs");
const tutorials = getContentPosts("tutorial");

// Get specific content
import { getContentPost } from "@/lib/content";
const post = getContentPost("my-slug");
```

### Creating New Content Types

1. Add content with appropriate `category` in frontmatter
2. Create route handlers for the new content type (optional)
3. Create specific components for the content type (optional)

Example for documentation:

```typescript
// lib/docs.ts
export const getDocumentation = () => getContentPosts("docs");

// app/docs/page.tsx
export default function DocsPage() {
  const docs = getContentPosts("docs");
  // Render documentation list
}
```

### MDX Features

- **Syntax Highlighting**: Code blocks with syntax highlighting
- **Responsive Images**: Automatic image optimization
- **Custom Components**: Use React components in markdown
- **Table of Contents**: Automatic generation from headings
- **Anchor Links**: Click-to-copy heading links

## 🎨 UI Components

### App Bar

The application includes a responsive app bar with the following features:

- **Logo and Branding**: Clickable logo that navigates to home
- **Mobile Navigation**: Collapsible sidebar for mobile devices
- **Search Interface**: Integrated search functionality (expandable)
- **Theme Toggle**: System-aware dark/light mode switching
- **GitHub Link**: Direct link to project repository
- **Responsive Design**: Adapts to different screen sizes

#### App Bar Customization

```tsx
// Customize app bar appearance
import { AppBar } from "@/components/layout/app-bar";

// Usage with custom props
<AppBar
  hasBlur={true} // Enable backdrop blur effect
  isSticky={true} // Stick to top on scroll
  className="custom-class" // Additional styling
/>;
```

### Navigation System

The docs app uses a dual navigation approach:

- **Desktop**: Persistent sidebar with hierarchical navigation
- **Mobile**: Collapsible sheet-based navigation accessible via hamburger menu
- **Content-Aware**: Automatically generates navigation from content posts

## 🎨 Customization

### App Bar Styling

The app bar supports extensive customization through:

- **Backdrop Effects**: Blur and transparency controls
- **Positioning**: Sticky or static positioning options
- **Responsive Breakpoints**: Mobile-first responsive design
- **Theme Integration**: Automatic theme switching support

### Navigation Behavior

- **Mobile-First**: Touch-friendly interactions on mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Logical focus order and indicators

## 🚀 Performance

### Optimization Features

- **Content Filtering**: Efficient category-based filtering
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Bundle Analysis**: Webpack Bundle Analyzer integration
- **Code Splitting**: Dynamic imports and lazy loading
- **Caching**: Static generation and proper cache headers
- **Compression**: Gzip compression enabled

### Performance Monitoring

Web Vitals are automatically tracked in development:

```bash
# View Web Vitals in browser console
pnpm dev
```

## 📱 Accessibility

### Standards Compliance

- **WCAG 2.1 AA**: Compliant with accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA attributes
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets contrast requirements

### Testing Accessibility

```bash
# Run accessibility tests
pnpm test:a11y

# Manual testing with screen reader
# Use VoiceOver (macOS) or NVDA (Windows)
```

## 🔧 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**

```bash
pnpm typecheck
pnpm build
```

**Content not showing**

```bash
# Check frontmatter format
# Verify category spelling
# Check file extension (.mdx)
```

**Performance issues**

```bash
pnpm analyze
# Check bundle size and optimize imports
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Style

- Follow the ESLint configuration
- Use TypeScript strictly
- Write meaningful commit messages
- Add tests for new features

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX Documentation](https://mdxjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:

1. Check the documentation
2. Search existing issues
3. Create a detailed issue report
4. Contact the development team

---

Built with ❤️ by the Findoora team
