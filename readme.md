# 🎨 SmartWall

A modern web application that helps you **visualize paint colors on your room walls** before making a purchase decision. Upload a room photo, select walls using an interactive canvas editor, apply colors, and see how different paint shades look in your actual space.

**[Live Demo →](https://smartwall.vercel.app)**

---

## ✨ What It Does

- � **Upload Room Photos** - Start with any photo of your room
- ✏️ **Draw Wall Selections** - Use polygon drawing tool to precisely outline walls
- 🎨 **Apply Paint Colors** - Choose from RGB/HEX colors and see instant preview
- 💾 **Save Projects** - Keep all your color experiments organized
- 🔐 **Guest or Login** - Try it without account or sign in with Google
- 📱 **Works Everywhere** - Fully responsive on mobile, tablet, and desktop
- 🌈 **Browse Color Palettes** - Explore curated color collections
- 📤 **Export Results** - Download your painted room images

---

## �️ How It Works

1. **Upload** - Select a room photo from your device
2. **Select Walls** - Use the polygon drawing tool to outline wall areas
3. **Pick Colors** - Choose paint colors using the color picker
4. **Preview** - See colors applied to your selected walls in real-time
5. **Adjust** - Try different colors, adjust opacity, zoom in/out
6. **Save** - Create an account to save your projects (or continue as guest)
7. **Export** - Download the final painted image

---

## 🛠️ Built With

### Frontend
- **React 19** - Modern React library with latest features
- **Vite 8** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router v7** - Client-side routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js + Express** - Server and REST API
- **MongoDB** - Database for users and projects
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **Multer** - File upload middleware
- **Cloudinary** - Image storage and hosting
- **Bcrypt** - Password hashing
- **Google OAuth** - Social authentication
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
smartwall/
│
├── client/                         # Frontend React Application
│   ├── src/
│   │   ├── api/                   # API calls (axios setup)
│   │   ├── assets/                # Images, icons, videos
│   │   ├── components/            # Reusable components
│   │   │   ├── common/           # Buttons, loaders, error states
│   │   │   └── layout/           # Navbar, footer
│   │   ├── context/               # React Context (Auth)
│   │   ├── features/              # Main features
│   │   │   ├── auth/             # Login & registration
│   │   │   ├── home/             # Landing page & color browser
│   │   │   ├── dashboard/        # User dashboard
│   │   │   │   ├── components/   # Dashboard components
│   │   │   │   └── sections/
│   │   │   │       ├── editor/         # Paint editor (main feature)
│   │   │   │       ├── projects/       # Project list & management
│   │   │   │       ├── colorDashboard/ # Color palette browser
│   │   │   │       └── settings/       # User settings & profile
│   │   │   └── upload/           # Image upload flow
│   │   ├── routes/                # Route definitions
│   │   └── styles/                # Global CSS
│   └── package.json
│
├── server/                         # Backend Node.js API
│   ├── config/                    # Database connection
│   ├── controllers/               # Business logic
│   │   ├── user.controller.js    # User operations
│   │   └── project.controller.js # Project operations
│   ├── middlewares/               # Auth & file upload
│   ├── model/                     # Database schemas
│   │   ├── user.model.js
│   │   └── project.model.js
│   ├── routes/                    # API endpoints
│   ├── app.js                     # Express config
│   └── server.js                  # Server entry
│
├── PRODUCT.md                      # Product vision & design principles
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (free tier works)
- **Google OAuth Credentials** (optional, for Google login)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/smartwall.git
cd smartwall
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5002
MONGODB_URI=mongodb://localhost:27017/smartwall
JWT_SECRET=your_secure_secret_key_here
CLIENT_URL=http://localhost:5173

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id

# Cloudinary (required for image upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:
```bash
npm run dev
```
✅ Backend runs at `http://localhost:5002`

**3. Setup Frontend**
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5002/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the app:
```bash
npm run dev
```
✅ Frontend runs at `http://localhost:5173`

---

## 🎯 Key Features

### 🖌️ Interactive Paint Editor
The core feature where magic happens:
- **Canvas Drawing Tool** - Draw polygons to select wall areas
- **Color Picker** - RGB and HEX color input with live preview
- **Opacity Slider** - Adjust paint transparency (0-100%)
- **Undo/Redo** - Full history tracking for all actions
- **Zoom & Pan** - Navigate large images easily
- **Multiple Walls** - Select and color multiple walls independently
- **Real-time Preview** - See changes instantly as you paint

### 🔐 Authentication System
- **Email/Password Registration** - Traditional signup with validation
- **Email/Password Login** - Secure authentication with JWT
- **Google OAuth** - One-click social login
- **Guest Mode** - Try the editor without creating an account
- **Protected Routes** - Dashboard and settings require authentication
- **Profile Management** - Update name, email, bio, and profile picture

### 💾 Project Management
- **Create Projects** - Upload images and start new color experiments
- **Save Automatically** - Editor state saved to database
- **View All Projects** - Dashboard shows all your saved projects
- **Edit Existing** - Continue where you left off
- **Delete Projects** - Remove unwanted projects
- **Export Images** - Download final painted room photos

### 🎨 Color Browser
- Browse curated color palettes
- View color collections by category
- Get color inspiration before painting

---

## 🌐 API Endpoints

### User Routes (`/api/user`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new account | No |
| POST | `/login` | Email/password login | No |
| POST | `/google` | Google OAuth login | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/update-profile` | Update profile details | Yes |

### Project Routes (`/api/project`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Upload image & create project | Optional* |
| GET | `/` | Get all user projects | Yes |
| GET | `/:id` | Get single project | No |
| PUT | `/:id` | Update project details | Yes |
| DELETE | `/:id` | Delete project | Yes |
| PATCH | `/:id/edited-image` | Save painted image | Optional* |
| GET | `/:id/export` | Export project image | No |

*Optional: Works for both authenticated users and guests

---

## 🗃️ Database Models

### User Schema
```javascript
{
  fullName: String (required, 3-50 chars),
  email: String (required, unique, lowercase),
  password: String (hashed with bcrypt, min 8 chars),
  provider: 'local' | 'google' (default: 'local'),
  profileImage: String (URL),
  bio: String (max 200 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Schema
```javascript
{
  user: ObjectId (reference to User, nullable for guests),
  name: String (required),
  originalImage: {
    publicId: String (Cloudinary ID),
    url: String (image URL)
  },
  editedImage: {
    publicId: String,
    url: String
  },
  status: 'draft' | 'processing' | 'completed',
  editorState: {
    walls: Array (polygon coordinates & colors),
    zoom: Number (zoom level),
    mode: String (editor mode)
  },
  thumbnail: String (preview image URL),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Deploy from `client` directory
5. Build command: `npm run build`
6. Output directory: `dist`

### Backend (Render / Railway / Heroku)
1. Push code to GitHub
2. Create new web service
3. Set environment variables (all from `.env`)
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy from `server` directory

### Important: Update CORS
After deployment, update `server/app.js` with your frontend URL in CORS origins.

---

## 📝 Environment Variables Reference

### Backend (`server/.env`)
```env
# Server
PORT=5002                              # Server port

# Database
MONGODB_URI=mongodb://...              # MongoDB connection string

# Authentication
JWT_SECRET=your_secret_key             # JWT token signing key
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com  # Google OAuth

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173       # Your frontend URL

# Image Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc123xyz
```

### Frontend (`client/.env`)
```env
# Backend API
VITE_API_URL=http://localhost:5002/api # Backend base URL

# Google OAuth
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
```

---

## 🎨 Design & UX

- **Clean Interface** - Modern, uncluttered design focused on the editor
- **Mobile Responsive** - Works seamlessly on all screen sizes
- **Smooth Animations** - Framer Motion for polished interactions
- **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation
- **Touch Optimized** - Large touch targets for mobile users
- **Fast Performance** - Optimized images and code splitting

---

## 📚 Learn More

- [Product Vision](./PRODUCT.md) - Product strategy and design principles
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

---

## 👤 Author

**Mohit**
- GitHub: [@yourusername](https://github.com/yourusername)
- Project: [SmartWall](https://smartwall.vercel.app)

---

## 🙏 Acknowledgments

- [Cloudinary](https://cloudinary.com) - Image hosting and processing
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Vercel](https://vercel.com) - Frontend hosting
- [Render](https://render.com) - Backend hosting
- [Google](https://developers.google.com) - OAuth services
- [Lucide](https://lucide.dev) - Beautiful icon library

---

**Made with ❤️ for homeowners who want to visualize paint colors before buying**
