"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { MapPin, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from "./page.module.css";
import clsx from "clsx";

const CATEGORIES = [
  { name: "Garments", icon: "👗", color: "bg-pink-100" },
  { name: "Accessories", icon: "🧣", color: "bg-purple-100" },
  { name: "Beauty & Wellness", icon: "🌿", color: "bg-green-100" },
  { name: "Home Linen", icon: "🛏️", color: "bg-blue-100" },
  { name: "Home Décor", icon: "🏺", color: "bg-orange-100" },
  { name: "Art & Craft", icon: "🎨", color: "bg-yellow-100" },
  { name: "Baby Products", icon: "🧸", color: "bg-red-100" },
  { name: "Natural & Ayurvedic", icon: "🍃", color: "bg-emerald-100" },
  { name: "Toys", icon: "🎲", color: "bg-indigo-100" },
  { name: "Study & Books", icon: "📚", color: "bg-teal-100" },
  { name: "Sports", icon: "🏏", color: "bg-cyan-100" },
  { name: "Electronics", icon: "⚡", color: "bg-sky-100" }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          {/* Decorative Blobs */}
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>

        <div className={clsx("container", styles.heroContent)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroTextContent}
          >
            <span className={styles.heroBadge}>🇮🇳 100% Swadeshi Verified</span>
            <h1 className={styles.heroTitle}>
              Shop India. Support India. <br />
              <span className={styles.highlightText}>Build India.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Discover authentic treasures from every corner of India. <br />
              Directly from the makers, transparently to you.
            </p>

            <div className={styles.heroButtons}>
              <Link href="/bhoovan-map">
                <Button variant="primary" size="lg" className={styles.primaryBtn}>
                  Find Sellers by State <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className={styles.secondaryBtn}>
                  Explore Categories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className={styles.trustBar}>
        <div className={clsx("container", styles.trustGrid)}>
          <TrustItem icon={<CheckCircle size={24} />} title="GST Verified Sellers" desc="100% Legitimate Businesses" />
          <TrustItem icon={<MapPin size={24} />} title="Origin Traceability" desc="Know Where It Comes From" />
          <TrustItem icon={<ShoppingBag size={24} />} title="Authentic Products" desc="No Cheap Knockoffs" />
        </div>
      </div>

      {/* Categories Grid */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.sectionHeader}
          >
            <h2 className={styles.sectionTitle}>Explore Authentic Categories</h2>
            <p className={styles.sectionSubtitle}>Handpicked collections for your daily needs</p>
          </motion.div>

          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat, index) => (
              <motion.div
                key={cat.name}
                className={styles.categoryCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.categoryIconWrapper}>
                  <span className={styles.categoryEmoji}>{cat.icon}</span>
                </div>
                <h3 className={styles.categoryName}>{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      className={styles.trustItem}
      whileHover={{ scale: 1.05 }}
    >
      <div className={styles.trustIcon}>{icon}</div>
      <div className={styles.trustText}>
        <h4 className={styles.trustTitle}>{title}</h4>
        <p className={styles.trustDesc}>{desc}</p>
      </div>
    </motion.div>
  )
}
