import React from "react";

export default function MealCard({ meal }) {
  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 shadow-md rounded-2xl p-6 w-full md:w-1/2 lg:w-1/3 text-purple-50">
      <h2 className="text-2xl font-extrabold mb-4 text-purple-100">{meal.msCde}</h2>
      <ul className="list-disc list-inside whitespace-pre-line space-y-1 text-purple-200">
        {meal.msNme.split("\n").map((line, idx) =>
          line.trim() ? <li key={idx}>{line}</li> : null
        )}
      </ul>
    </div>
  );
}
