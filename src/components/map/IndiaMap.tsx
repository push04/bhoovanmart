"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import * as topojson from 'topojson-client';
import { motion } from 'framer-motion';
import styles from './IndiaMap.module.css';

// URL to the TopoJSON file in public folder
const INDIA_TOPO_JSON = "/maps/india-topo.json";

interface MapProps {
    onStateClick?: (stateName: string, stateCode: string) => void;
}

export function IndiaMap({ onStateClick }: MapProps) {
    const router = useRouter();
    const [tooltipContent, setTooltipContent] = useState("");
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        fetch(INDIA_TOPO_JSON)
            .then(response => response.json())
            .then(topology => {
                // Explicitly select the 'states' layer from the TopoJSON
                if (topology.objects && topology.objects.states) {
                    const statesGeo = topojson.feature(topology, topology.objects.states);
                    setGeoData(statesGeo);
                } else {
                    console.error("Could not find 'states' object in TopoJSON. Available objects:", Object.keys(topology.objects));
                }
            })
            .catch(err => console.error("Error loading map data:", err));
    }, []);

    const handleStateClick = (geo: any) => {
        const { st_nm, st_code } = geo.properties;
        console.log(`Clicked state: ${st_nm} (${st_code})`);

        if (onStateClick) {
            onStateClick(st_nm, st_code);
        }

        if (st_nm) {
            const slug = st_nm.toLowerCase().replace(/\s+/g, '-');
            router.push(`/state/${slug}`);
        }
    };

    if (!geoData) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading Interactive Map...</p>
            </div>
        );
    }

    return (
        <motion.div
            className={styles.mapContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.headerSection}>
                <h2 className={styles.mapTitle}>Select Your State</h2>
                <p className={styles.mapSubtitle}>Explore authentic products from every corner of India</p>
            </div>

            <div className={styles.mapWrapper}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 1100,
                        center: [78.9629, 23.5937] // Center of India
                    }}
                    className={styles.composableMap}
                >
                    <Geographies geography={geoData}>
                        {({ geographies }: { geographies: any[] }) =>
                            geographies.map((geo: any) => {
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            const { st_nm } = geo.properties;
                                            setTooltipContent(`${st_nm}`);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        onClick={() => handleStateClick(geo)}
                                        className={styles.geography}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={geo.properties.st_nm}
                                        style={{
                                            default: {
                                                fill: "#F3F4F6", // Light gray
                                                outline: "none",
                                                stroke: "#CBD5E1", // Slate-300
                                                strokeWidth: 0.5,
                                                transition: "all 0.3s ease"
                                            },
                                            hover: {
                                                // Gradient or solid fallback
                                                fill: "#FF9933", // Saffron
                                                outline: "none",
                                                stroke: "#FFFFFF",
                                                strokeWidth: 1.5,
                                                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
                                                cursor: "pointer",
                                            },
                                            pressed: {
                                                fill: "#1E3A8A", // Indigo-900
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
                <Tooltip
                    id="my-tooltip"
                    style={{
                        backgroundColor: "#1E2A44",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}
                />
            </div>

            <p className={styles.mapFooter}>
                <span className={styles.footerIcon}>📍</span>
                Click on any state to find verified Swadeshi sellers
            </p>
        </motion.div>
    );
}
