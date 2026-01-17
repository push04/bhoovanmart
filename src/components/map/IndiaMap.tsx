"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import clsx from 'clsx';
import styles from './IndiaMap.module.css';

// URL to the TopoJSON file in public folder
const INDIA_TOPO_JSON = "/maps/india-topo.json";

interface MapProps {
    onStateClick?: (stateName: string, stateCode: string) => void;
}

export function IndiaMap({ onStateClick }: MapProps) {
    const router = useRouter();
    const [tooltipContent, setTooltipContent] = useState("");

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

    return (
        <div className={styles.mapContainer}>
            <h2 className={styles.mapTitle}>Select Your State</h2>

            <div className={styles.mapWrapper}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 1000,
                        center: [78.9629, 22.5937] // Center of India
                    }}
                    className={styles.composableMap}
                >
                    <Geographies geography={INDIA_TOPO_JSON}>
                        {({ geographies }: { geographies: any[] }) =>
                            geographies.map((geo: any) => {
                                // Use specific object key if needed, or default implies first object
                                // The file has 'states' and 'districts'. By default react-simple-maps might pick first.
                                // We should verify. But usually it iterates all geometries in the Topology.
                                // If we want ONLY states, we should access that feature. 
                                // However, for this file, usually loading the URL loads all objects. 
                                // We'll see. Ideally we'd filter or specify "geography={...}" with object.

                                // Checking if it's a state (based on properties).
                                // We exclude districts by checking if 'district' property exists.
                                // States usually have 'st_nm' but NOT 'district'.
                                const isDistrict = geo.properties.district;
                                if (isDistrict) return null;

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
                                                fill: "#D6D6DA",
                                                outline: "none",
                                                stroke: "#FFFFFF",
                                                strokeWidth: 0.5,
                                                transition: "all 0.3s"
                                            },
                                            hover: {
                                                fill: "#FF9933", // Saffron
                                                outline: "none",
                                                stroke: "#FFFFFF",
                                                strokeWidth: 0.7,
                                                cursor: "pointer"
                                            },
                                            pressed: {
                                                fill: "#E04141",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
                <Tooltip id="my-tooltip" />
            </div>

            <p className={styles.mapFooter}>
                Click on any state to explore local Swadeshi sellers.
            </p>
        </div>
    );
}
