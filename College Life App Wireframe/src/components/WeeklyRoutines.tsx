import { useState } from "react";
import { Plus, BookOpen, Dumbbell, Coffee, Users, X, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface Routine {
  id: number;
  title: string;
  time: string;
  days: string[];
  category: "class" | "gym" | "study" | "social";
}

export function WeeklyRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: 1,
      title: "Computer Science 101",
      time: "9:00 AM",
      days: ["Mon", "Wed", "Fri"],
      category: "class",
    },
    {
      id: 2,
      title: "Gym Workout",
      time: "7:00 AM",
      days: ["Mon", "Wed", "Fri"],
      category: "gym",
    },
    {
      id: 3,
      title: "Study Group - Math",
      time: "4:00 PM",
      days: ["Tue", "Thu"],
      category: "study",
    },
    {
      id: 4,
      title: "Physics Lab",
      time: "2:00 PM",
      days: ["Tue"],
      category: "class",
    },
    {
      id: 5,
      title: "Coffee with Friends",
      time: "5:00 PM",
      days: ["Wed"],
      category: "social",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    title: "",
    time: "",
    days: [] as string[],
    category: "class" as "class" | "gym" | "study" | "social",
  });

  // Day open states
  const [monOpen, setMonOpen] = useState(true);
  const [tueOpen, setTueOpen] = useState(true);
  const [wedOpen, setWedOpen] = useState(true);
  const [thuOpen, setThuOpen] = useState(true);
  const [friOpen, setFriOpen] = useState(true);
  const [satOpen, setSatOpen] = useState(true);
  const [sunOpen, setSunOpen] = useState(true);

  const weekDays = [
    { name: "Mon", full: "Monday", isOpen: monOpen, setIsOpen: setMonOpen },
    { name: "Tue", full: "Tuesday", isOpen: tueOpen, setIsOpen: setTueOpen },
    { name: "Wed", full: "Wednesday", isOpen: wedOpen, setIsOpen: setWedOpen },
    { name: "Thu", full: "Thursday", isOpen: thuOpen, setIsOpen: setThuOpen },
    { name: "Fri", full: "Friday", isOpen: friOpen, setIsOpen: setFriOpen },
    { name: "Sat", full: "Saturday", isOpen: satOpen, setIsOpen: setSatOpen },
    { name: "Sun", full: "Sunday", isOpen: sunOpen, setIsOpen: setSunOpen },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "class":
        return <BookOpen className="w-5 h-5" />;
      case "gym":
        return <Dumbbell className="w-5 h-5" />;
      case "study":
        return <Coffee className="w-5 h-5" />;
      case "social":
        return <Users className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "class":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
      case "gym":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "study":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200";
      case "social":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
    }
  };

  const toggleDay = (day: string) => {
    setNewRoutine((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleAddRoutine = () => {
    if (newRoutine.title && newRoutine.time && newRoutine.days.length > 0) {
      setRoutines([...routines, { ...newRoutine, id: Date.now() }]);
      setNewRoutine({ title: "", time: "", days: [], category: "class" });
      setIsOpen(false);
    }
  };

  const handleDeleteRoutine = (id: number) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  const getRoutinesForDay = (dayName: string) => {
    return routines.filter((r) => r.days.includes(dayName));
  };

  // Get today's day name for indicator
  const getTodayName = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date().getDay()];
  };

  const todayName = getTodayName();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-8 border-b border-gray-200 dark:border-gray-700">
        <h1 className="dark:text-white mb-1">Weekly Routines</h1>
        <p className="text-gray-600 dark:text-gray-400">Plan your academic and personal schedule</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Days with Dropdowns */}
        {weekDays.map((day) => {
          const dayRoutines = getRoutinesForDay(day.name);
          const routineCount = dayRoutines.length;
          const isToday = day.name === todayName;
          
          return (
            <Card key={day.name} className={`shadow-lg dark:bg-gray-800 dark:border-gray-700 ${isToday ? 'border-2 border-green-500 dark:border-green-400' : ''}`}>
              <CardHeader 
                className="cursor-pointer"
                onClick={() => day.setIsOpen(!day.isOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="dark:text-white">{day.full}</CardTitle>
                    {isToday && (
                      <span className="px-2 py-0.5 text-xs bg-green-600 dark:bg-green-500 text-white rounded-full">
                        Today
                      </span>
                    )}
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs">
                      {routineCount}
                    </div>
                  </div>
                  {day.isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
              </CardHeader>
              {day.isOpen && (
                <CardContent className="space-y-3">
                  {dayRoutines.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                      No routines scheduled for {day.full}
                    </p>
                  ) : (
                    dayRoutines.map((routine) => (
                      <div
                        key={routine.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          routine.category === "class"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : routine.category === "gym"
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : routine.category === "study"
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${getCategoryColor(routine.category)}`}>
                              {getCategoryIcon(routine.category)}
                            </div>
                            <div>
                              <p className="text-gray-900 dark:text-white">{routine.title}</p>
                              <p className="text-gray-600 dark:text-gray-400">{routine.time}</p>
                              <div className="flex gap-1 mt-2">
                                {routine.days.map((d) => (
                                  <Badge key={d} variant="secondary" className="text-xs">
                                    {d}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRoutine(routine.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}

        {/* Add Routine Button at Bottom */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="w-5 h-5 mr-2" />
              Add Routine
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Add New Routine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="dark:text-gray-300">Activity Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Chemistry Lab"
                  value={newRoutine.title}
                  onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="time" className="dark:text-gray-300">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newRoutine.time}
                  onChange={(e) => setNewRoutine({ ...newRoutine, time: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="dark:text-gray-300">Category</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {(["class", "gym", "study", "social"] as const).map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={newRoutine.category === cat ? "default" : "outline"}
                      onClick={() => setNewRoutine({ ...newRoutine, category: cat })}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="dark:text-gray-300">Repeat on</Label>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {weekDays.map((day) => (
                    <Button
                      key={day.name}
                      type="button"
                      variant={newRoutine.days.includes(day.name) ? "default" : "outline"}
                      onClick={() => toggleDay(day.name)}
                      className="p-2"
                    >
                      {day.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handleAddRoutine} className="w-full">
                Add Routine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
