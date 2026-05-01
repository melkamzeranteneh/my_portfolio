import { BlogSection } from "./sections/blog/BlogSection";
import { CertificatesSection } from "./sections/certificates/CertificatesSection";
import { ContactSection } from "./sections/contact/ContactSection";
import { HeroSection } from "./sections/hero/HeroSection";
import { ProjectsSection } from "./sections/projects/ProjectsSection";
import { TestimonialsSection } from "./sections/testimonials/TestimonialsSection";

export default function Home() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <HeroSection />
      <ProjectsSection />
      <CertificatesSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
