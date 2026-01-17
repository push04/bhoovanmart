"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { MapPin, Star, ArrowLeft, ShieldCheck, ShoppingBag, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { useParams } from 'next/navigation';

// Mock Data for States (Expanded)
const STATE_DATA: Record<string, { name: string; description: string; colorTheme: string }> = {
    'maharashtra': {
        name: "Maharashtra",
        description: "A powerhouse of culture and commerce, Maharashtra offers exquisite Paithani sarees, Warli art paintings, and world-famous Kolhapuri leather crafts.",
        colorTheme: "linear-gradient(135deg, #FF9933 0%, #B91C1C 100%)"
    },
    'rajasthan': {
        name: "Rajasthan",
        description: "The Land of Kings is a treasure trove of heritage, featuring vibrant Block Prints, Blue Pottery, and intricate jewelry that tells tales of valor and beauty.",
        colorTheme: "linear-gradient(135deg, #E04141 0%, #991B1B 100%)"
    },
    'kerala': {
        name: "Kerala",
        description: "From God's Own Country comes a pure collection of aromatic spices, coir handicrafts, and the elegant Kasavu sarees woven with tradition.",
        colorTheme: "linear-gradient(135deg, #059669 0%, #064E3B 100%)"
    },
    'uttar-pradesh': {
        name: "Uttar Pradesh",
        description: "The heartland of India brings you the finest Banarasi silks, Chikankari embroidery, and brassware from Moradabad.",
        colorTheme: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)"
    },
    'default': {
        name: "State Store",
        description: "Discover verified authentic products from this region. Each item tells a story of local craftsmanship and Indian heritage.",
        colorTheme: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)"
    }
};

export default function StatePage() {
    const params = useParams();
    const stateId = Array.isArray(params?.stateId) ? params.stateId[0] : params?.stateId || "default";

    // Normalize ID for lookup
    const normalizedId = stateId.toLowerCase();
    const data = STATE_DATA[normalizedId] || {
        ...STATE_DATA['default'],
        name: stateId.charAt(0).toUpperCase() + stateId.slice(1).replace(/-/g, ' ')
    };

    return (
        <main className={styles.main}>
            <Header />

            {/* Hero Section */}
            <motion.section
                className={styles.hero}
                style={{ background: data.colorTheme }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.heroBackground}></div>

                <Link href="/bhoovan-map" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Map
                </Link>

                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.stateTitle}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {data.name}
                    </motion.h1>
                    <motion.p
                        className={styles.stateDescription}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {data.description}
                    </motion.p>

                    <motion.div
                        className={styles.heroStats}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>100%</span>
                            <span className={styles.statLabel}>Verified</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>500+</span>
                            <span className={styles.statLabel}>Artisans</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>4.8</span>
                            <span className={styles.statLabel}>Avg Rating</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Main Content */}
            <section className="container">
                <div className={styles.contentSection}>
                    <div className={styles.glassContainer}>

                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <Store size={28} /> Top Sellers
                            </h2>
                            <div className={styles.filterTabs}>
                                <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
                                <button className={styles.filterBtn}>Clothing</button>
                                <button className={styles.filterBtn}>Handicrafts</button>
                                <button className={styles.filterBtn}>Food</button>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            {/* Mock Sellers */}
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <SellerCard key={i} stateName={data.name} index={i} />
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

function SellerCard({ stateName, index }: { stateName: string; index: number }) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <div className={styles.cardHeader}>
                <div className={styles.badges}>
                    <span className={styles.verifiedBadge}>
                        <ShieldCheck size={14} /> GST Verified
                    </span>
                </div>
                <div style={{ color: '#94a3b8' }}>
                    <MapPin size={18} />
                </div>
            </div>

            <div className={styles.cardBody}>
                <div>
                    <h3 className={styles.sellerName}>Swadeshi Crafts {index}</h3>
                    <p className={styles.location}>{stateName}, India</p>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Authentic manufacturer of traditional goods. Direct from artisan to you.
                </p>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.rating}>
                    <Star size={16} fill="#F59E0B" stroke="#F59E0B" />
                    <span>4.{9 - (index % 5)}</span>
                    <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: '4px' }}>
                        ({100 + index * 12})
                    </span>
                </div>
                <Link href={`/seller/${index}`}>
                    <Button variant="outline" size="sm">Visit Store</Button>
                </Link>
            </div>
        </motion.div>
    )
}
