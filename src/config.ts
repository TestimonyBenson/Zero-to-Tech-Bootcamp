// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Zero to Tech Bootcamp",
  description: "A 3-week beginner-friendly tech program. Go from confused to confident. No degree needed. No jargon. Just build.",
  language: "en",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "ZERO TO TECH",
  items: [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Join", href: "#join" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
}

export const heroConfig: HeroConfig = {
  title: "ZERO TO TECH",
  subtitle: "BOOTCAMP",
  backgroundImage: "/hero-image.png",
  servicesLabel: "ONLINE • 3 WEEKS • BEGINNER FRIENDLY",
  copyright: "NEXT COHORT: EARLY BIRD OPEN",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "You'll go from confused to confident.",
  titleLine2: "",
  description: "Tech isn't magic. It's a skill you can learn in weeks—if someone shows you the map. We strip away the jargon and teach you how websites actually work, how to build your first page, and how to keep growing after the course ends.",
  image1: "/promise-workspace.jpg",
  image1Alt: "Modern workspace with laptop",
  image2: "",
  image2Alt: "",
  authorImage: "",
  authorName: "",
  authorBio: "",
};

// ============================================================================
// Works Section Configuration
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "3 WEEKS",
  subtitle: "FROM ZERO TO BUILDING",
  projects: [],
};

// ============================================================================
// Services Section Configuration
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "PROJECTS",
  subtitle: "Build a personal site—live on the internet.",
  services: [
    {
      id: "01",
      title: "HTML Structure",
      description: "Learn the building blocks of every website",
      image: "/build-project.jpg",
    },
    {
      id: "02",
      title: "CSS Styling",
      description: "Make your site look professional and polished",
      image: "/build-project.jpg",
    },
    {
      id: "03",
      title: "Deploy & Share",
      description: "Host your site for free and share it with the world",
      image: "/build-project.jpg",
    },
  ],
};

// ============================================================================
// Testimonials Section Configuration
// ============================================================================

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "YOUR INSTRUCTOR",
  testimonials: [
    {
      id: 1,
      name: "TESTIMONY D. BENSON",
      title: "Past Data Analysis Intern • Current Software Engineering Student • Teaching What Actually Works",
      quote: "I'm not 15 years in tech. I'm showing you how to start right now.",
      image: "/instructor-image.png",
    },
  ],
};

// ============================================================================
// Pricing Section Configuration
// ============================================================================

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  featured: boolean;
  features: string[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  title: "Invest in your start.",
  subtitle: "One payment. Full access. No hidden fees.",
  ctaButtonText: "Reserve My Spot",
  plans: [
    {
      id: 1,
      name: "Early Bird",
      price: 15000,
      unit: "one-time",
      featured: true,
      features: [
        "Save ₦5,000",
        "Limited spots available",
        "Full 3-week program access",
        "Live sessions + recordings",
        "WhatsApp community",
        "Portfolio project feedback",
      ],
    },
    {
      id: 2,
      name: "Regular",
      price: 20000,
      unit: "one-time",
      featured: false,
      features: [
        "Full price after early bird closes",
        "Full 3-week program access",
        "Live sessions + recordings",
        "WhatsApp community",
        "Portfolio project feedback",
      ],
    },
  ],
};

// ============================================================================
// FAQ Section Configuration
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "Questions?",
  faqs: [
    {
      question: "Do I need a laptop?",
      answer: "Yes. Any working laptop is fine (Windows/Mac/Chromebook). You'll need it to follow along with the coding exercises and build your projects.",
    },
    {
      question: "Do I need prior coding knowledge?",
      answer: "No. We start from the absolute basics. If you can use a computer, you can learn to code. We strip away all the jargon and explain everything in plain English.",
    },
    {
      question: "What if I miss a live session?",
      answer: "Recordings are available within 24 hours. You can watch at your own pace and still get all the value from the program.",
    },
    {
      question: "Is this only for students?",
      answer: "No. Career switchers and curious learners are welcome. Whether you're in school, working, or between jobs, this bootcamp is designed for anyone who wants to enter tech.",
    },
    {
      question: "How do I pay?",
      answer: "Pay via bank transfer or card. Details are sent after registration. We keep it simple and straightforward.",
    },
  ],
};

// ============================================================================
// Blog Section Configuration
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  title: "",
  subtitle: "",
  allPostsLabel: "",
  readMoreLabel: "",
  readTimePrefix: "",
  posts: [],
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: ContactFormOption[];
  messageLabel: string;
  submitButtonText: string;
  image: string;
}

export const contactConfig: ContactConfig = {
  title: "READY TO START?",
  subtitle: "JOIN THE BOOTCAMP.",
  nameLabel: "Name *",
  emailLabel: "Email *",
  projectTypeLabel: "Experience Level",
  projectTypePlaceholder: "Select...",
  projectTypeOptions: [
    { value: "complete-beginner", label: "Complete Beginner" },
    { value: "some-experience", label: "Some Experience" },
    { value: "career-switcher", label: "Career Switcher" },
  ],
  messageLabel: "Message",
  submitButtonText: "Reserve My Spot",
  image: "/footer-image.png",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  marqueeHighlightChars: string[];
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  ctaText: string;
  ctaHref: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "ZERO TO TECH IN 21 DAYS",
  marqueeHighlightChars: ["Z", "T"],
  navLinks1: [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  navLinks2: [
    { label: "Instagram", href: "#", icon: "Instagram" },
  ],
  ctaText: "Join Now",
  ctaHref: "#join",
  copyright: "© 2026 Zero to Tech. All rights reserved.",
  tagline: "Teaching what actually works",
};
