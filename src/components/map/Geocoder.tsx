'use client';
import * as React from 'react';
import { useState } from 'react';
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl/maplibre';
import MaplibreGeocoder, {
  MaplibreGeocoderApi,
  MaplibreGeocoderOptions
} from '@maplibre/maplibre-gl-geocoder';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

type GeocoderControlProps = Omit<MaplibreGeocoderOptions, 'maplibregl' | 'marker'> & {
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;
  position: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};

const geocoderApi: MaplibreGeocoderApi = {
  forwardGeocode: async (config) => {
    const features = [];
    try {
      // Use Next.js API route or direct Nominatim API call
      const request = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        config.query
      )}&format=geojson&polygon_geojson=1&addressdetails=1`;

      const response = await fetch(request, {
        headers: {
          // Add user agent as required by Nominatim's usage policy
          'User-Agent': 'Your App Name (your@email.com)'
        }
      });

      const geojson = await response.json();

      for (const feature of geojson.features) {
        const center = [
          feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
        ];
        const point = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: center
          },
          place_name: feature.properties.display_name,
          properties: feature.properties,
          text: feature.properties.display_name,
          place_type: ['place'],
          center
        };
        features.push(point);
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return {
      features
    };
  }
};

export default function GeocoderControl(props: GeocoderControlProps) {
  const [marker, setMarker] = useState<React.ReactElement | null>(null);

  const geocoder = useControl<MaplibreGeocoder>(
    ({ mapLib }) => {
      const ctrl = new MaplibreGeocoder(geocoderApi, {
        ...props,
        marker: false,
        maplibregl: mapLib
      });

      ctrl.on('loading', props.onLoading || (() => {}));
      ctrl.on('results', props.onResults || (() => {}));
      ctrl.on('result', (evt) => {
        props.onResult?.(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));

        if (location && props.marker) {
          const markerProps = typeof props.marker === 'object' ? props.marker : {};
          setMarker(<Marker  {...markerProps} longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }
      });
      ctrl.on('error', props.onError || (() => {}));
      return ctrl;
    },
    {
      position: props.position
    }
  );

  // Update geocoder options when props change
  React.useEffect(() => {
    if (!geocoder || !('_map' in geocoder)) return;

    if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
      geocoder.setProximity(props.proximity);
    }
    if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
      geocoder.setRenderFunction(props.render);
    }
    if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
      geocoder.setLanguage(props.language);
    }
    if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
      geocoder.setZoom(props.zoom);
    }
    if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
      geocoder.setFlyTo(props.flyTo);
    }
    if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
      geocoder.setPlaceholder(props.placeholder);
    }
    if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
      geocoder.setCountries(props.countries);
    }
    if (geocoder.getTypes() !== props.types && props.types !== undefined) {
      geocoder.setTypes(props.types);
    }
    if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
      geocoder.setMinLength(props.minLength);
    }
    if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
      geocoder.setLimit(props.limit);
    }
    if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
      geocoder.setFilter(props.filter);
    }
  }, [
    props.proximity,
    props.render,
    props.language,
    props.zoom,
    props.flyTo,
    props.placeholder,
    props.countries,
    props.types,
    props.minLength,
    props.limit,
    props.filter,
    geocoder
  ]);

  return marker;
}

// Set default props
GeocoderControl.defaultProps = {
  marker: true,
  onLoading: () => {},
  onResults: () => {},
  onResult: () => {},
  onError: () => {}
};
