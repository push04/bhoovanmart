import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

// Mock Data for States
// In real app, fetch from Supabase based on stateId
const STATE_DATA: Record<string, { name: string; description: string; bannerColor: string }> = {
    'maharashtra': {
        name: "Maharashtra",
        description: "Home of Paithani sarees, Warli art, and Kolhapuri chappals. A hub of traditional craftsmanship meeting modern innovation.",
        bannerColor: "#FF9933" // Saffron-ish
    },
    'rajasthan': {
        name: "Rajasthan",
        description: "The land of kings, famous for Blue Pottery, block prints, and vibrant textiles.",
        bannerColor: "#E04141"
    },
    'kerala': {
        name: "Kerala",
        description: "God's own country, known for spices, coir products, and Kasavu sarees.",
        bannerColor: "#2F6F4E"
    },
    'default': {
        name: "State Store",
        description: "Discover authentic products from this region. Swadeshi verified.",
        bannerColor: "#1E2A44"
    }
};

export default function StatePage({ params }: { params: { stateId: string } }) {
    const { stateId } = params;
    const data = STATE_DATA[stateId] || { ...STATE_DATA['default'], name: stateId.charAt(0).toUpperCase() + stateId.slice(1).replace('-', ' ') };

    return (
        <main>
            <Header />

            {/* State Banner */}
            <section style={{
                backgroundColor: data.bannerColor,
                color: 'white',
                padding: '4rem 1rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
                        Proudly from {data.name}
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
                        {data.description}
                    </p>
                </div>
            </section>

            {/* Top Sellers Section */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-indigo-blue)' }}>
                        Top Rated Sellers in {data.name}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Mock Seller Cards */}
                        {[1, 2, 3].map((i) => (
                            <SellerCard key={i} stateName={data.name} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

function SellerCard({ stateName, index }: { stateName: string; index: number }) {
    return (
        <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1.5rem', transition: 'all 0.2s', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Swadeshi Crafts {index}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        <MapPin size={14} />
                        <span>{stateName}, India</span>
                    </div>
                </div>
                <div style={{ background: '#e6fffa', color: '#2F6F4E', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    GST Verified
                </div>
            </div>

            <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Specializing in authentic hand-made goods with 10+ years of legacy.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={18} fill="#E07A1F" stroke="#E07A1F" />
                    <span style={{ fontWeight: 600 }}>4.{8 - index}</span>
                    <span style={{ color: '#999' }}>(12{index} reviews)</span>
                </div>
                <Link href={`/seller/${index}`}>
                    <Button variant="outline" size="sm">Visit Store</Button>
                </Link>
            </div>
        </div>
    )
}
