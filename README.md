# FitIQ Hub 🧬

**Better Stats. Better Results.**

A modern, science-backed health and fitness blog with integrated calculators. No backend required. 100% static site hosted on GitHub Pages.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Content Strategy](#content-strategy)
- [Monetization](#monetization)
- [Roadmap](#roadmap)

---

## 🎯 Overview

FitIQ Hub is a health and fitness blog that provides science-backed content on nutrition, body metrics, and fitness. Alongside articles, we offer free, browser-based calculators that help users understand their body composition and energy expenditure.

**Mission:** Give people the numbers that matter, so they can improve their health with real data.

**Positioning:** Health & fitness blog with integrated tools (not a tool site with articles).

**Business Model:** Organic SEO traffic → AdSense revenue + eventual premium content.

---

## 🚀 Features

### Tools (Calculators)
- **BMI Calculator** - Quick body mass index calculation with category interpretation
- **Body Fat % Estimator** - US Navy formula-based body composition analysis
- **TDEE & BMR Calculator** - Daily calorie burn with goal-based recommendations

### Content
- **Feature Articles** - Science-backed, in-depth guides on health metrics
- **Embedded CTAs** - Tool links within articles to drive calculator usage
- **Related Content** - Internal linking to build authority and engagement

### Technical
- ✅ 100% static HTML/CSS/JavaScript (no backend)
- ✅ Mobile-responsive design
- ✅ Fast load times (no dependencies)
- ✅ SEO-optimized structure
- ✅ Analytics ready (Google Analytics integration)
- ✅ AdSense placement optimized
- ✅ Progressive enhancement

---

## 🧱 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom design system with CSS variables
- **JavaScript (Vanilla)** - Client-side calculations and interactivity
- **GitHub Pages** - Free static hosting
- **Google Analytics** - Traffic and engagement tracking
- **Google AdSense** - Revenue generation

**Zero dependencies.** Everything runs in the browser.

---

## 📁 File Structure

```
fitiqhub/
├── index.html                          # Homepage
├── css/
│   ├── globals.css                    # Base styles, variables, typography
│   ├── header.css                     # Header/nav styling
│   ├── cards.css                      # Card components (tools, articles)
│   ├── tools.css                      # Calculator pages
│   ├── articles.css                   # Article pages
│   └── responsive.css                 # Mobile breakpoints
├── js/
│   ├── bmi.js                        # BMI calculator logic
│   ├── bodyfat.js                    # Body fat calculator logic
│   ├── tdee.js                       # TDEE calculator logic
│   ├── utilities.js                  # Shared helper functions
│   └── analytics.js                  # Google Analytics tracking
├── tools/
│   ├── bmi.html                      # BMI calculator page
│   ├── bodyfat.html                  # Body fat calculator page
│   └── tdee.html                     # TDEE calculator page
├── articles/
│   ├── what-is-bmi.html             # Article: BMI explained
│   ├── better-measurements.html      # Article: Body fat vs BMI
│   └── healthy-targets.html          # Article: TDEE explained
├── public/
│   ├── favicon.ico                   # Site favicon
│   ├── logo-dark.svg                 # Dark mode logo
│   ├── logo-light.svg                # Light mode logo
│   └── icons/
│       ├── bmi.svg
│       ├── bodyfat.svg
│       └── tdee.svg
└── README.md                          # This file
```

---

## 🎨 Brand Identity

| Element | Value |
|---------|-------|
| Primary Color | `#00E676` (Neon FitIQ Green) |
| Dark Background | `#1A1F25` (Charcoal) |
| Text Primary | `#FFFFFF` (White) |
| Text Secondary | `#CCCCCC` (Light Gray) |
| Font (Headings) | Montserrat (Bold, 700-900) |
| Font (Body) | Inter (Regular, 400-600) |
| Tone | Motivational + Scientific |

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitiqhub.git
   cd fitiqhub
   ```

2. **Run a local server** (required for testing)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. **Visit in browser**
   ```
   http://localhost:8000
   ```

### File Organization Best Practices

- **Keep CSS organized** - Each CSS file handles one aspect (header, cards, articles, etc.)
- **Use CSS variables** - Update brand colors in `globals.css` root variables
- **Reusable JavaScript** - Keep common functions in `utilities.js`
- **Analytics** - Use `analytics.js` for tracking user interactions
- **Responsive design** - Mobile-first approach; responsive.css handles breakpoints

---

## 📤 Deployment

### Deploy to GitHub Pages

1. **Create GitHub repository**
   - Repository name: `fitiqhub` (or `yourusername.github.io` for user site)
   - Public visibility

2. **Push files**
   ```bash
   git add .
   git commit -m "Initial FitIQ Hub launch"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main (or master)
   - Folder: / (root)
   - Save

4. **Access your site**
   ```
   https://yourusername.github.io/fitiqhub
   # Or custom domain if configured
   ```

### Custom Domain Setup

1. Buy domain (Namecheap, Google Domains, etc.)
2. Point DNS to GitHub Pages:
   - **A records:** 
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - **CNAME:** yourusername.github.io
3. Add domain in GitHub Settings → Pages
4. Wait 24-48 hours for DNS propagation

---

## 📊 Content Strategy

### SEO Cluster Approach

Each calculator is the "pillar" with supporting article "clusters":

**BMI Cluster**
- Calculator: BMI Calculator
- Article 1: What Your BMI Actually Means
- Article 2: Body Fat % vs BMI (comparison)

**Body Composition Cluster**
- Calculator: Body Fat %
- Article 1: Body Fat % vs BMI
- Article 2: Healthy ranges by age & gender

**Nutrition/Calories Cluster**
- Calculator: TDEE & BMR
- Article 1: How Many Calories You Burn
- Article 2: Calorie deficit strategies

**Internal Linking:**
- Each article links to related tools
- Each tool page links to related articles
- "Read Next" sections at article bottoms
- Related tools sidebar on tool pages

### Content Expansion Plan

1. **Month 1-2** (Launch): 3 tools + 3 articles (current)
2. **Month 3-4**: Add 3-4 more tools (water intake, protein calculator, macro calculator)
3. **Month 5-6**: Expand each cluster with 2-3 more articles
4. **Month 7+**: Target specific keywords with blog content

**Keyword targets:**
- "BMI calculator"
- "Body fat percentage calculator"
- "TDEE calculator"
- "How many calories should I eat"
- "Body composition vs BMI"
- "Healthy body fat percentage"

---

## 💰 Monetization

### Google AdSense

**Placement strategy:**
- Header banner (320x50 mobile, 728x90 desktop)
- Between featured articles on homepage
- Below calculator results
- Between article sections
- Footer area

**Expected RPM:** $2-8 per thousand impressions (depends on traffic quality)

**To enable AdSense:**
1. Submit site to Google AdSense
2. Wait for approval (1-3 weeks)
3. Add AdSense code to pages
4. Place ads in `.ad-placeholder` divs

### Future Revenue Streams

- Premium content (detailed guides)
- Affiliate links (fitness products)
- Email newsletter (for user engagement)

---

## 📈 Analytics Setup

### Google Analytics 4

1. **Create GA4 property**
   - Go to analytics.google.com
   - Create new property
   - Get Measurement ID (G-XXXXXX)

2. **Add to HTML**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXX');
   </script>
   ```

3. **Track events**
   - Calculator usage (already in analytics.js)
   - Article views (already in analytics.js)
   - CTA clicks (already in analytics.js)
   - Scroll depth (already in analytics.js)

### Key Metrics to Monitor

- **Traffic sources** - Which articles/tools drive visitors
- **User engagement** - Time on page, scroll depth
- **Conversions** - Calculator usage, CTA clicks
- **Bounce rate** - Page quality indicator
- **Return visitors** - Content stickiness

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Core design system
- [x] 3 calculator tools
- [x] 3 launch articles
- [x] Mobile responsive
- [x] Analytics setup
- [x] GitHub Pages deployment

### Phase 2: Expansion (Next 3-4 months)
- [ ] 3-4 additional calculators
- [ ] 6-8 more articles (expand clusters)
- [ ] SEO optimization (meta tags, schema)
- [ ] Internal linking strategy
- [ ] Submit to Google Search Console
- [ ] Monitor Google Analytics

### Phase 3: Growth (Months 5-12)
- [ ] Weekly content cadence
- [ ] 50+ total articles
- [ ] 10+ tools
- [ ] Email newsletter
- [ ] Social media presence
- [ ] Link building/PR

### Phase 4: Monetization (Months 6+)
- [ ] Google AdSense revenue
- [ ] Affiliate partnerships
- [ ] Premium content tier
- [ ] Product recommendations
- [ ] Sponsorship opportunities

### Long-term Vision
- Progressive Web App (installable)
- User accounts + progress tracking
- Advanced body tracking dashboard
- API for integrations
- Mobile app

---

## 🔐 Performance Optimization

### Current Optimizations
- ✅ No external dependencies
- ✅ CSS variables for fast styling updates
- ✅ Lazy-loaded images
- ✅ Mobile-first design
- ✅ Semantic HTML

### Future Optimizations
- Minify CSS/JS in production
- Image optimization (WebP format)
- Implement service worker for offline access
- Code splitting for faster initial load
- Caching strategies

---

## 🛠️ Maintenance

### Regular Tasks
- **Weekly:** Monitor analytics, check for broken links
- **Monthly:** Review user feedback, analyze traffic patterns
- **Quarterly:** Update content, add new tools/articles

### Update Checklist
- Update copyright year (search for 2025 → current year)
- Refresh article dates if revising content
- Check all calculator formulas for accuracy
- Test on multiple devices/browsers
- Validate HTML/CSS

---

## 📞 Support & Contact

- **Issues:** GitHub Issues on repository
- **Questions:** Check README first, then GitHub Discussions
- **Feedback:** Use website feedback form (future feature)

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Design inspiration: Modern health/fitness websites
- Calculator formulas: Research-backed equations (Mifflin-St Jeor, US Navy)
- Color palette: Accessibility-first design
- Community: Open-source health and fitness community

---

### 💪 FitIQ Hub — Know Your Numbers. Dominate Your Goals.

**Built with attention to detail, backed by science, powered by data.**

Last updated: January 2025
Version: 1.0.0