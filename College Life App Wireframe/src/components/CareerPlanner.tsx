import { useState } from "react";
import { Plus, Target, Calendar, TrendingUp, CheckCircle2, Circle, ChevronDown, ChevronUp, Briefcase, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  category: string;
  status: "current" | "pending";
  completed: boolean;
}

export function CareerPlanner() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Apply to Google Internship",
      description: "Summer 2025 Software Engineering Internship",
      deadline: "2025-12-01",
      progress: 60,
      category: "Internships",
      status: "current",
      completed: false,
    },
    {
      id: 2,
      title: "Microsoft Internship Application",
      description: "Software Development Internship",
      deadline: "2025-12-15",
      progress: 30,
      category: "Internships",
      status: "pending",
      completed: false,
    },
    {
      id: 3,
      title: "Junior Developer Position at StartupXYZ",
      description: "Full-time position for recent graduates",
      deadline: "2025-11-30",
      progress: 80,
      category: "Job Applications",
      status: "current",
      completed: false,
    },
    {
      id: 4,
      title: "Tech Corp - Entry Level",
      description: "Submitted application, waiting for response",
      deadline: "2025-12-20",
      progress: 20,
      category: "Job Applications",
      status: "pending",
      completed: false,
    },
    {
      id: 5,
      title: "Google Interview - Round 1",
      description: "Technical phone screen scheduled",
      deadline: "2025-11-20",
      progress: 100,
      category: "Interviews",
      status: "current",
      completed: true,
    },
    {
      id: 6,
      title: "Amazon Interview Prep",
      description: "Preparing for upcoming interview",
      deadline: "2025-11-25",
      progress: 50,
      category: "Interviews",
      status: "pending",
      completed: false,
    },
    {
      id: 7,
      title: "Complete LinkedIn Profile",
      description: "Add projects, skills, and recommendations",
      deadline: "2025-11-15",
      progress: 80,
      category: "Networking",
      status: "current",
      completed: false,
    },
    {
      id: 8,
      title: "Attend Career Fair",
      description: "Network with potential employers",
      deadline: "2025-11-15",
      progress: 100,
      category: "Networking",
      status: "current",
      completed: true,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "Internships",
    status: "current" as "current" | "pending",
  });

  // Dropdown states
  const [internshipsOpen, setInternshipsOpen] = useState(true);
  const [internshipsCurrentOpen, setInternshipsCurrentOpen] = useState(true);
  const [internshipsPendingOpen, setInternshipsPendingOpen] = useState(true);
  
  const [jobsOpen, setJobsOpen] = useState(true);
  const [jobsCurrentOpen, setJobsCurrentOpen] = useState(true);
  const [jobsPendingOpen, setJobsPendingOpen] = useState(true);
  
  const [interviewsOpen, setInterviewsOpen] = useState(true);
  const [interviewsCurrentOpen, setInterviewsCurrentOpen] = useState(true);
  const [interviewsPendingOpen, setInterviewsPendingOpen] = useState(true);
  
  const [networkingOpen, setNetworkingOpen] = useState(true);
  const [networkingCurrentOpen, setNetworkingCurrentOpen] = useState(true);
  const [networkingPendingOpen, setNetworkingPendingOpen] = useState(true);

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal.title,
        description: newGoal.description,
        deadline: newGoal.deadline,
        progress: 0,
        category: newGoal.category,
        status: newGoal.status,
        completed: false,
      };
      setGoals([goal, ...goals]);
      setNewGoal({ title: "", description: "", deadline: "", category: "Internships", status: "current" });
      setIsOpen(false);
    }
  };

  const handleToggleComplete = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 }
          : goal
      )
    );
  };

  const handleUpdateProgress = (id: number, progress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress, completed: progress === 100 } : goal
      )
    );
  };

  const getGoalsByCategory = (category: string, status: "current" | "pending") => {
    return goals.filter((g) => g.category === category && g.status === status);
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const internshipsCurrent = getGoalsByCategory("Internships", "current");
  const internshipsPending = getGoalsByCategory("Internships", "pending");
  const jobsCurrent = getGoalsByCategory("Job Applications", "current");
  const jobsPending = getGoalsByCategory("Job Applications", "pending");
  const interviewsCurrent = getGoalsByCategory("Interviews", "current");
  const interviewsPending = getGoalsByCategory("Interviews", "pending");
  const networkingCurrent = getGoalsByCategory("Networking", "current");
  const networkingPending = getGoalsByCategory("Networking", "pending");

  const renderGoalCard = (goal: Goal) => (
    <div
      key={goal.id}
      className={`p-3 rounded-lg ${
        goal.completed
          ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
          : "bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500"
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <button
          onClick={() => handleToggleComplete(goal.id)}
          className="mt-1"
        >
          {goal.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          )}
        </button>
        <div className="flex-1">
          <p className={`text-gray-900 dark:text-white ${goal.completed ? "line-through" : ""}`}>
            {goal.title}
          </p>
          {goal.description && (
            <p className="text-gray-600 dark:text-gray-400">{goal.description}</p>
          )}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(goal.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Progress: {goal.progress}%</span>
        </div>
        <Progress value={goal.progress} className="h-2" />
        <input
          type="range"
          min="0"
          max="100"
          value={goal.progress}
          onChange={(e) => handleUpdateProgress(goal.id, parseInt(e.target.value))}
          className="w-full"
          disabled={goal.completed}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 text-white px-6 py-8">
        <h1 className="text-white mb-1">Career Planner</h1>
        <p className="text-blue-100">Track your professional goals and progress</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Overall Progress</p>
                <p className="text-gray-900 dark:text-white">
                  {completedGoals} of {totalGoals} goals completed
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-4 border-blue-600 dark:border-blue-400 flex items-center justify-center">
                  <span className="text-gray-900 dark:text-white">{Math.round(overallProgress)}%</span>
                </div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </CardContent>
        </Card>

        {/* Internships Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setInternshipsOpen(!internshipsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="dark:text-white">Internships</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs">
                  {internshipsCurrent.length + internshipsPending.length}
                </div>
              </div>
              {internshipsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {internshipsOpen && (
            <CardContent className="space-y-3">
              {/* Current */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setInternshipsCurrentOpen(!internshipsCurrentOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Current</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                        {internshipsCurrent.length}
                      </div>
                    </div>
                    {internshipsCurrentOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {internshipsCurrentOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {internshipsCurrent.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>

              {/* Pending */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setInternshipsPendingOpen(!internshipsPendingOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Pending</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 dark:bg-orange-500 text-white text-xs">
                        {internshipsPending.length}
                      </div>
                    </div>
                    {internshipsPendingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {internshipsPendingOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {internshipsPending.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>
            </CardContent>
          )}
        </Card>

        {/* Job Applications Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setJobsOpen(!jobsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <CardTitle className="dark:text-white">Job Applications</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-xs">
                  {jobsCurrent.length + jobsPending.length}
                </div>
              </div>
              {jobsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {jobsOpen && (
            <CardContent className="space-y-3">
              {/* Current */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setJobsCurrentOpen(!jobsCurrentOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Current</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                        {jobsCurrent.length}
                      </div>
                    </div>
                    {jobsCurrentOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {jobsCurrentOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {jobsCurrent.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>

              {/* Pending */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setJobsPendingOpen(!jobsPendingOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Pending</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 dark:bg-orange-500 text-white text-xs">
                        {jobsPending.length}
                      </div>
                    </div>
                    {jobsPendingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {jobsPendingOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {jobsPending.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>
            </CardContent>
          )}
        </Card>

        {/* Interviews Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setInterviewsOpen(!interviewsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                <CardTitle className="dark:text-white">Interviews</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                  {interviewsCurrent.length + interviewsPending.length}
                </div>
              </div>
              {interviewsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {interviewsOpen && (
            <CardContent className="space-y-3">
              {/* Current */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setInterviewsCurrentOpen(!interviewsCurrentOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Current</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                        {interviewsCurrent.length}
                      </div>
                    </div>
                    {interviewsCurrentOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {interviewsCurrentOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {interviewsCurrent.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>

              {/* Pending */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setInterviewsPendingOpen(!interviewsPendingOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Pending</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 dark:bg-orange-500 text-white text-xs">
                        {interviewsPending.length}
                      </div>
                    </div>
                    {interviewsPendingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {interviewsPendingOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {interviewsPending.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>
            </CardContent>
          )}
        </Card>

        {/* Networking Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setNetworkingOpen(!networkingOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <CardTitle className="dark:text-white">Networking</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-600 dark:bg-pink-500 text-white text-xs">
                  {networkingCurrent.length + networkingPending.length}
                </div>
              </div>
              {networkingOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {networkingOpen && (
            <CardContent className="space-y-3">
              {/* Current */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setNetworkingCurrentOpen(!networkingCurrentOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Current</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                        {networkingCurrent.length}
                      </div>
                    </div>
                    {networkingCurrentOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {networkingCurrentOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {networkingCurrent.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>

              {/* Pending */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setNetworkingPendingOpen(!networkingPendingOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Pending</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 dark:bg-orange-500 text-white text-xs">
                        {networkingPending.length}
                      </div>
                    </div>
                    {networkingPendingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {networkingPendingOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {networkingPending.map(renderGoalCard)}
                  </CardContent>
                )}
              </Card>
            </CardContent>
          )}
        </Card>

        {/* Add Goal Button at Bottom */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="dark:text-gray-300">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Apply to Google Internship"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="description" className="dark:text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add details about this goal..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="deadline" className="dark:text-gray-300">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="dark:text-gray-300">Category</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Internships", "Job Applications", "Interviews", "Networking"].map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={newGoal.category === cat ? "default" : "outline"}
                      onClick={() => setNewGoal({ ...newGoal, category: cat })}
                      className="text-xs"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="dark:text-gray-300">Status</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {(["current", "pending"] as const).map((status) => (
                    <Button
                      key={status}
                      type="button"
                      variant={newGoal.status === status ? "default" : "outline"}
                      onClick={() => setNewGoal({ ...newGoal, status })}
                      className="capitalize"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handleAddGoal} className="w-full bg-blue-600 hover:bg-blue-700">
                Add Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
