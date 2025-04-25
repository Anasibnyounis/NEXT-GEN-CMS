import { ScrollArea } from "@/components/ui/scroll-area"

interface PageBuilderProps {
  view: "desktop" | "tablet" | "mobile"
}

export function PageBuilder({ view }: PageBuilderProps) {
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
        {/* Header Section */}
        <div className="border-2 border-dashed border-gray-200 p-4 m-2 relative">
          <div className="absolute top-0 left-0 bg-gray-100 text-xs px-2 py-1 rounded-br">Header</div>
          <div className="flex justify-between items-center">
            <div className="font-bold">Logo</div>
            <div className="flex gap-4">
              <div>Home</div>
              <div>About</div>
              <div>Services</div>
              <div>Contact</div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="border-2 border-dashed border-gray-200 p-8 m-2 relative">
          <div className="absolute top-0 left-0 bg-gray-100 text-xs px-2 py-1 rounded-br">Hero</div>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
            <p className="text-gray-500">This is a sample hero section created with ModernCMS</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Get Started</button>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-2 border-dashed border-gray-200 p-8 m-2 relative">
          <div className="absolute top-0 left-0 bg-gray-100 text-xs px-2 py-1 rounded-br">Features</div>
          <h2 className="text-2xl font-bold text-center mb-6">Our Features</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border p-4 rounded text-center">
              <div className="h-10 w-10 bg-blue-100 rounded-full mx-auto mb-2"></div>
              <h3 className="font-medium">Feature 1</h3>
              <p className="text-sm text-gray-500">Description goes here</p>
            </div>
            <div className="border p-4 rounded text-center">
              <div className="h-10 w-10 bg-green-100 rounded-full mx-auto mb-2"></div>
              <h3 className="font-medium">Feature 2</h3>
              <p className="text-sm text-gray-500">Description goes here</p>
            </div>
            <div className="border p-4 rounded text-center">
              <div className="h-10 w-10 bg-purple-100 rounded-full mx-auto mb-2"></div>
              <h3 className="font-medium">Feature 3</h3>
              <p className="text-sm text-gray-500">Description goes here</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="border-2 border-dashed border-gray-200 p-8 m-2 relative">
          <div className="absolute top-0 left-0 bg-gray-100 text-xs px-2 py-1 rounded-br">Testimonials</div>
          <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <p className="italic text-gray-600">
                "This is an amazing product that has helped our business tremendously."
              </p>
              <div className="mt-2 flex items-center">
                <div className="h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-gray-500">CEO, Company Inc</div>
                </div>
              </div>
            </div>
            <div className="border p-4 rounded">
              <p className="italic text-gray-600">"I can't imagine running my business without this tool anymore."</p>
              <div className="mt-2 flex items-center">
                <div className="h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-xs text-gray-500">Founder, Startup LLC</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-2 border-dashed border-gray-200 p-4 m-2 relative">
          <div className="absolute top-0 left-0 bg-gray-100 text-xs px-2 py-1 rounded-br">Footer</div>
          <div className="flex justify-between items-center">
            <div className="font-bold">Logo</div>
            <div className="text-sm text-gray-500">© 2023 Company. All rights reserved.</div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
