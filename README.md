# 🍽️ JNTU K Student Canteen Management System

A modern, dynamic web application for managing the JNTU K student canteen with real-time menu updates and admin panel.

## ✨ Features

### 🏠 **Student Homepage**
- **Real-time Menu Display**: Live updates of available food items
- **Category-wise Organization**: Items grouped by Main Course, Breakfast, Snacks, Beverages, etc.
- **Fresh Timestamps**: Shows when items were last updated
- **Responsive Design**: Works perfectly on mobile and desktop
- **Contact Information**: Easy access to canteen contact details

### 🔐 **Admin Panel**
- **Secure Authentication**: Login system for authorized personnel
- **Push-Tap Selection**: Interactive green highlighting for available items
- **Real-time Updates**: Changes reflect instantly on homepage
- **Add New Items**: External item addition with image upload
- **Dashboard Statistics**: Live counts of total, available, and unavailable items
- **Multi-admin Support**: Multiple admin accounts with different roles

### 🚀 **Dynamic Features**
- **Database Backend**: PostgreSQL with Supabase for data persistence
- **Real-time Sync**: WebSocket connections for instant updates
- **Cross-device Compatibility**: Changes sync across all devices
- **Production Ready**: Scalable architecture for real-world deployment

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🎯 Our Motto

**"Fresh Meals • Real-time Updates • Student-Friendly Service"**

Providing JNTU K students with:
- 🍽️ Fresh, quality meals
- ⚡ Instant menu updates
- 📱 Easy-to-use interface
- 🔄 Real-time availability status

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jntu-k-canteen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Click "Connect to Supabase" in the application
   - Or manually create a Supabase project and update `.env`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Homepage: `http://localhost:5173`
   - Admin Login: Click "Admin Login" in header

## 🔑 Demo Credentials

- **Admin**: `admin` / `admin123`
- **Manager**: `manager` / `manager123`

## 📱 Usage Guide

### For Students:
1. Visit the homepage to see available menu items
2. Items are organized by category with real-time availability
3. Check contact information in header and footer
4. Menu updates automatically when admin makes changes

### For Admins:
1. Click "Admin Login" in the header
2. Use demo credentials to log in
3. **Push-Tap Selection**: Click items to toggle availability (green = available)
4. **Add New Items**: Use "Add Item" button to include new menu items
5. **Real-time Dashboard**: Monitor statistics and manage inventory
6. Changes appear instantly on student homepage

## 🏗️ Database Schema

### Tables:
- **`menu_items`**: Food items with pricing, images, and availability
- **`admins`**: Admin user accounts with authentication
- **`canteen_info`**: Canteen details (name, proprietor, contact)

### Security:
- Row Level Security (RLS) enabled
- Public read access for menu items
- Authenticated access for admin operations

## 🌐 Deployment

The application is production-ready and can be deployed to:
- **Netlify** (recommended)
- **Vercel**
- **Railway**
- Any static hosting service

### Environment Variables:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎨 Design Philosophy

- **Student-Centric**: Designed with student needs in mind
- **Mobile-First**: Optimized for smartphone usage
- **Real-time**: Instant updates for better user experience
- **Professional**: Clean, modern interface suitable for institutional use
- **Accessible**: Easy navigation and clear visual hierarchy

## 🔧 Development

### Available Scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure:
```
src/
├── components/          # Reusable UI components
│   ├── Admin/          # Admin panel components
│   ├── Auth/           # Authentication components
│   ├── HomePage/       # Homepage components
│   └── Layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── context/            # React context providers
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **JNTU K** for the opportunity to serve students
- **Supabase** for the excellent backend-as-a-service
- **Pexels** for high-quality food images
- **Lucide** for beautiful icons

---

**Built with ❤️ for JNTU K Students**

*Empowering student dining experience through technology*