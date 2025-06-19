'use client';
import { BASEMAPS, initialViewState } from '@/lib/constants';
import { useRef, useCallback, useState } from 'react';
import {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Map,
  MapRef,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from './Layers';
import ControlPanel, { BasemapSwitcher } from './ControlPanel';
import { formatDate, getMagnitudeColor } from '@/lib/utils';
import GeocoderControl from './Geocoder';

type Basemap = {
  id: string;
  name: string;
  url: string;
};

type City = {
  longitude: number;
  latitude: number;
};

type PointProperties = {
  mag: number;
  time: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type Point = {
  longitude: number;
  latitude: number;
  properties: PointProperties;
};

const MapComponent = () => {
  const mapRef = useRef<MapRef>(null);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [currentBasemap, setCurrentBasemap] = useState<Basemap>(BASEMAPS[0]);
  const [cursor, setCursor] = useState<string>('auto');
  const [mapStyle, setMapStyle] = useState<string>(BASEMAPS[0].url);

  const onSelectCity = useCallback((city: City) => {
    const { longitude, latitude } = city;
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 1500,
      zoom: 12,
    });
  }, []);

  // Handle click events
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = useCallback(async (event: any) => {
    const feature = event.features?.[0];
    if (!feature) {
      setSelectedPoint(null);
      return;
    }

    // If it's a cluster
    if (feature.properties?.cluster_id) {
      const clusterId = feature.properties.cluster_id;
      const geojsonSource = mapRef.current?.getSource('earthquakes');
      const zoom = await geojsonSource?.getClusterExpansionZoom(clusterId);

      mapRef.current?.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
      setSelectedPoint(null);
    }
    // If it's an unclustered point
    else {
      setSelectedPoint({
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        properties: feature.properties,
      });
    }
  }, []);

  // Handle hover events
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHover = useCallback((event: any) => {
    const feature = event.features?.[0];
    if (!feature || feature.properties?.cluster_id) {
      setHoveredPoint(null);
      return;
    }

    setHoveredPoint({
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      properties: feature.properties,
    });
    setCursor('pointer');
  }, []);

  // Clear hover when mouse leaves the map
  const onMouseLeave = useCallback(() => {
    setHoveredPoint(null);
    setCursor('auto');
  }, []);

  // Handle basemap changes
  const handleBasemapChange = useCallback(
    (basemap: Basemap): void => {
      setCurrentBasemap(basemap);
      setMapStyle(basemap.url);
    },
    [setCurrentBasemap, setMapStyle]
  );

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        onClick={onClick}
        onMouseMove={onHover}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <GeocoderControl position="top-right" marker={true} />

        <Source
          id="earthquakes"
          type="geojson"
          data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

        {/* Click Popup (persistent until closed) */}
        {selectedPoint && (
          <Popup
            longitude={selectedPoint.longitude}
            latitude={selectedPoint.latitude}
            onClose={() => setSelectedPoint(null)}
            anchor="bottom"
            offset={25}
            closeButton={true}
            closeOnClick={false}
          >
            <div className=" rounded-lg shadow-md overflow-hidden min-w-[240px] translate-y-1 transition-all duration-200 ease-out hover:shadow-lg ">
              <div
                className="text-white px-4 py-3 font-semibold text-base flex items-center"
                style={{
                  background: `linear-gradient(135deg, #6b73ff 0%, #000dff 100%)`,
                }}
              >
                <span
                  className="inline-block w-3 h-3 rounded-full mr-1.5"
                  style={{
                    backgroundColor: getMagnitudeColor(
                      selectedPoint.properties.mag
                    ),
                  }}
                />
                Earthquake Details
              </div>
              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-2 last:mb-0">
                  <span className="font-medium text-gray-600 text-sm">Magnitude:</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {selectedPoint.properties.mag || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2 last:mb-0">
                  <span className="font-medium text-gray-600 text-sm">Time:</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {formatDate(selectedPoint.properties.time)}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        )}

        {/* Hover Popup (temporary) */}
        {hoveredPoint && !selectedPoint && (
          <Popup
            longitude={hoveredPoint.longitude}
            latitude={hoveredPoint.latitude}
            anchor="bottom"
            offset={15}
            closeButton={false}
            closeOnClick={false}
            closeOnMove={true}
          >
            <div className="rounded-lg shadow-md overflow-hidden min-w-[160px] translate-y-1 transition-all duration-200 ease-out hover:shadow-lg">
              <div className="text-white px-4 py-3 font-semibold text-base flex items-center">
                <div className="flex justify-between items-center mb-2 last:mb-0">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-1.5"
                    style={{
                      backgroundColor: getMagnitudeColor(
                        hoveredPoint.properties.mag
                      ),
                    }}
                  />
                  <span className="font-semibold text-gray-800 text-sm">
                    Mag: {hoveredPoint.properties.mag || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
      <BasemapSwitcher
        basemaps={BASEMAPS}
        currentBasemap={currentBasemap}
        setCurrentBasemap={handleBasemapChange}
      />
      <ControlPanel onSelectCity={onSelectCity} />
    </>
  );
};
export default MapComponent;
