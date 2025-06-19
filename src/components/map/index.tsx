"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-full rounded-xl" />
});

export default Map;
