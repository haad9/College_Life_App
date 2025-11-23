import { CheckCircle2, Clock, DollarSign, Heart, AlertCircle, ChevronDown, ChevronUp, BookOpen, Calendar, Users as UsersIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useState } from "react";

export function DashboardPage() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  const [classesOpen, setClassesOpen] = useState(true);
  const [assignmentsOpen, setAssignmentsOpen] = useState(true);
  const [eventsOpen, setEventsOpen] = useState(true);
  const [othersOpen, setOthersOpen] = useState(true);

  // Count items in each section
  const classesCount = 3;
  const assignmentsCount = 3;
  const eventsCount = 2;
  const othersCount = 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-6">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white px-6 py-8 rounded-b-3xl">
        <h1 className="text-white mb-1">Dashboard</h1>
        <p className="text-blue-100">{greeting}, Alex! Here's your day at a glance</p>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        {/* Classes Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setClassesOpen(!classesOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Classes
                </CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs">
                  {classesCount}
                </div>
              </div>
              {classesOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {classesOpen && (
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Computer Science Lecture</p>
                  <p className="text-gray-600 dark:text-gray-400">9:00 AM - 10:30 AM • Building A-204</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Today</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Calculus II</p>
                  <p className="text-gray-600 dark:text-gray-400">11:00 AM - 12:30 PM • Math Building 101</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Today</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Physics Lab</p>
                  <p className="text-gray-600 dark:text-gray-400">2:00 PM - 4:00 PM • Science Building Lab 3</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Today</Badge>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Assignments Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setAssignmentsOpen(!assignmentsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  Assignments
                </CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-600 dark:bg-yellow-500 text-white text-xs">
                  {assignmentsCount}
                </div>
              </div>
              {assignmentsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {assignmentsOpen && (
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Assignment Due: Data Structures</p>
                  <p className="text-gray-600 dark:text-gray-400">Due by 11:59 PM today</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Urgent</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Physics Problem Set 5</p>
                  <p className="text-gray-600 dark:text-gray-400">Due Nov 10, 11:59 PM</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Due Soon</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 border-l-4 border-gray-400 rounded">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Essay: Renaissance Art</p>
                  <p className="text-gray-600 dark:text-gray-400">Due Nov 15, 11:59 PM</p>
                </div>
                <Badge variant="secondary">Upcoming</Badge>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Events Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setEventsOpen(!eventsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Events
                </CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-xs">
                  {eventsCount}
                </div>
              </div>
              {eventsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {eventsOpen && (
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Study Group - Physics</p>
                  <p className="text-gray-600 dark:text-gray-400">6:00 PM - 7:30 PM • Library Room 3</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Evening</Badge>
              </div>

              <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded">
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Career Fair</p>
                  <p className="text-gray-600 dark:text-gray-400">Nov 15 • 10:00 AM - 4:00 PM</p>
                </div>
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">Next Week</Badge>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Others Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setOthersOpen(!othersOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                  Others
                </CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 dark:bg-red-500 text-white text-xs">
                  {othersCount}
                </div>
              </div>
              {othersOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {othersOpen && (
            <CardContent className="space-y-4">
              {/* Budget Summary */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-gray-900 dark:text-white">Budget Summary</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">On Track</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Spending</span>
                    <span className="text-gray-900 dark:text-white">$420 / $800</span>
                  </div>
                  <Progress value={52.5} className="h-2" />
                </div>
              </div>

              {/* Wellness Tracker */}
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-gray-900 dark:text-white">Wellness Tracker</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Today's Goals</span>
                    <span className="text-gray-900 dark:text-white">75%</span>
                  </div>
                  <Progress value={75} className="h-2 [&>div]:bg-red-500" />
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">Gym Session</p>
                  <p className="text-gray-600 dark:text-gray-400">8:00 PM - 9:00 PM • Campus Fitness Center</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Wellness</Badge>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
