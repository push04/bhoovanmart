"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import India from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import styles from './IndiaMap.module.css';

// Fix for default styles required by simpler usage, though we override them
// We might need to handle specific IDs from the library
// @svg-maps/india uses IDs like 'in-mh' (Maharashtra), 'in-dl' (Delhi) etc.

export function IndiaMap() {
    const router = useRouter();
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [toolkitPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleLocationClick = (event: any) => {
        const stateId = event.target.id;
        const stateName = event.target.getAttribute('name');
        console.log(`Clicked state: ${stateName} (${stateId})`);

        // Convert to simplified slug for URL
        // e.g., 'Maharashtra' -> 'maharashtra'
        if (stateName) {
            const slug = stateName.toLowerCase().replace(/\s+/g, '-');
            router.push(`/state/${slug}`);
        }
    };

    const handleLocationMouseOver = (event: any) => {
        const stateName = event.target.getAttribute('name');
        setHoveredState(stateName);
    };

    const handleLocationMouseOut = () => {
        setHoveredState(null);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        setTooltipPos({ x: event.clientX, y: event.clientY });
    };

    return (
        <div className={styles.mapContainer} onMouseMove={handleMouseMove}>
            <h2 className={styles.mapTitle}>Select Your State</h2>

            {/* Tooltip */}
            {hoveredState && (
                <div
                    className={styles.tooltip}
                    style={{ left: toolkitPos.x, top: toolkitPos.y }}
                >
                    {hoveredState}
                </div>
            )}

            <div className={styles.svgMap}>
                <SVGMap
                    map={India}
                    onLocationClick={handleLocationClick}
                    onLocationMouseOver={handleLocationMouseOver}
                    onLocationMouseOut={handleLocationMouseOut}
                />
            </div>

            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                Click on any state to explore local Swadeshi sellers.
            </p>
        </div>
    );
}
