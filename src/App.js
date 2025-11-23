import React, { useState, useEffect } from "react";
import axios from "axios";
import MealCard from "./components/MealCard";
import { FaGithub } from "react-icons/fa";

export default function App() {
  const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = dayMap[new Date().getDay()];
  
  const [meals, setMeals] = useState([]);
  const [day, setDay] = useState(today);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeals(day);
  }, [day]);

  const fetchMeals = async (selectedDay) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://mycamu-mess-menu-backend.onrender.com/menu/${selectedDay}`);
      const res = await axios.get(`https://mycamu-mess-menu-backend.vercel.app/api/menu?day=${selectedDay}`);
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 mb-10">
        Mess Menu 
      </h1>
       {/* <h3 className="text-1xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 mb-10">
        Response can take upto 50 seconds due to inactivity of hosting services. 
      </h3> */}
    

      {/* Day Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none ${
              d === day
                ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white shadow-lg"
                : "bg-gray-800 text-purple-300 hover:bg-gradient-to-r hover:from-purple-700 hover:via-purple-600 hover:to-purple-800 hover:text-white"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-purple-300 italic">Loading menu... Response can take upto 50 seconds due to inactivity of hosting services.</p>
        
        
      )}

      {/* Meals */}
      <div className="flex flex-wrap gap-6 justify-center max-w-6xl w-full">
        {meals.map((meal, i) => (
          <MealCard key={i} meal={meal} />
        ))}
      </div>

      {/* Footer with GitHub links */}
      <footer className="mt-16 flex flex-col items-center gap-4 text-purple-300">
        <a
          href="https://github.com/Mbajaj0807/mycamu-mess-menu-backend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-purple-400 transition-colors"
        >
          <FaGithub size={20} />
          Backend Repository
        </a>
        <a
          href="https://github.com/Mbajaj0807/mycamu-mess-menu-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-purple-400 transition-colors"
        >
          <FaGithub size={20} />
          Frontend Repository
        </a>
      </footer>
    </div>
  );
}
