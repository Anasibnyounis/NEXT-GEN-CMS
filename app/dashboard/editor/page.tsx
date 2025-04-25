"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageBuilder } from "@/components/editor/page-builder"
import { ComponentLibrary } from "@/components/editor/component-library"
import { EditorHeader } from "@/components/editor/editor-header"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { PagePreview } from "@/components/editor/page-preview"

export default function EditorPage() {
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader
        activeView={activeView}
        setActiveView={setActiveView}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <EditorSidebar />}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="builder" className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="builder" className="flex-1 flex overflow-hidden p-0 m-0">
              <div className="flex-1 overflow-auto">
                <PageBuilder view={activeView} />
              </div>
              <ComponentLibrary />
            </TabsContent>

            <TabsContent value="preview" className="flex-1 p-0 m-0">
              <PagePreview view={activeView} />
            </TabsContent>

            <TabsContent value="code" className="flex-1 p-4 m-0 bg-muted overflow-auto">
              <pre className="text-sm">
                {`// Generated code for the current page
import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero 
          title="Welcome to Our Website" 
          description="This is a sample hero section created with ModernCMS"
          ctaText="Get Started"
          ctaLink="/contact"
        />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}`}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
