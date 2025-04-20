import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from "./ui/card";
import { isToday } from "date-fns";

export default function TodayExerciseChart({ completedExercises }) {
  // Filter exercises completed today
  const todayExercises = completedExercises.filter(exercise => 
    isToday(new Date(exercise.completedAt))
  );
  
  // If no exercises today, return a message
  if (todayExercises.length === 0) {
    return (
      <Card className="p-4 text-center">
        <h3 className="text-lg font-medium mb-2">Today's Exercise</h3>
        <p className="text-gray-500">No exercises completed today</p>
      </Card>
    );
  }
  
  // Count exercises by category
  const exercisesByCategory = todayExercises.reduce((acc, exercise) => {
    const category = exercise.category || 'other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  // Convert to array for the chart
  const chartData = Object.entries(exercisesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
    value
  }));
  
  // Colors for different categories
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-2">Today's Exercise by Category</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} exercises`, 'Count']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        Total: {todayExercises.length} exercise{todayExercises.length !== 1 ? 's' : ''} completed today
      </div>
    </Card>
  );
}