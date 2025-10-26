# Contributing to BigFishAlert

First off, thank you for considering contributing to BigFishAlert! 🐟

It's people like you that make BigFishAlert such a great tool for protecting retail traders from whale dumps.

## 🌊 Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Welcome newcomers and beginners
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Great Bug Reports** include:
- Clear, descriptive title
- Exact steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, wallet)

**Example:**
```
Title: Token scanner shows "Unknown Token" for BONK

Steps to reproduce:
1. Go to https://bigfishalert.vercel.app
2. Paste BONK address: DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
3. Click "Cast Net"

Expected: Show "Bonk" token name
Actual: Shows "Unknown Token"

Environment: Chrome 120, Windows 11, Phantom wallet
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**Great Enhancement Suggestions** include:
- Clear use case
- Why this benefits users
- Potential implementation approach
- Examples from other projects (if any)

### Pull Requests

**Good Pull Requests** include:
- Clear description of changes
- Reference to related issue (if any)
- Screenshots/GIFs for UI changes
- Tests for new features
- Updated documentation

## 🛠 Development Setup

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
```

### Local Development

1. **Fork & Clone**
```bash
git clone https://github.com/YOUR_USERNAME/BigFishAlert.git
cd BigFishAlert
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment**
```bash
cp .env.local.example .env.local
```

4. **Run Dev Server**
```bash
npm run dev
```

5. **Open Browser**
```
http://localhost:3000
```

### Project Structure

```
app/          - Next.js pages & API routes
components/   - React components
lib/          - Utilities, hooks, helpers
programs/     - Anchor smart contract
docs/         - Documentation
```

## 📝 Coding Guidelines

### TypeScript
- Use TypeScript for all new code
- Prefer interfaces over types
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

### Styling
- Use Tailwind CSS classes
- Follow existing theme conventions
- Ensure dark mode compatibility

### Git Commit Messages
Follow conventional commits:

```
feat: add portfolio tracking feature
fix: resolve BONK token name issue
docs: update installation guide
style: format code with prettier
refactor: simplify whale detection logic
test: add tests for risk algorithm
chore: update dependencies
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Write Tests
- Add unit tests for new utilities
- Add integration tests for API routes
- Test edge cases

## 📖 Documentation

### Update Documentation When:
- Adding new features
- Changing behavior
- Fixing bugs that affect usage
- Adding environment variables

### Documentation Files
- `README.md` - Overview & quick start
- `CONTRIBUTING.md` - This file
- `docs/` - Detailed guides

## 🎨 Design Guidelines

### UI/UX Principles
- **Simplicity** - Keep it simple for non-crypto users
- **Ocean Metaphors** - Use consistent marine terminology
- **Accessibility** - Support screen readers, keyboard navigation
- **Responsiveness** - Mobile-first design

### Color Scheme
- Ocean blue/cyan for primary
- Green for positive/safe
- Red for danger/risk
- Yellow for warnings

## 🌍 Translation

We welcome translations! Currently supporting:
- English (en)
- Bahasa Indonesia (id)

To add a new language:
1. Copy `lib/i18n/translations.ts`
2. Add your language translations
3. Update `lib/i18n/degenSpeak.ts` for degen mode
4. Submit PR with language code (e.g., `es` for Spanish)

## 🔒 Security

Found a security vulnerability?
**DO NOT** open a public issue.

Instead:
1. Email: security@bigfishalert.xyz (when available)
2. Or create a private security advisory on GitHub

## 📋 PR Checklist

Before submitting:

- [ ] Code follows project style
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No warnings in console
- [ ] Tested in Chrome & Firefox
- [ ] Works on mobile
- [ ] Tested with Phantom wallet
- [ ] Added tests (if applicable)

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Eligible for future rewards/airdrops (if project scales)

## 💡 Good First Issues

New to the project? Look for issues tagged:
- `good-first-issue`
- `help-wanted`
- `documentation`

## 🤝 Community

- GitHub Discussions: Ask questions, share ideas
- Discord: (coming soon)
- Twitter: @bigfishalert (coming soon)

## 📜 License

By contributing, you agree that your contributions will be licensed under MIT License.

---

## Quick Links

- [README](./README.md)
- [LICENSE](./LICENSE)
- [Code of Conduct](#code-of-conduct)
- [Issue Tracker](https://github.com/yt2025id-lab/BigFishAlert/issues)

---

**Thank you for contributing to BigFishAlert!** 🐟🌊

Together, we're protecting small fish from big fish!
