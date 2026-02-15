<div align="center">

# 🚀 SmartMarks

### Your Intelligent Web Brain

*Private, fast, and organized bookmark management for the modern web*

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[🌐 Live Demo](https://smart-bookmark-app-psi-lovat.vercel.app/) • [📖 Documentation](#) • [🐛 Report Bug](#) • [✨ Request Feature](#)

</div>

---

## 📖 About The Project

SmartMarks is a modern, full-stack bookmark management application that revolutionizes how you save and organize your favorite web content. Built with cutting-edge technologies, it provides a seamless experience across all your devices with real-time synchronization and enterprise-grade security.

### 🎯 Why SmartMarks?

- **Privacy First**: Your bookmarks are stored securely with row-level security
- **Lightning Fast**: Real-time sync powered by Supabase
- **Always Accessible**: Access your bookmarks from any device, anywhere
- **Smart Organization**: Intelligent categorization keeps everything tidy
- **Zero Setup**: Sign in with Google and start saving immediately

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 **Authentication & Security**
- Google OAuth integration
- Secure session management
- Row-level security (RLS)
- Protected routes
- Automatic token refresh

</td>
<td width="50%">

### ⚡ **Real-time Capabilities**
- Instant sync across devices
- Live bookmark updates
- Optimistic UI updates
- Offline-first architecture
- Fast page loads

</td>
</tr>
<tr>
<td width="50%">

### 🎨 **User Experience**
- Clean, modern interface
- Responsive design
- Intuitive dashboard
- Smart categorization
- Quick bookmark actions

</td>
<td width="50%">

### 🚀 **Performance**
- Server-side rendering
- Edge network deployment
- Optimized database queries
- Lazy loading
- Image optimization

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Hooks

### **Backend & Infrastructure**
- **BaaS**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth)
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage
- **Deployment**: Vercel (Edge Network)

### **Development Tools**
- **Version Control**: Git & GitHub
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint, Prettier
- **Environment**: Node.js 18+

---

## 📁 Project Structure

```
smartmarks/
│
├── app/
│   ├── page.tsx                 # Landing page with hero section
│   ├── dashboard/
│   │   └── page.tsx            # Protected dashboard (main app)
│   ├── layout.tsx              # Root layout with providers
│   └── globals.css             # Global styles & Tailwind
│
├── lib/
│   └── supabase.ts             # Supabase client configuration
│
├── components/                  # Reusable React components
│   ├── BookmarkCard.tsx
│   ├── Header.tsx
│   └── AuthButton.tsx
│
├── public/
│   └── logo.png                # Application logo & assets
│
├── .env.local                  # Environment variables (not in repo)
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Google Cloud Console project (for OAuth)
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/akshayv06/smart-bookmark-app.git
cd smart-bookmark-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase**

Create a `bookmarks` table:

```sql
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  description text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table bookmarks enable row level security;

-- Create policy for users to only see their own bookmarks
create policy "Users can only see their own bookmarks"
  on bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks"
  on bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own bookmarks"
  on bookmarks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on bookmarks for delete
  using (auth.uid() = user_id);
```

5. **Configure Google OAuth in Supabase**
   - Go to Authentication → Providers → Google
   - Enable Google provider
   - Add your Google OAuth credentials
   - Set authorized redirect URIs

6. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

7. **Open [http://localhost:3000](http://localhost:3000)**

---

## 🔧 Configuration

### Supabase Setup

1. **Site URL Configuration**
   - For development: `http://localhost:3000`
   - For production: `https://your-app.vercel.app`
   - ⚠️ **Important**: No trailing slash!

2. **Redirect URLs**
   - Add both localhost and production URLs
   - Format: `http://localhost:3000/**`
   - Format: `https://your-app.vercel.app/**`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Set Environment Variables in Vercel**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Update Supabase Configuration**
   - Update Site URL to your Vercel domain
   - Add Vercel domain to redirect URLs

---

## 🐛 Troubleshooting

### Common Issues & Solutions

<details>
<summary><b> Google Auth works locally but not in production</b></summary>

**Problem**: OAuth redirects to localhost after deployment

**Solution**:
- Update Supabase Site URL to your production domain
- Add production URL to Supabase redirect URLs
- Remove trailing slashes from all URLs
- Redeploy your application

</details>

<details>
<summary><b> Invalid Origin Error</b></summary>

**Problem**: `Invalid Origin: URIs must not contain a path or end with "/"`

**Solution**:
- Remove trailing slash from Site URL
- Use: `https://myapp.vercel.app` ✅
- Not: `https://myapp.vercel.app/` ❌

</details>

<details>
<summary><b>❌ Changes not reflecting after deployment</b></summary>

**Problem**: New code not visible in production

**Solution**:
- Verify latest commit is pushed to GitHub
- Check Vercel is deploying from correct branch
- Trigger manual redeploy in Vercel dashboard
- Clear build cache if necessary

</details>

<details>
<summary><b>❌ OAuth redirect not working</b></summary>

**Problem**: Login redirects to wrong page

**Solution**:
```typescript
// Use dynamic origin handling
redirectTo: `${window.location.origin}/dashboard`
```

</details>

---

## 🎓 What I Learned

Building SmartMarks taught me valuable lessons about modern web development:

### **Technical Skills**
- ✅ Implementing OAuth 2.0 authentication flow
- ✅ Managing authentication state in Next.js App Router
- ✅ Configuring real-time subscriptions with Supabase
- ✅ Implementing row-level security policies
- ✅ Handling environment-specific configurations

### **Production Deployment**
- ✅ Debugging OAuth issues in production vs development
- ✅ Proper configuration of redirect URLs and origins
- ✅ Managing environment variables across platforms
- ✅ Edge network deployment with Vercel

### **Problem Solving**
- ✅ Debugging authentication flows across environments
- ✅ Troubleshooting deployment issues systematically
- ✅ Reading and understanding OAuth error messages
- ✅ Configuring database security policies

---

## 🌟 Roadmap

### Phase 1: Core Features ✅
- [x] Google Authentication
- [x] Basic bookmark CRUD
- [x] Real-time sync
- [x] Responsive UI

### Phase 2: Enhanced Features 🚧
- [ ] Advanced search & filtering
- [ ] Bookmark tagging system
- [ ] Categories & folders
- [ ] Bookmark import/export
- [ ] Browser extension

### Phase 3: Smart Features 🔮
- [ ] AI-powered categorization
- [ ] Smart recommendations
- [ ] Duplicate detection
- [ ] Link preview cards
- [ ] Screenshot capture

### Phase 4: Polish 💎
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Bulk actions
- [ ] Analytics dashboard
- [ ] User preferences

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

**Project Link**: [https://github.com/yourusername/smartmarks](https://github.com/yourusername/smartmarks)

**Live Demo**: [https://smartmarks.vercel.app](https://smartmarks.vercel.app)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ and ☕

[⬆ Back to Top](#-smartmarks)

</div>