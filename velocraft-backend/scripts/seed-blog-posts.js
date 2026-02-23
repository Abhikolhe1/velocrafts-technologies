/**
 * Seeds the blog_posts table with sample data.
 * Run: node scripts/seed-blog-posts.js
 * Requires: DB_NAME, DB_HOST, DB_USER, DB_PASSWORD in .env (or defaults)
 */
require('dotenv/config');
const mysql = require('mysql');

const dbName = process.env.DB_NAME || 'velocraft';
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: dbName,
};

const samplePosts = [
  {
    title: 'How AI is Transforming Web Development in 2025',
    slug: 'how-ai-transforms-web-development-2025',
    excerpt: 'AI-powered tools are revolutionizing how we build websites. From automated testing to intelligent code generation, discover how developers are leveraging AI to deliver faster and smarter solutions.',
    category: 'Web Development',
    author: 'Velocrafts Technologies',
    date: '2025-02-15',
    contentIntro: 'Artificial intelligence is reshaping how we conceive, build, and maintain web applications. From intelligent code assistants to automated testing frameworks, developers now have access to tools that dramatically accelerate productivity while maintaining high standards.',
    contentSections: JSON.stringify([
      { heading: 'Code Generation and Autocomplete', paragraphs: ['Modern AI code assistants have evolved from simple autocomplete to full context-aware code generation.', 'Teams report significant gains in velocity, especially for boilerplate, tests, and documentation.'] },
      { heading: 'Automated Testing and QA', paragraphs: ['AI-powered testing tools can generate test cases, identify edge cases, and detect visual regressions.', 'Combined with continuous integration, AI-driven testing helps ship faster without compromising quality.'] },
    ]),
    quote: 'AI is not replacing developers—it\'s amplifying what they can build.',
    keyPoints: JSON.stringify(['AI-powered code completion speeds up development by 30–50%.', 'Automated testing reduces human error and release cycles.', 'Intelligent assistants help onboard new developers faster.']),
    tags: JSON.stringify(['AI', 'Web Development', 'Automation', '2025']),
    readTime: 8,
    authorBio: 'Our team at Velocrafts has been experimenting with AI-driven development workflows since 2023.',
    published: 1,
  },
  {
    title: 'Scalable Cloud Architecture: Best Practices for Growing Businesses',
    slug: 'scalable-cloud-architecture-best-practices',
    excerpt: 'Learn how to design cloud infrastructure that grows with your business. We break down key principles for building resilient, cost-effective systems that scale seamlessly.',
    category: 'Cloud & DevOps',
    author: 'Velocrafts Technologies',
    date: '2025-02-10',
    contentIntro: 'Building cloud architecture that scales with your business requires a blend of proven patterns, modern tooling, and foresight.',
    contentSections: JSON.stringify([
      { heading: 'Foundational Principles', paragraphs: ['Scalability starts with loose coupling and high cohesion.', 'Horizontal scaling should be the default.'] },
      { heading: 'Cost and Performance', paragraphs: ['Right-sizing resources and auto-scaling can reduce cloud spend by 30–50%.', 'Caching at multiple layers reduces latency and load.'] },
    ]),
    quote: 'Scale is not about adding more servers—it\'s about designing systems that grow elegantly with demand.',
    keyPoints: JSON.stringify(['Design for failure: assume components will fail.', 'Use managed services where possible.', 'Implement observability from day one.']),
    tags: JSON.stringify(['Cloud', 'Architecture', 'DevOps', 'Scalability']),
    readTime: 10,
    authorBio: 'We\'ve helped dozens of startups and enterprises architect cloud-native solutions.',
    published: 1,
  },
  {
    title: 'UX Design Trends That Will Define 2025',
    slug: 'ux-design-trends-2025',
    excerpt: 'From immersive interfaces to inclusive design, explore the UX trends shaping user experiences. Stay ahead with insights on what users expect from modern digital products.',
    category: 'UI/UX Design',
    author: 'Velocrafts Technologies',
    date: '2025-02-05',
    contentIntro: 'User experience design continues to evolve as technology and user expectations shift. In 2025, we\'re seeing a convergence of immersive interfaces and accessibility-first approaches.',
    contentSections: JSON.stringify([
      { heading: 'Immersive and Spatial UX', paragraphs: ['With the rise of spatial computing, designers are rethinking interfaces beyond the flat screen.', 'The key is balance: immersive doesn\'t mean overwhelming.'] },
      { heading: 'Inclusive and Accessible Design', paragraphs: ['Accessibility is moving from compliance to core strategy.', 'Design systems with accessibility baked in from the start.'] },
    ]),
    quote: 'The best interfaces feel invisible—they get out of the way so users can accomplish their goals with minimal friction.',
    keyPoints: JSON.stringify(['Immersive and spatial interfaces are gaining traction.', 'Inclusive design and accessibility are business imperatives.', 'Micro-interactions create more engaging experiences.']),
    tags: JSON.stringify(['UX', 'Design', 'Trends', '2025']),
    readTime: 7,
    authorBio: 'Our design team stays ahead of UX trends through continuous research and real-world projects.',
    published: 1,
  },
];

const conn = mysql.createConnection(config);

function run() {
  conn.connect((err) => {
    if (err) {
      console.error('Connection failed:', err.message);
      process.exit(1);
    }

    const stmt = `INSERT INTO blog_posts (title, slug, excerpt, category, author, date, contentIntro, contentSections, quote, keyPoints, tags, readTime, authorBio, published, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE title=VALUES(title), excerpt=VALUES(excerpt), contentIntro=VALUES(contentIntro), contentSections=VALUES(contentSections), quote=VALUES(quote), keyPoints=VALUES(keyPoints), tags=VALUES(tags), readTime=VALUES(readTime), authorBio=VALUES(authorBio), updatedAt=NOW()`;

    let done = 0;
    samplePosts.forEach((p) => {
      const values = [p.title, p.slug, p.excerpt, p.category, p.author, p.date, p.contentIntro, p.contentSections, p.quote, p.keyPoints, p.tags, p.readTime, p.authorBio, p.published];
      conn.query(stmt, values, (err) => {
        if (err) {
          console.error('Insert failed for', p.slug, err.message);
        } else {
          console.log('Seeded:', p.slug);
        }
        done++;
        if (done === samplePosts.length) {
          conn.end();
          console.log('Seed completed.');
        }
      });
    });
  });
}

run();
