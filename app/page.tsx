import { BlogSection } from "./sections/blog/BlogSection";
import { CertificatesSection } from "./sections/certificates/CertificatesSection";
import { ContactSection } from "./sections/contact/ContactSection";
import { HeroSection } from "./sections/hero/HeroSection";
import { ProjectsSection } from "./sections/projects/ProjectsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <HeroSection />
      <ProjectsSection />
      <CertificatesSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
