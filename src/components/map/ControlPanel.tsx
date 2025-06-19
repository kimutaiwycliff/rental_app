import { CITIES } from '@/lib/constants';
import React from 'react';

export type Basemap = {
  id: string;
  name: string;
  url: string;
};

export type BasemapSwitcherProps = {
  basemaps: Basemap[];
  currentBasemap: Basemap;
  setCurrentBasemap: (basemap: Basemap) => void;
};

type Coordinates = {
  longitude: number;
  latitude: number;
};

type ControlPanelProps = {
  onSelectCity: (coords: Coordinates) => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({ onSelectCity }) => {
  return (
    <div className="absolute right-10 z-[1] flex bg-black rounded-md shadow-md overflow-hidden border border-primary">
      {CITIES.filter((city) => city.state === 'California').map(
        (city, index) => (
          <div key={`btn-${index}`} className="flex items-center gap-[8px]">
            <input
              type="radio"
              name="city"
              id={`city-${index}`}
              defaultChecked={city.city === 'San Francisco'}
              onClick={() => onSelectCity(city)}
            />
            <label htmlFor={`city-${index}`}>{city.city}</label>
          </div>
        )
      )}
    </div>
  );
};

export const BasemapSwitcher: React.FC<BasemapSwitcherProps> = ({
  basemaps,
  currentBasemap,
  setCurrentBasemap,
}) => {
  return (
    <div className="absolute bottom-7 left-[120px] z-[1] flex bg-primary rounded-md shadow-md overflow-hidden border border-primary">
      {basemaps.map((basemap) => (
        <button
          key={basemap.id}
          onClick={() => setCurrentBasemap(basemap)}
          className={`px-3 py-1 text-xs transition-colors duration-200 ease-in-out
        ${
          currentBasemap.id === basemap.id
            ? 'underline text-secondary font-medium bg-gray-100'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        >
          {basemap.name}
        </button>
      ))}
    </div>
  );
};

export default ControlPanel;
