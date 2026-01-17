import { Header } from "@/components/layout/Header";
import { IndiaMap } from "@/components/map/IndiaMap";

export default function MapPage() {
    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div className="container" style={{ flex: 1, padding: '3rem 1rem' }}>
                <IndiaMap />
            </div>
        </main>
    );
}
