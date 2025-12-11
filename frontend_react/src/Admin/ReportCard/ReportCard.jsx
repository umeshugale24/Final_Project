import { Card } from "@mui/material";
import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// ⚡ This component is something I use to quickly display summary stats on the dashboard.
// It shows a metric title, its value, and whether it increased or decreased.
const AvgStatsCard = ({ title, icon, value, isGrowth, growthPercent }) => {
  return (
    <Card className="p-5 px-6 flex justify-between space-x-10">
      <div>
        {/* Showing the metric title */}
        <p className="pb-5">{title}</p>

        {/* Displaying the numeric value (adding K like in the original UI design) */}
        <p className="font-semibold text-gray-300 text-xl">{value}K</p>

        {/* Growth indicator styling – switching color based on positive or negative */}
        <div
          className={`${
            isGrowth ? "text-green-600" : "text-red-500"
          } flex items-center space-x-3 mt-2`}
        >
          {/* Percentage growth shown beside the trend icon */}
          <p className="text-sm">{growthPercent}%</p>
          <TrendingUpIcon />
        </div>
      </div>

      {/* Right-side icon representing the metric visually */}
      {icon}
    </Card>
  );
};

export default AvgStatsCard;
