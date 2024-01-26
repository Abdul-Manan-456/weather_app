"use client";
import { Inter } from "next/font/google";
import Weather from "./Weather";
import React, { createContext, useEffect, useReducer } from "react";
const inter = Inter({ subsets: ["latin"] });
import { WeatherProvider } from "../store/WeatherContext";

export default function Home() {
  return (
    <WeatherProvider>
      <main
        className={`min-h-screen overflow-y-auto flex items-center justify-center gradient-background ${inter.className}`}
      >
        <Weather />
      </main>
    </WeatherProvider>
  );
}
