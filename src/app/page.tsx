import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";
import { MapPin, ShoppingBag, Truck, CheckCircle } from 'lucide-react';

const CATEGORIES = [
  "Garments", "Accessories", "Beauty & Wellness", "Home Linen",
  "Home Décor", "Art & Craft", "Baby Products", "Natural & Ayurvedic",
  "Toys", "Study & Books", "Sports", "Electronics"
];

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Shop India. Support India. <span style={{ color: 'var(--color-saffron-copper)' }}>Build India.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A Swadeshi-first marketplace connecting you to verified Indian makers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/bhoovan-map">
              <Button variant="primary" size="lg">
                Choose Your State
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg">
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar (Simple) */}
      <div style={{ background: 'white', padding: '1.5rem 0', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          <TrustItem icon={<CheckCircle size={20} />} text="GST Verified Sellers" />
          <TrustItem icon={<MapPin size={20} />} text="Origin Traceability" />
          <TrustItem icon={<ShoppingBag size={20} />} text="Authentic Products" />
        </div>
      </div>

      {/* Categories Grid */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Explore Authentic Categories</h2>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <div key={cat} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  {/* Placeholder Icon Logic could go here */}
                  <ShoppingBag size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-charcoal-black)' }}>{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-heritage-green)', fontWeight: 600 }}>
      {icon}
      <span>{text}</span>
    </div>
  )
}
