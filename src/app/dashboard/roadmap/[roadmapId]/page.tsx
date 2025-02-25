"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "src/app/dashboard/Sidebar";
import RoadmapSteps from "src/app/dashboard/RoadmapSteps";
import ProgressBar from "src/app/dashboard/ProgressBar";

type Roadmap = {
  career_path: string;
  steps: Array<{
    step_id: number;
    title: string;
    description: string;
    resource_links?: string[];
  }>;
};

type UserProfile = {
  name: string;
  email: string;
  username: string;
};

const RoadmapDetails = ({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) => {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const { roadmapId } = use(params);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      router.push("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, roadmapRes] = await Promise.all([
          fetch(`/api/get-user-profile?email=${storedEmail}`),
          fetch(`/api/get-roadmap-details?id=${roadmapId}`),
        ]);

        if (!profileRes.ok) throw new Error("Failed to fetch user profile.");
        if (!roadmapRes.ok) throw new Error("Failed to fetch roadmap details.");

        const profileData: UserProfile = await profileRes.json();
        const roadmapData: Roadmap = await roadmapRes.json();

        setUserProfile(profileData);
        setRoadmap(roadmapData);
        setIsSignedIn(true);

        const storedSteps = localStorage.getItem(`completedSteps-${roadmapId}`);
        if (storedSteps) setCompletedSteps(JSON.parse(storedSteps));
      } catch (err: any) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadmapId, router]);

  const markStepAsDone = (stepId: number) => {
    const updatedSteps = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(updatedSteps);
    localStorage.setItem(
      `completedSteps-${roadmapId}`,
      JSON.stringify(updatedSteps),
    );
  };

  const progress = roadmap
    ? (completedSteps.length / roadmap.steps.length) * 100
    : 0;

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!roadmap) return <div>Roadmap not found!</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        userProfile={userProfile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`mt-12 w-full p-6 transition-all duration-300 ${isSidebarOpen ? "md:ml-[345px]" : "md:ml-[115px] md:mt-0"}`}
      >
        <ProgressBar progress={progress} />

        <RoadmapSteps
          steps={roadmap.steps}
          completedSteps={completedSteps}
          markStepAsDone={markStepAsDone}
        />
      </div>
    </div>
  );
};

export default RoadmapDetails;
