#  Inquira Frontend  AI Video RAG Workspace

**Inquira Frontend** is a modern, responsive, and visually stunning web interface built for the Inquira Video RAG Engine. It allows users to paste YouTube links, index video content in real time, and engage in interactive, timestamp-verified AI chats.

---

##  Key Features

- **UI/UX:** Built with a curated deep forest green palette (`#021f18`), glowing emerald accents (`#22c55e`),  and dynamic background geometric shapes.
- **Real-Time RAG Step Animation:** Visualizes the AI's internal thought process during chat queries (Query Processing ➔ Hybrid Retrieval ➔ Reranking ➔ Fact Verification ➔ Answer Generation).
- **Voice Synthesis & Copy:** Integrated text-to-speech (`speechSynthesis`) to read AI responses aloud, along with one-click clipboard copying.
- **Fully Responsive Workspace:** Features an adaptive sliding drawer sidebar on mobile devices and a fixed control panel on desktop screens.
- **Seamless Authentication Flow:** Complete Login, Registration, and Password Recovery pages with automated JWT token attachment and silent token refreshing via Axios interceptors.
- **Cloud & Offline History Sync:** Automatically syncs chat session history with MongoDB Atlas while maintaining a user-scoped local storage backup for offline resilience.

---

##  Technology Stack

- **Core Framework:** React 19, Vite
- **Styling:** Tailwind CSS, Vanilla CSS (Custom Scrollbars & Animations)
- **HTTP Client:** Axios (with request/response interceptors for JWT auth)
- **Icons & Graphics:** Lucide React Icons, Custom SVG Branding
- **Routing:** React Router DOM

---

##  Prerequisites & Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/z23txr/inquira-frontend.git
   cd inquira-frontend
   ```

2. **Install Node Dependencies:**
   ```bash
   npm install
   ```

---

##  Environment Configuration (`.env`)

Create a `.env` file in the root directory to configure the backend API endpoint:

```env
# Backend FastAPI Server URL
VITE_API_URL="http://localhost:8000"
```

---

##  Running Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be accessible at:
 **http://localhost:5173**

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

##  Project Structure

```text
src/
 ┣ assets/          # Static assets and logos
 ┣ components/      # Reusable UI components
 ┃ ┣ ChatMessage.jsx        # Chat bubbles, RAG animation & TTS
 ┃ ┣ LandingCards.jsx       # Feature cards & badges for landing page
 ┃ ┣ MainContent.jsx        # Chat workspace & input area
 ┃ ┣ Navbar.jsx             # Top navigation bar
 ┃ ┣ Sidebar.jsx            # Video indexer & history drawer
 ┃ ┣ SolidBackgroundShapes  # Geometric background decoration
 ┃ ┗ footer.jsx             # Comprehensive landing footer
 ┣ context/         # Global React Contexts
 ┃ ┗ AuthContext.jsx        # Global authentication & JWT session state
 ┣ pages/           # Application route pages
 ┃ ┣ Auth.jsx               # Login, Register & Forgot Password views
 ┃ ┣ Home.jsx               # Main RAG workspace page
 ┃ ┗ LandingPage.jsx        # Hero landing & marketing page
 ┣ index.css        # Tailwind directives & global styling rules
 ┗ main.jsx         # React application entry point
```

---

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/z23txr/inquira-frontend/issues).
