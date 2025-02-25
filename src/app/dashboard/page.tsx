"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import Sidebar from "./Sidebar";
import CreateRoadmapModal from "./CreateRoadmapModal";
import DeleteRoadmapModal from "./DeleteRoadmapModal";
import RoadmapList from "./RoadmapList";
import SuccessModal from "./SuccessModal";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const DashboardPage = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      router.push("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, roadmapsRes] = await Promise.all([
          fetch(`/api/get-user-profile?email=${storedEmail}`),
          fetch(`/api/get-roadmaps?email=${storedEmail}`),
        ]);

        const profileData = await profileRes.json();
        const roadmapsData = await roadmapsRes.json();

        setUserProfile(profileData);
        setRoadmaps(Array.isArray(roadmapsData) ? roadmapsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleGenerateRoadmap = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setErrorMessage(null);

    const userEmail = localStorage.getItem("userEmail");

    try {
      const generateResponse = await axios.get(
        `/api/generate-roadmap?prompt=${aiPrompt}&userEmail=${userEmail}`,
      );
      const generated = generateResponse.data;
      const userProfileResponse = await fetch(
        `/api/get-user-profile?email=${userEmail}`,
      );
      const profileData = await userProfileResponse.json();
      setGeneratedRoadmap({ ...generated, userProfile: profileData });
      setAiPrompt("");
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setErrorMessage("Error generating roadmap");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRoadmap = async () => {
    if (!generatedRoadmap) return;

    try {
      const response = await fetch("/api/save-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roadmap: generatedRoadmap }),
      });

      if (response.ok) {
        setRoadmaps((prev) => [...prev, generatedRoadmap]);
        setShowSuccessModal(true);
        setGeneratedRoadmap(null);
      } else {
        console.error("Failed to save roadmap");
      }
    } catch (error) {
      console.error("Error saving roadmap:", error);
    }
  };

  const handleDeleteRoadmap = async (roadmapId) => {
    try {
      const response = await fetch("/api/remove-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roadmapId }),
      });

      const data = await response.json();

      if (response.ok) {
        setRoadmaps((prevRoadmaps) =>
          prevRoadmaps.filter((roadmap) => roadmap.roadmap_id !== roadmapId),
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    const storedProgress = {};
    roadmaps.forEach((roadmap) => {
      const steps =
        JSON.parse(
          localStorage.getItem(`completedSteps-${roadmap.roadmap_id}`),
        ) || [];
      storedProgress[roadmap.roadmap_id] =
        (steps.length / roadmap.steps.length) * 100;
    });
    setProgressData(storedProgress);
  }, [roadmaps]);

  const handleViewDetails = (roadmap) => {
    router.push(`/dashboard/roadmap/${roadmap.roadmap_id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      <Sidebar
        userProfile={userProfile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`p-6 transition-all duration-300 ${isSidebarOpen ? "md:ml-[345px]" : "md:ml-[115px]"} ml-0`}
      >
        <div className="mb-6 mt-12 flex items-center justify-between md:mt-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Roadmaps
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create New</span>
          </button>
        </div>
        <RoadmapList
          roadmaps={roadmaps}
          progressData={progressData}
          handleViewDetails={handleViewDetails}
          setSelectedRoadmap={setSelectedRoadmap}
          setShowDeleteModal={setShowDeleteModal}
        />
        {/* Modals */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <CreateRoadmapModal
              showModal={showModal}
              setShowModal={setShowModal}
              handleGenerateRoadmap={handleGenerateRoadmap}
              aiPrompt={aiPrompt}
              setAiPrompt={setAiPrompt}
              isGenerating={isGenerating}
              errorMessage={errorMessage}
              generatedRoadmap={generatedRoadmap}
              showSuccessModal={showSuccessModal}
              setShowSuccessModal={setShowSuccessModal}
              handleSaveRoadmap={handleSaveRoadmap}
            />
          </div>
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <DeleteRoadmapModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              handleDeleteRoadmap={handleDeleteRoadmap}
              roadmapId={selectedRoadmap?.roadmap_id}
            />
          </div>
        )}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <SuccessModal
              showSuccessModal={showSuccessModal}
              setShowSuccessModal={setShowSuccessModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <ThemeProvider>
      <DashboardPage />
    </ThemeProvider>
  );
}
