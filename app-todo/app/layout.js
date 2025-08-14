import './globals.css';

export const metadata = {
  title: 'Next.js Todo App',
  description: 'A full-stack todo application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove extension-added attributes before hydration
              (function() {
                try {
                  if (document.body.hasAttribute('cz-shortcut-listen')) {
                    document.body.removeAttribute('cz-shortcut-listen');
                  }
                  
                  // Initialize dark mode from localStorage or system preference
                  var savedMode = localStorage.getItem('darkMode');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = savedMode !== null ? savedMode === 'true' : systemDark;
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {
                  console.error('Initialization error:', e);
                }
              })();
            `,
          }}
          key="pre-render-cleanup"
        />
      </head>
      <body className="min-h-screen bg-gray-900 text-purple-500">
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('mousedown', () => 
                document.body.classList.remove('using-keyboard'));
              document.addEventListener('keydown', () => 
                document.body.classList.add('using-keyboard'));
            `,
          }}
          key="keyboard-nav"
        />
        
        {/* NoScript fallback */}
        <noscript>
          <style>{`
            body {
              display: block !important;
              background-color: #111827 !important;
              color: #a855f7 !important;
            }
          `}</style>
        </noscript>
        
        <header className="bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-white">Next.js Todo App</h1>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="bg-gray-800 border-t border-gray-700 mt-8">
          <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Next.js Todo App
          </div>
        </footer>
      </body>
    </html>
  );
}