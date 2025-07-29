# 📚 Findoora Docs
![Findoora Docs Hero](public/images/screenshots/hero-banner.png)
> A modern, highly extensible documentation platform built with Next.js 15, designed for developers who want powerful content management with exceptional user experience.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MDX](https://img.shields.io/badge/MDX-3.1-orange?style=flat-square&logo=mdx)](https://mdxjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

**Findoora Docs** is a cutting-edge documentation platform that combines the simplicity of Markdown with the power of React components. Built for teams and individuals who need a fast, scalable, and beautiful way to create and share knowledge.

## ✨ Key Features

### 🎯 **Content-First Architecture**

- **Flexible Content System**: Support for blogs, documentation, tutorials, guides, and custom content types
- **MDX Integration**: Write in Markdown, enhance with React components
- **Category-Based Organization**: Automatic navigation and filtering by content categories
- **Frontmatter Support**: Rich metadata with custom fields

### 🚀 **Performance & Developer Experience**

- **Next.js 15 App Router**: Latest Next.js features with optimal performance
- **TypeScript Throughout**: Full type safety from content to components
- **Bundle Analysis**: Built-in tools to monitor and optimize bundle size
- **Hot Reload**: Instant feedback during development
- **Docker Ready**: Production-ready containerization

### 🎨 **Beautiful User Interface**

- **shadcn/ui Components**: Modern, accessible UI components
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode**: System-aware theme switching
- **Interactive Navigation**: Smart sidebar with breadcrumbs and table of contents
- **Search Functionality**: Powerful full-text search with live suggestions

### 🔧 **Advanced Features**

- **Mermaid Diagrams**: Render complex diagrams and flowcharts
- **Syntax Highlighting**: Beautiful code blocks with GitHub-style themes
- **Social Sharing**: Built-in sharing for all major platforms
- **SEO Optimized**: Structured data, Open Graph, and sitemap generation
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone and start
git clone https://github.com/muralitmuthuhotmail/findoora-docs.git
cd findoora-docs
docker-compose up -d

# Visit http://localhost:3000
```

### Option 2: Local Development

```bash
# Prerequisites: Node.js 18+ and pnpm
git clone https://github.com/muralitmuthuhotmail/findoora-docs.git
cd findoora-docs

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Visit http://localhost:3000
```

### Option 3: Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/muralitmuthuhotmail/findoora-docs)

## � Use Cases

### 🏢 **For Teams & Organizations**

- **Technical Documentation**: API docs, implementation guides, troubleshooting
- **Knowledge Base**: Internal wikis, onboarding materials, best practices
- **Product Documentation**: User guides, feature announcements, changelog
- **Engineering Blogs**: Technical insights, architecture decisions, tutorials

### 👤 **For Individual Developers**

- **Personal Blog**: Share knowledge, document learning journey
- **Portfolio Website**: Showcase projects with detailed case studies
- **Tutorial Platform**: Create step-by-step learning materials
- **Note-Taking System**: Organize research, code snippets, and ideas

### 🎓 **For Education**

- **Course Materials**: Lessons, assignments, resources
- **Research Documentation**: Papers, methodology, findings
- **Student Portfolios**: Academic work, projects, achievements
- **Learning Paths**: Structured curriculum with progress tracking

### 🚀 **For Open Source Projects**

- **Project Documentation**: Setup guides, contribution guidelines
- **API Reference**: Comprehensive endpoint documentation
- **Community Hub**: Announcements, FAQ, community guidelines
- **Change Documentation**: Release notes, migration guides

## 🛠 Technology Stack

### **Core Framework**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components

### **Content Management**

- **[MDX](https://mdxjs.com/)** - Markdown with React components
- **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** - Remote MDX compilation
- **[remark](https://remark.js.org/)** & **[rehype](https://github.com/rehypejs/rehype)** - Markdown processing
- **[Mermaid](https://mermaid.js.org/)** - Diagram and flowchart generation

### **Performance & SEO**

- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle size optimization
- **Structured Data** - Schema.org integration
- **Open Graph** - Social media optimization
- **Sitemap Generation** - Automatic SEO indexing

### **Development Tools**

- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager
- **[Docker](https://www.docker.com/)** - Containerization for deployment
- **ESLint & Prettier** - Code quality and formatting
- **Turbopack** - Fast bundler for development

## 📁 Project Architecture

```
findoora-docs/
├── app/                          # Next.js App Router
│   ├── [category]/              # Dynamic category routes
│   │   ├── page.tsx            # Category listing page
│   │   └── [slug]/             # Individual content pages
│   ├── api/                    # API routes
│   │   ├── search/             # Search functionality
│   │   ├── navigation/         # Navigation data
│   │   └── health/             # Health check
│   ├── layout.tsx              # Root layout with navigation
│   └── page.tsx                # Homepage
├── components/                  # React components
│   ├── blocks/                 # Content blocks
│   │   ├── mdx/               # MDX components
│   │   ├── content-list.tsx   # Content listing
│   │   └── table-of-contents.tsx
│   ├── features/              # Feature components
│   │   ├── search-dialog.tsx  # Search interface
│   │   ├── back-to-top.tsx    # Navigation helper
│   │   └── social-share.tsx   # Social sharing
│   ├── layout/                # Layout components
│   │   ├── app-bar.tsx        # Top navigation
│   │   ├── navigation-sidebar.tsx
│   │   └── mobile-navigation.tsx
│   ├── pages/                 # Page-specific components
│   ├── providers/             # Context providers
│   ├── seo/                   # SEO components
│   └── ui/                    # Reusable UI components
├── lib/                        # Utility functions
│   ├── content.ts             # Content management
│   ├── config.ts              # App configuration
│   └── utils/                 # Helper utilities
├── posts/                      # MDX content files
├── public/                     # Static assets
├── styles/                     # CSS and styling
├── types/                      # TypeScript definitions
├── docker-compose.yml          # Docker configuration
├── dockerfile                  # Docker build instructions
└── next.config.ts             # Next.js configuration
```

## 🛠️ Development

### Prerequisites

- Node.js >= 18 (for local development)
- pnpm >= 10.7.0 (for local development)
- Docker & Docker Compose (for containerized deployment)

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open the site in your browser using the BASE_URL from lib/urls.ts
```

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Manual Docker Build

```bash
# Build the Docker image
docker build -t findoora-docs .

# Run the container
docker run -d \
  --name findoora-docs \
  -p 3000:3000 \
  -e NODE_ENV=production \
  findoora-docs

# View logs
docker logs -f findoora-docs

# Stop and remove container
docker stop findoora-docs
docker rm findoora-docs
```

### Production Deployment

For production environments, consider:

1. **Environment Variables**: Set appropriate environment variables
2. **Reverse Proxy**: Use nginx or similar for SSL termination
3. **Health Checks**: Monitor `/api/health` endpoint
4. **Resource Limits**: Set memory and CPU limits
5. **Logging**: Configure proper log aggregation

```bash
# Production deployment with resource limits
docker run -d \
  --name findoora-docs-prod \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  --memory=512m \
  --cpus=1 \
  --restart=unless-stopped \
  findoora-docs
```

### Docker Compose with Nginx (Production)

```yaml
# docker-compose.prod.yml
version: "3.8"
services:
  docs:
    build: .
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - docs
    restart: unless-stopped
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

````env
# Base URL for the application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id

## 📝 Content Management

### **Creating Content**

1. **Add a new MDX file** in the `posts/` directory:

```mdx
---
menuTitle: "Getting Started"
title: "Getting Started with Findoora Docs"
publishedAt: "2024-07-26"
summary: "Learn how to set up and customize your documentation site"
category: "documents"
author: "Your Name"
tags: ["setup", "configuration", "getting-started"]
thumbnail: "/images/getting-started.jpg"
---

# Getting Started

Welcome to your new documentation site! This guide will help you...

## Installation

Follow these steps to get started:

1. Clone the repository
2. Install dependencies
3. Start developing

```typescript
// Your code examples with syntax highlighting
const config = {
  title: "My Documentation",
  description: "A comprehensive guide"
};
````

## Next Steps

- [ ] Customize your site configuration
- [ ] Add your first content
- [ ] Deploy to production

`````

### **Supported Content Types**

| Type | Category | Use Case | Example |
|------|----------|----------|---------|
| **Blog Posts** | `blog` | Articles, thoughts, announcements | Company updates, technical insights |
| **Documentation** | `docs` | Technical guides, API references | Installation guides, API documentation |
| **Tutorials** | `tutorial` | Step-by-step learning | How-to guides, code walkthroughs |
| **Guides** | `guide` | Best practices, methodologies | Style guides, workflow documentation |
| **Reference** | `reference` | Quick lookups, specifications | Command references, configuration options |
| **Custom** | `any-name` | Your unique content types | Press releases, case studies, etc. |

### **Rich Content Features**

#### **Code Blocks with Syntax Highlighting**
````mdx
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = await fetchUsers();
`````

`````

#### **Mermaid Diagrams**
````mdx
```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```
`````

#### **Task Lists**

```mdx
- [x] Completed task
- [ ] Pending task
- [ ] Future enhancement
```

#### **Tables with Alignment**

```mdx
| Left | Center | Right |
| :--- | :----: | ----: |
| Data |  Data  |  Data |
```

#### **Callouts and Quotes**

```mdx
> 💡 **Pro Tip**: Use frontmatter to add rich metadata to your content.

> ⚠️ **Warning**: Always backup your content before major changes.
```

### **Content Organization**

#### **Automatic Navigation**

The platform automatically generates navigation based on your content structure:

- Categories become top-level navigation items
- Individual posts become sub-navigation items
- Menu titles are used for clean navigation labels

#### **Search Integration**

All content is automatically indexed for search:

- Full-text search across titles, summaries, and content
- Category-based filtering
- Relevance scoring with highlighted matches
- Search suggestions and popular terms

#### **SEO & Social Sharing**

Every piece of content gets:

- Structured data for search engines
- Open Graph meta tags for social sharing
- Twitter Card support
- Automatic sitemap generation
- Optimized URLs based on categories and slugs

## ⚙️ Configuration

### **Environment Variables**

Create a `.env.local` file for local development:

```bash
# Base URL for your site
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# API Base URL (usually same as base URL)
NEXT_PUBLIC_BASE_API_URL=http://localhost:3000

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Google Site Verification
GOOGLE_SITE_VERIFICATION=your-verification-code

# Optional: Disable telemetry
NEXT_TELEMETRY_DISABLED=1
```

### **Site Configuration**

Update `lib/config.ts` to customize your site:

```typescript
export const SITE_NAME = "Your Docs Site";
export const SITE_SUB_TITLE = "Documentation";
export const SITE_DESCRIPTION = "Your site description";
export const GITHUB_URL = "https://github.com/your-username/your-repo";
export const SITE_AUTHOR = "@your-handle";
// ... more configuration options
```

### **Styling & Theming**

The platform uses Tailwind CSS with CSS custom properties for theming:

```css
/* styles/theme.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more theme variables */
}

[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme overrides */
}
```

## 📦 Deployment

### **Docker Deployment**

1. **Using Docker Compose** (Recommended):

```bash
# Production deployment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

2. **Using Docker directly**:

```bash
# Build image
docker build -t findoora-docs .

# Run container
docker run -p 3000:3000 findoora-docs
```

### **Vercel Deployment**

1. **One-click deploy**:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/muralitmuthuhotmail/findoora-docs)

2. **Manual deployment**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Other Platforms**

**Netlify**:

```bash
# Build command
pnpm build

# Publish directory
.next
```

**AWS/DigitalOcean/Railway**:

- Use the provided `dockerfile` for container-based deployment
- Set environment variables in your platform's dashboard
- Ensure Node.js 18+ is available

## 🧪 Development

### **Available Scripts**

```bash
# Development
pnpm dev                 # Start development server with Turbopack
pnpm dev:debug          # Start with debugging enabled

# Building
pnpm build              # Production build
pnpm start              # Start production server
pnpm build:analyze      # Build with bundle analysis

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix linting issues
pnpm format             # Format code with Prettier
pnpm typecheck          # TypeScript type checking

# Testing
pnpm test               # Run tests
pnpm test:watch         # Run tests in watch mode
pnpm test:coverage      # Generate coverage report
```

### **Development Workflow**

1. **Start the development server**:

```bash
pnpm dev
```

2. **Add content** to `posts/` directory with `.mdx` extension

3. **Customize components** in the `components/` directory

4. **Update configuration** in `lib/config.ts`

5. **Test your changes** and ensure type safety:

```bash
pnpm typecheck && pnpm lint
```

### **Adding Custom Components**

Create reusable MDX components:

```typescript
// components/blocks/mdx/custom-component.tsx
interface CustomComponentProps {
  title: string;
  children: React.ReactNode;
}

export function CustomComponent({ title, children }: CustomComponentProps) {
  return (
    <div className="my-6 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="prose">{children}</div>
    </div>
  );
}
```

Register it in `custom-mdx.tsx`:

```typescript
import { CustomComponent } from "./custom-component";

const components = {
  // ... existing components
  CustomComponent,
};
```

Use in MDX content:

```mdx
<CustomComponent title="Important Note">
  This is a custom component with **markdown** support!
</CustomComponent>
```

````

## 📝 Content Management

### Content System Overview

The docs app uses a flexible content system that supports multiple content types:

- **Content Posts**: Generic content with category-based organization
- **Blogs**: Articles, tutorials, and thoughts (category: "blog")
- **Documentation**: Technical guides and references (category: "documents")
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
````

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

## 🚀 Future Improvements & Possibilities

### **Phase 1: Enhanced Content Management**

- **Multi-language Support**: i18n integration with automatic language detection
- **Content Versioning**: Git-based content history and rollback functionality
- **Advanced Search**: Full-text search with filters, sorting, and search analytics
- **Content Templates**: Pre-built templates for different content types
- **Collaborative Editing**: Real-time collaborative editing with conflict resolution
- **Content Scheduling**: Publish content at scheduled times with draft previews

### **Phase 2: Advanced Features**

- **Interactive Playground**: Embedded code execution and live examples
- **API Documentation Generator**: Auto-generate docs from OpenAPI/GraphQL schemas
- **Comment System**: Built-in commenting with moderation and notifications
- **Analytics Dashboard**: Content performance metrics and user engagement insights
- **Progressive Web App**: Offline reading with service worker caching
- **Voice Navigation**: Accessibility enhancement with voice commands

### **Phase 3: Enterprise & Integration**

- **User Authentication**: Role-based access control with SSO integration
- **Content Management UI**: Admin interface for non-technical content creators
- **Webhook Integration**: Auto-sync with external content sources (Notion, Confluence)
- **Custom Domains**: Multi-tenant architecture with custom branding
- **API-First Approach**: RESTful and GraphQL APIs for headless CMS usage
- **Performance Monitoring**: Real-time performance metrics and optimization suggestions

### **Phase 4: AI & Automation**

- **AI-Powered Content Generation**: Automated documentation from code comments
- **Smart Content Recommendations**: ML-driven content suggestions for users
- **Automated Testing**: Content quality checks and broken link detection
- **SEO Optimization**: AI-driven meta descriptions and keyword suggestions
- **Translation Automation**: AI-powered content translation with human review
- **Accessibility Auditing**: Automated accessibility compliance checking

### **Integration Possibilities**

#### **CMS & Content Sources**

- **Headless CMS**: Contentful, Strapi, Sanity integration
- **Git-based**: GitHub, GitLab, Bitbucket content synchronization
- **Note-taking Apps**: Notion, Obsidian, Roam Research imports
- **Documentation Tools**: GitBook, Confluence, Wiki migration tools

#### **Development Tools**

- **Code Documentation**: JSDoc, TypeDoc, Rust Doc integration
- **API Tools**: Postman, Insomnia collection imports
- **Testing Frameworks**: Jest, Cypress test result documentation
- **Monitoring**: Integration with Sentry, DataDog, New Relic

#### **Productivity & Workflow**

- **Project Management**: Jira, Trello, Asana integration for requirement docs
- **Communication**: Slack, Discord, Teams for collaborative documentation
- **Design Tools**: Figma, Sketch integration for design documentation
- **Analytics**: Google Analytics, Mixpanel, Amplitude integration

### **Community & Ecosystem**

#### **Plugin Architecture**

- **Plugin Marketplace**: Community-driven extensions and themes
- **Theme System**: Easy customization with pre-built design systems
- **Component Library**: Shareable MDX components across installations
- **Template Gallery**: Industry-specific documentation templates

#### **Open Source Contributions**

- **Documentation Standards**: Best practices and style guides
- **Accessibility Tools**: Screen reader testing and compliance tools
- **Performance Optimizations**: Core web vitals improvements
- **Security Enhancements**: Content sanitization and XSS protection

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Ways to Contribute**

- 🐛 **Bug Reports**: Found an issue? Let us know!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 📖 **Documentation**: Help improve our docs
- 🎨 **Design**: UI/UX improvements and accessibility enhancements
- 🔧 **Code**: Bug fixes, new features, and optimizations

### **Development Setup**

1. **Fork the repository** on GitHub
2. **Clone your fork**:

```bash
git clone https://github.com/your-username/findoora-docs.git
cd findoora-docs
```

3. **Install dependencies**:

```bash
pnpm install
```

4. **Create a feature branch**:

```bash
git checkout -b feature/your-feature-name
```

5. **Make your changes** and test thoroughly
6. **Submit a pull request** with a clear description

### **Contribution Guidelines**

- ✅ Follow the existing code style and conventions
- ✅ Write tests for new features and bug fixes
- ✅ Update documentation for any API changes
- ✅ Ensure all tests pass and there are no linting errors
- ✅ Keep commits focused and write clear commit messages

### **Code of Conduct**

We are committed to providing a welcoming and inclusive environment for all contributors. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

### **What this means:**

- ✅ **Commercial Use**: Use this project in commercial applications
- ✅ **Modification**: Modify the source code to fit your needs
- ✅ **Distribution**: Distribute the original or modified versions
- ✅ **Private Use**: Use the project for personal or internal purposes
- ❗ **No Warranty**: The software is provided "as is" without warranty
- ❗ **Attribution Required**: Include the original license in any distribution

## 🙏 Acknowledgments

### **Built With Love Using**

- [Next.js](https://nextjs.org/) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible React components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown for the component era
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

### **Inspired By**

- [Docusaurus](https://docusaurus.io/) - Documentation platform excellence
- [GitBook](https://www.gitbook.com/) - Beautiful documentation experiences
- [Notion](https://www.notion.so/) - Modern content management
- [Linear](https://linear.app/) - Clean and performant web applications

---

<div align="center">

**[⭐ Star this project](https://github.com/muralitmuthuhotmail/findoora-docs)** • **[🐛 Report Bug](https://github.com/muralitmuthuhotmail/findoora-docs/issues)** • **[💡 Request Feature](https://github.com/muralitmuthuhotmail/findoora-docs/issues)**

Made with ❤️ by [Murali Thangamuthu](https://github.com/muralitmuthuhotmail)

</div>
