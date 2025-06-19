import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LucideIcon,
  Building,
  Castle,
  Trees,
  Warehouse,
  Waves,
  Thermometer,
  Wifi,
  Maximize,
  Tv,
  Dumbbell,
  Car,
  PawPrint,
  Cigarette,
  Cable,
  Bath,
  Phone,
  Sprout,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
} from 'lucide-react';

// NAVBAR HEIGHT
export const NAVBAR_HEIGHT = 52; // px

// Navigation links data
export const navLinks = [
  { href: '/about', text: 'About Us' },
  { href: '/contact', text: 'Contact Us' },
  { href: '/faq', text: 'FAQ' },
  { href: '/terms', text: 'Terms' },
  { href: '/privacy', text: 'Privacy' },
];

// Social media links data
export const socialLinks = [
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaTwitter, label: 'Twitter' },
  { icon: FaLinkedin, label: 'Linkedin' },
  { icon: FaYoutube, label: 'Youtube' },
];

// Footer policy links
export const policyLinks = [
  { href: '/privacy', text: 'Privacy Policy' },
  { href: '/terms', text: 'Terms of Service' },
  { href: '/cookies', text: 'Cookie Policy' },
];
// Menu items.
export const SidebarMenuItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Agents',
    url: '/agents',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '/search',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

// This is sample data.
export const SidebarItemsCollapsible = {
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      label: 'Platform',
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Pool = "Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
};

//MAP STUFF
export const BASEMAPS = [
  {
    id: 'positron',
    name: 'Positron',
    url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
  },
  {
    id: 'dark-matter',
    name: 'Dark',
    url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
  },
  {
    id: 'voyager',
    name: 'Voyager',
    url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
  },
];

export const initialViewState = {
  latitude: 37.7751,
  longitude: -122.4193,
  zoom: 12,
  bearing: 0,
  pitch: 0,
  minZoom: 0,
  maxZoom: 20,
  minPitch: 0,
  maxPitch: 85,
  scrollZoom: true,
  boxZoom: true,
  dragRotate: true,
  dragPan: true,
  keyboard: true,
  doubleClickZoom: true,
  touchZoomRotate: true,
  touchPitch: true,
};

export const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

export const pinStyle = {
  fill: '#d00',
  stroke: 'none'
};

export const CITIES = [
  {
    "city": "New York",
    "population": "8,175,133",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
    "state": "New York",
    "latitude": 40.6643,
    "longitude": -73.9385
  },
  {
    "city": "Los Angeles",
    "population": "3,792,621",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg",
    "state": "California",
    "latitude": 34.0194,
    "longitude": -118.4108
  },
  {
    "city": "Chicago",
    "population": "2,695,598",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg",
    "state": "Illinois",
    "latitude": 41.8376,
    "longitude": -87.6818
  },
  {
    "city": "Houston",
    "population": "2,100,263",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg",
    "state": "Texas",
    "latitude": 29.7805,
    "longitude": -95.3863
  },
  {
    "city": "Phoenix",
    "population": "1,445,632",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg",
    "state": "Arizona",
    "latitude": 33.5722,
    "longitude": -112.088
  },
  {
    "city": "Philadelphia",
    "population": "1,526,006",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg",
    "state": "Pennsylvania",
    "latitude": 40.0094,
    "longitude": -75.1333
  },
  {
    "city": "San Antonio",
    "population": "1,327,407",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG",
    "state": "Texas",
    "latitude": 29.4724,
    "longitude": -98.5251
  },
  {
    "city": "San Diego",
    "population": "1,307,402",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg",
    "state": "California",
    "latitude": 32.8153,
    "longitude": -117.135
  },
  {
    "city": "Dallas",
    "population": "1,197,816",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg",
    "state": "Texas",
    "latitude": 32.7757,
    "longitude": -96.7967
  },
  {
    "city": "San Jose",
    "population": "945,942",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG",
    "state": "California",
    "latitude": 37.2969,
    "longitude": -121.8193
  },
  {
    "city": "Austin",
    "population": "790,390",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG",
    "state": "Texas",
    "latitude": 30.3072,
    "longitude": -97.756
  },
  {
    "city": "Jacksonville",
    "population": "821,784",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg",
    "state": "Florida",
    "latitude": 30.337,
    "longitude": -81.6613
  },
  {
    "city": "San Francisco",
    "population": "805,235",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg",
    "state": "California",
    "latitude": 37.7751,
    "longitude": -122.4193
  },
  {
    "city": "Columbus",
    "population": "787,033",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg",
    "state": "Ohio",
    "latitude": 39.9848,
    "longitude": -82.985
  },
  {
    "city": "Indianapolis",
    "population": "820,445",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG",
    "state": "Indiana",
    "latitude": 39.7767,
    "longitude": -86.1459
  },
  {
    "city": "Fort Worth",
    "population": "741,206",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg",
    "state": "Texas",
    "latitude": 32.7795,
    "longitude": -97.3463
  },
  {
    "city": "Charlotte",
    "population": "731,424",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg",
    "state": "North Carolina",
    "latitude": 35.2087,
    "longitude": -80.8307
  },
  {
    "city": "Seattle",
    "population": "608,660",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg",
    "state": "Washington",
    "latitude": 47.6205,
    "longitude": -122.3509
  },
  {
    "city": "Denver",
    "population": "600,158",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG",
    "state": "Colorado",
    "latitude": 39.7618,
    "longitude": -104.8806
  },
  {
    "city": "El Paso",
    "population": "649,121",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg",
    "state": "Texas",
    "latitude": 31.8484,
    "longitude": -106.427
  }
]
