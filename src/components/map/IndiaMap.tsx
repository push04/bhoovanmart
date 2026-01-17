"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import * as topojson from 'topojson-client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Users, Package } from 'lucide-react';
import styles from './IndiaMap.module.css';

// URL to the TopoJSON file in public folder
const INDIA_TOPO_JSON = "/maps/india-topo.json";

interface MapProps {
    onStateClick?: (stateName: string, stateCode: string) => void;
}

export function IndiaMap({ onStateClick }: MapProps) {
    const router = useRouter();
    const [geoData, setGeoData] = useState<any>(null);
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string>("");
    const [allStates, setAllStates] = useState<string[]>([]);

    useEffect(() => {
        fetch(INDIA_TOPO_JSON)
            .then(response => response.json())
            .then(topology => {
                if (topology.objects && topology.objects.states) {
                    const statesGeo = topojson.feature(topology, topology.objects.states) as any;
                    setGeoData(statesGeo);

                    // Extract state names for dropdown
                    const names = statesGeo.features.map((f: any) => f.properties.st_nm).sort();
                    setAllStates(names);
                } else {
                    console.error("Could not find 'states' object in TopoJSON.");
                }
            })
            .catch(err => console.error("Error loading map data:", err));
    }, []);

    const handleStateClick = (stateName: string) => {
        console.log(`Clicked state: ${stateName}`);

        if (onStateClick) {
            // Pass dummy code if needed or lookup real code
            onStateClick(stateName, "IN-XX");
        }

        if (stateName) {
            const slug = stateName.toLowerCase().replace(/\s+/g, '-');
            router.push(`/state/${slug}`);
        }
    };

    const handleManualSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedState(val);
        if (val) handleStateClick(val);
    };

    if (!geoData) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading Interactive Map...</p>
            </div>
        );
    }

    // Determine what to show in the side panel
    const activeState = hoveredState || "Select a State";

    return (
        <motion.div
            className={styles.mapLayout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Left Column: Interactive Map */}
            <div className={styles.mapColumn}>
                <div className={styles.mapWrapper}>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 1300,
                            center: [78.9629, 23.5937]
                        }}
                        className={styles.composableMap}
                        height={650}
                        width={600}
                    >
                        <Geographies geography={geoData}>
                            {({ geographies }: { geographies: any[] }) =>
                                geographies.map((geo: any) => {
                                    const stName = geo.properties.st_nm;
                                    const isHovered = hoveredState === stName;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => setHoveredState(stName)}
                                            onMouseLeave={() => setHoveredState(null)}
                                            onClick={() => handleStateClick(stName)}
                                            className={styles.geography}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={stName}
                                            style={{
                                                default: {
                                                    fill: "#F1F5F9",
                                                    outline: "none",
                                                    stroke: "#64748B", // Darker border as requested
                                                    strokeWidth: 0.8,
                                                    transition: "all 0.3s ease"
                                                },
                                                hover: {
                                                    fill: "#FF9933", // Saffron
                                                    outline: "none",
                                                    stroke: "#1E3A8A", // Royal Blue
                                                    strokeWidth: 2,
                                                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                                                    cursor: "pointer",
                                                    zIndex: 10
                                                },
                                                pressed: {
                                                    fill: "#1E3A8A",
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
                            backgroundColor: "#0F172A",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: 600
                        }}
                    />
                </div>
            </div>

            {/* Right Column: Info Panel & Selection */}
            <div className={styles.infoColumn}>
                <div className={styles.infoCard}>
                    <div className={styles.headerGroup}>
                        <h2 className={styles.infoTitle}>Explore India</h2>
                        <p className={styles.infoSubtitle}>Discover authentic products state-wise.</p>
                    </div>

                    {/* Manual Selection Box */}
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel}>Select State Manually</label>
                        <div className={styles.selectContainer}>
                            <select
                                className={styles.stateSelect}
                                value={selectedState}
                                onChange={handleManualSelect}
                            >
                                <option value="">-- Choose State --</option>
                                {allStates.map(st => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* Dynamic Info Box */}
                    <div className={styles.dynamicInfoBox}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeState}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className={styles.stateNameLarge}>
                                    {hoveredState ? hoveredState : "Hover on Map"}
                                </h3>

                                <div className={styles.statsGrid}>
                                    <div className={styles.statItem}>
                                        <Users size={20} className={styles.statIcon} />
                                        <div>
                                            <span className={styles.statValue}>{hoveredState ? "120+" : "--"}</span>
                                            <span className={styles.statLabel}>Active Sellers</span>
                                        </div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <Package size={20} className={styles.statIcon} />
                                        <div>
                                            <span className={styles.statValue}>{hoveredState ? "1.5k+" : "--"}</span>
                                            <span className={styles.statLabel}>Products</span>
                                        </div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <MapPin size={20} className={styles.statIcon} />
                                        <div>
                                            <span className={styles.statValue}>{hoveredState ? "24" : "--"}</span>
                                            <span className={styles.statLabel}>Districts</span>
                                        </div>
                                    </div>
                                </div>

                                {hoveredState && (
                                    <div className={styles.actionHint}>
                                        Click to visit state page <ChevronRight size={16} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
