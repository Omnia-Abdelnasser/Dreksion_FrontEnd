// 1. Interfaces Definitions
export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  lat: number;
  lng: number;
  location: string;
  carType: "automatic" | "manual";
  carModel: string;
  experienceYears: number;
  hourlyRate: number;
  distanceKm?: number;
  bio?: string;
}

export interface Session {
  id: string | number;
  studentName: string;
  instructorName?: string;
  date: string;
  time: string;
  location: string;
  price?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "Upcoming";
}

// --- Chat Interfaces (NEW) ---
export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
}

// 2. Instructor Data
export const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Taha Mohamed",
    avatarUrl: "https://github.com/shadcn.png",
    isVerified: true,
    rating: 4.8,
    reviewsCount: 120,
    lat: 30.0444,
    lng: 31.2357,
    location: "October City",
    carType: "manual",
    carModel: "Toyota Corolla 2022",
    experienceYears: 5,
    hourlyRate: 200,
    distanceKm: 2.5,
    bio: "Professional instructor with extensive experience teaching beginners."
  },
  {
    id: "2",
    name: "Captain Ahmed Ali",
    avatarUrl: "https://github.com/shadcn.png",
    isVerified: false,
    rating: 4.5,
    reviewsCount: 85,
    lat: 30.0131, 
    lng: 30.9876,
    location: "Sheikh Zayed",
    carType: "automatic",
    carModel: "Hyundai Elantra 2023",
    experienceYears: 3,
    hourlyRate: 150,
    distanceKm: 5.8,
    bio: "Specialized in parking skills and driving in heavy traffic."
  }
];

export const instructors = mockInstructors;

export const carTypeLabel: Record<string, string> = {
  manual: "Manual",
  automatic: "Automatic"
};

// 3. Student Progress Data
export const studentLevels = [
  {
    id: 1,
    title: "Driving Basics",
    progress: 100,
    skills: [{ name: "Starting Engine", done: true }]
  },
  {
    id: 2,
    title: "Advanced Skills",
    progress: 45,
    skills: [{ name: "Parallel Parking", done: true }]
  }
];

// 4. All Sessions Data (Consolidated)
export const mockSessions: Session[] = [
  {
    id: "s1",
    studentName: "Ali Mohamed",
    instructorName: "Taha Mohamed",
    date: "2026/04/22",
    time: "10:00 AM",
    location: "October City - District 4",
    price: "200",
    status: "pending",
  },
  {
    id: "s2",
    studentName: "Sara Ahmed",
    instructorName: "Taha Mohamed",
    date: "2026/04/23",
    time: "02:00 PM",
    location: "Sheikh Zayed - Entrance 1",
    price: "200",
    status: "confirmed",
  },
  {
    id: "s3",
    studentName: "Self Student", 
    instructorName: "Taha Mohamed",
    date: "2026/04/20",
    time: "10:00 AM",
    location: "October City",
    status: "Upcoming"
  }
];

// 5. Chat Data (NEW)
export const mockConversations: Conversation[] = [
  {
    id: "c1",
    name: "كريم سامي",
    avatar: "https://i.pravatar.cc/150?u=u1",
    lastMessage: "تمام، نتقابل في المعاد المحدد",
    lastTime: "10:30 ص",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", senderId: "other", text: "يا كابتن، ممكن نأخر حصة بكرة ساعة؟", time: "09:00 ص" },
      { id: "m2", senderId: "me", text: "مفيش مشكلة، نتقابل الساعة 11 بدل 10", time: "10:15 ص" },
      { id: "m3", senderId: "other", text: "تمام، نتقابل في المعاد المحدد", time: "10:30 ص" },
    ]
  },
  {
    id: "c2",
    name: "نور هشام",
    avatar: "https://i.pravatar.cc/150?u=u2",
    lastMessage: "شكراً جداً يا كابتن طه",
    lastTime: "أمس",
    unread: 0,
    online: false,
    messages: [
      { id: "m4", senderId: "other", text: "عايزة أركز بكرة على الركن الموازي", time: "05:00 م" },
      { id: "m5", senderId: "me", text: "أكيد، هنخصص الحصة كلها للركن", time: "06:00 م" },
    ]
  }
];

// Alias to support student-specific imports if needed
export const studentSessions = mockSessions.filter(s => s.status === "Upcoming");

// 6. UI Helpers
export const statusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    completed: "مكتملة",
    cancelled: "ملغاة",
    Upcoming: "قادم"
  };
  return labels[status] || status;
};

export const statusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    confirmed: "bg-green-500/10 text-green-600 border-green-200",
    completed: "bg-blue-500/10 text-blue-600 border-blue-200",
    cancelled: "bg-red-500/10 text-red-600 border-red-200",
    Upcoming: "bg-purple-500/10 text-purple-600 border-purple-200"
  };
  return colors[status] || "bg-gray-500/10 text-gray-600";
};