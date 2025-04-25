import { getWebsite } from "@/actions/websites"
import { getPages } from "@/actions/pages"
import { notFound } from "next/navigation"

export default async function PreviewPage({
  params,
}: {
  params: { siteId: string; slug: string }
}) {
  const website = await getWebsite(params.siteId)

  if (!website) {
    notFound()
  }

  const pages = await getPages(params.siteId)
  const page = pages.find((p) => p.slug === params.slug) || pages.find((p) => p.isHome)

  if (!page) {
    notFound()
  }

  // Parse the content
  const content = page.content
    ? typeof page.content === "string"
      ? JSON.parse(page.content)
      : page.content
    : { sections: [] }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="font-bold text-xl">{website.name}</div>
          <nav className="hidden md:flex gap-6">
            {pages.slice(0, 5).map((p) => (
              <a
                key={p.id}
                href={`/preview/${params.siteId}/${p.slug}`}
                className={`hover:text-primary ${p.id === page.id ? "text-primary font-medium" : ""}`}
              >
                {p.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main>
        {content.sections?.map((section: any, index: number) => {
          switch (section.type) {
            case "hero":
              return (
                <section key={index} className="py-16 px-4 text-center bg-muted/30">
                  <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl font-bold mb-4">{section.title}</h1>
                    <p className="text-xl text-muted-foreground mb-8">{section.description}</p>
                    {section.cta && (
                      <a
                        href={section.ctaLink || "#"}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        {section.cta}
                      </a>
                    )}
                  </div>
                </section>
              )
            case "content":
              return (
                <section key={index} className="py-12 px-4">
                  <div className="container mx-auto max-w-4xl">
                    {section.title && <h2 className="text-3xl font-bold mb-6">{section.title}</h2>}
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </div>
                </section>
              )
            case "contact":
              return (
                <section key={index} className="py-12 px-4 bg-muted/30">
                  <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-2 text-center">{section.title}</h2>
                    <p className="text-center text-muted-foreground mb-8">{section.description}</p>
                    <div className="max-w-md mx-auto bg-background p-6 rounded-lg border">
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Message</label>
                          <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your message"
                            rows={4}
                          />
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        >
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              )
            default:
              return null
          }
        })}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold">{website.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                © {new Date().getFullYear()} All rights reserved.
              </div>
            </div>
            <div className="flex gap-4">
              {pages.slice(0, 4).map((p) => (
                <a
                  key={p.id}
                  href={`/preview/${params.siteId}/${p.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {p.title}
                </a>
              ))}
            </div>
          </div>
          <div className="text-xs text-center mt-8 text-muted-foreground">
            Powered by <span className="font-medium">ModernCMS</span>
          </div>
        </div>
      </footer>

      {/* Preview Banner */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50">
        <span>Preview Mode</span>
        <a
          href={`/dashboard/sites/${params.siteId}/editor?page=${page.id}`}
          className="bg-background text-foreground px-3 py-1 rounded-full text-sm hover:bg-muted"
        >
          Edit Page
        </a>
      </div>
    </div>
  )
}
