import { useState } from "react";
import { Calendar, MapPin, Users, Check, ChevronDown, ChevronUp, Search, UserPlus, Facebook, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  rsvped: boolean;
  isFavorite: boolean;
  timing: "today" | "upcoming";
}

interface Group {
  id: number;
  name: string;
  members: number;
  description: string;
}

interface Friend {
  id: number;
  name: string;
  status: "active" | "pending";
}

interface Club {
  id: number;
  name: string;
  members: number;
  category: string;
}

export function SocialHub() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Study Group - Physics",
      date: "Nov 9",
      time: "6:00 PM - 7:30 PM",
      location: "Library Room 3",
      attendees: 45,
      category: "Academic",
      rsvped: true,
      isFavorite: true,
      timing: "today",
    },
    {
      id: 2,
      title: "Intramural Basketball",
      date: "Nov 9",
      time: "8:00 PM - 9:00 PM",
      location: "Sports Complex",
      attendees: 156,
      category: "Sports",
      rsvped: true,
      isFavorite: false,
      timing: "today",
    },
    {
      id: 3,
      title: "Fall Semester Career Fair",
      date: "Nov 15",
      time: "10:00 AM - 4:00 PM",
      location: "Student Center, Main Hall",
      attendees: 234,
      category: "Career",
      rsvped: false,
      isFavorite: true,
      timing: "upcoming",
    },
    {
      id: 4,
      title: "Tech Talk: AI in Healthcare",
      date: "Nov 14",
      time: "5:00 PM - 6:30 PM",
      location: "Engineering Building",
      attendees: 89,
      category: "Academic",
      rsvped: false,
      isFavorite: false,
      timing: "upcoming",
    },
  ]);

  const [groups] = useState<Group[]>([
    { id: 1, name: "Computer Science Club", members: 45, description: "Weekly coding sessions" },
    { id: 2, name: "Photography Enthusiasts", members: 32, description: "Campus photo walks" },
    { id: 3, name: "Study Buddies", members: 28, description: "Group study sessions" },
  ]);

  const [friends] = useState<Friend[]>([
    { id: 1, name: "Sarah Johnson", status: "active" },
    { id: 2, name: "Mike Chen", status: "active" },
    { id: 3, name: "Emma Davis", status: "pending" },
    { id: 4, name: "Alex Rodriguez", status: "pending" },
  ]);

  const [clubs] = useState<Club[]>([
    { id: 1, name: "Debate Club", members: 56, category: "Academic" },
    { id: 2, name: "Drama Society", members: 42, category: "Arts" },
    { id: 3, name: "Chess Club", members: 28, category: "Games" },
  ]);

  // Dropdown states
  const [eventsOpen, setEventsOpen] = useState(true);
  const [todayOpen, setTodayOpen] = useState(true);
  const [upcomingOpen, setUpcomingOpen] = useState(true);
  const [favoriteOpen, setFavoriteOpen] = useState(true);
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [friendsOpen, setFriendsOpen] = useState(true);
  const [searchFriendsOpen, setSearchFriendsOpen] = useState(false);
  const [pendingRequestsOpen, setPendingRequestsOpen] = useState(false);
  const [socialMediaOpen, setSocialMediaOpen] = useState(false);
  const [clubsOpen, setClubsOpen] = useState(true);

  const handleRSVP = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, rsvped: !event.rsvped } : event
      )
    );
  };

  const toggleFavorite = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, isFavorite: !event.isFavorite } : event
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Career":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
      case "Arts":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200";
      case "Sports":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "Academic":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200";
      case "Cultural":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
    }
  };

  const todayEvents = events.filter(e => e.timing === "today");
  const upcomingEvents = events.filter(e => e.timing === "upcoming");
  const favoriteEvents = events.filter(e => e.isFavorite);
  const activeFriends = friends.filter(f => f.status === "active");
  const pendingFriends = friends.filter(f => f.status === "pending");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 text-white px-6 py-8">
        <h1 className="text-white mb-1">Social Hub</h1>
        <p className="text-purple-100">Discover and join campus events</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Events Section with nested dropdowns */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setEventsOpen(!eventsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="dark:text-white">Events</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-xs">
                  {events.length}
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
              {/* Today Events */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setTodayOpen(!todayOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Today</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                        {todayEvents.length}
                      </div>
                    </div>
                    {todayOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {todayOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {todayEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900 dark:text-white">{event.title}</p>
                            <Badge className={`${getCategoryColor(event.category)} mt-1`}>
                              {event.category}
                            </Badge>
                          </div>
                          {event.rsvped && (
                            <Check className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRSVP(event.id)}
                          size="sm"
                          className="w-full mt-2"
                        >
                          {event.rsvped ? "Cancel RSVP" : "RSVP"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>

              {/* Upcoming Events */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setUpcomingOpen(!upcomingOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Upcoming</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs">
                        {upcomingEvents.length}
                      </div>
                    </div>
                    {upcomingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {upcomingOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900 dark:text-white">{event.title}</p>
                            <Badge className={`${getCategoryColor(event.category)} mt-1`}>
                              {event.category}
                            </Badge>
                          </div>
                          {event.rsvped && (
                            <Check className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRSVP(event.id)}
                          size="sm"
                          className="w-full mt-2"
                        >
                          {event.rsvped ? "Cancel RSVP" : "RSVP"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>

              {/* Favorite Events */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setFavoriteOpen(!favoriteOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">Favorite</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-600 dark:bg-pink-500 text-white text-xs">
                        {favoriteEvents.length}
                      </div>
                    </div>
                    {favoriteOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {favoriteOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {favoriteEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-900 dark:text-white">{event.title}</p>
                        <Badge className={`${getCategoryColor(event.category)} mt-1`}>
                          {event.category}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            </CardContent>
          )}
        </Card>

        {/* Groups Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setGroupsOpen(!groupsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="dark:text-white">Groups</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs">
                  {groups.length}
                </div>
              </div>
              {groupsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {groupsOpen && (
            <CardContent className="space-y-3">
              {groups.map((group) => (
                <div key={group.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 dark:text-white">{group.name}</p>
                    <Badge variant="secondary">{group.members} members</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{group.description}</p>
                  <Button size="sm" className="w-full mt-3">View Group</Button>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Friends Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setFriendsOpen(!friendsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="dark:text-white">Friends</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 dark:bg-green-500 text-white text-xs">
                  {friends.length}
                </div>
              </div>
              {friendsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {friendsOpen && (
            <CardContent className="space-y-3">
              {/* Search Friends */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setSearchFriendsOpen(!searchFriendsOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      <p className="text-gray-900 dark:text-white">Search Friends</p>
                    </div>
                    {searchFriendsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {searchFriendsOpen && (
                  <CardContent className="pt-0">
                    <input
                      type="text"
                      placeholder="Search by name..."
                      className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                    <div className="mt-3 space-y-2">
                      {activeFriends.map((friend) => (
                        <div key={friend.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="text-gray-900 dark:text-white">{friend.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Pending Requests */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setPendingRequestsOpen(!pendingRequestsOpen)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <p className="text-gray-900 dark:text-white">Pending Requests</p>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 dark:bg-orange-500 text-white text-xs">
                        {pendingFriends.length}
                      </div>
                    </div>
                    {pendingRequestsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {pendingRequestsOpen && (
                  <CardContent className="space-y-2 pt-0">
                    {pendingFriends.map((friend) => (
                      <div key={friend.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                        <p className="text-gray-900 dark:text-white">{friend.name}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Accept</Button>
                          <Button size="sm" variant="ghost">Decline</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>

              {/* Social Media */}
              <Card className="dark:bg-gray-700/50">
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setSocialMediaOpen(!socialMediaOpen)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 dark:text-white">Social Media</p>
                    {socialMediaOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {socialMediaOpen && (
                  <CardContent className="space-y-2 pt-0">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Facebook className="w-4 h-4" />
                      Connect Facebook
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Instagram className="w-4 h-4" />
                      Connect Instagram
                    </Button>
                  </CardContent>
                )}
              </Card>
            </CardContent>
          )}
        </Card>

        {/* Clubs Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setClubsOpen(!clubsOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="dark:text-white">Clubs</CardTitle>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-600 dark:bg-pink-500 text-white text-xs">
                  {clubs.length}
                </div>
              </div>
              {clubsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {clubsOpen && (
            <CardContent className="space-y-3">
              {clubs.map((club) => (
                <div key={club.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 dark:text-white">{club.name}</p>
                    <Badge variant="secondary">{club.members} members</Badge>
                  </div>
                  <Badge className="mb-3">{club.category}</Badge>
                  <Button size="sm" className="w-full">Join Club</Button>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
