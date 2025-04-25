import { ScrollArea } from "@/components/ui/scroll-area"

interface PagePreviewProps {
  view: "desktop" | "tablet" | "mobile"
}

export function PagePreview({ view }: PagePreviewProps) {
  const getViewClass = () => {
    switch (view) {
      case "mobile":
        return "max-w-[375px]"
      case "tablet":
        return "max-w-[768px]"
      default:
        return "max-w-full"
    }
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className={`mx-auto ${getViewClass()} transition-all duration-300 min-h-[150vh] bg-white`}>
        {/* Header */}
        <header className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Company Name</div>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="hover:text-blue-500">
                Home
              </a>
              <a href="#" className="hover:text-blue-500">
                About
              </a>
              <a href="#" className="hover:text-blue-500">
                Services
              </a>
              <a href="#" className="hover:text-blue-500">
                Contact
              </a>
            </nav>
            <button className="md:hidden">Menu</button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            This is a sample hero section created with ModernCMS. You can easily edit this text and customize it to your
            needs.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Our platform is optimized for speed and performance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-600">Security is our top priority with enterprise-grade protection.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible</h3>
              <p className="text-gray-600">Customize everything to fit your specific needs.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="italic text-gray-600 mb-4">
                "This is an amazing product that has helped our business tremendously. The ease of use and flexibility
                are unmatched."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-gray-500">CEO, Company Inc</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="italic text-gray-600 mb-4">
                "I can't imagine running my business without this tool anymore. It has streamlined our workflow and
                increased productivity."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-gray-500">Founder, Startup LLC</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">Company Name</div>
              <p className="text-gray-400">Creating amazing websites and applications since 2023.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    E-commerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    SEO
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Street Name, City</li>
                <li>info@example.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            © 2023 Company Name. All rights reserved.
          </div>
        </footer>
      </div>
    </ScrollArea>
  )
}
