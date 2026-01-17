import { Header } from "@/components/layout/Header";
import { IndiaMap } from "@/components/map/IndiaMap";

export default function MapPage() {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
            position: 'relative'
        }}>

            {/* Background Decor */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.3,
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <Header />

            <div className="container" style={{
                flex: 1,
                padding: '4rem 1rem',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <IndiaMap />

                {/* Additional robust footer or info can go here to fill space if needed */}
                <div style={{ marginTop: '3rem', textAlign: 'center', maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
                    <p>Select a state to explore local artisans and authentic products.</p>
                </div>
            </div>
        </main>
    );
}
