"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AnalysisContextType {
    analysisId: string | null;
    setAnalysisId: (id: string | null) => void;
    skills: any | null;
    setSkills: (skills: any | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
    const [analysisId, setAnalysisIdState] = useState<string | null>(null);
    const [skills, setSkills] = useState<any | null>(null);

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem("skillsense_analysis_id");
        if (saved) setAnalysisIdState(saved);

        const savedSkills = localStorage.getItem("skillsense_skills");
        if (savedSkills) setSkills(JSON.parse(savedSkills));
    }, []);

    const setAnalysisId = (id: string | null) => {
        setAnalysisIdState(id);
        if (id) {
            localStorage.setItem("skillsense_analysis_id", id);
        } else {
            localStorage.removeItem("skillsense_analysis_id");
        }
    };

    const updateSkills = (newSkills: any | null) => {
        setSkills(newSkills);
        if (newSkills) {
            localStorage.setItem("skillsense_skills", JSON.stringify(newSkills));
        } else {
            localStorage.removeItem("skillsense_skills");
        }
    };

    return (
        <AnalysisContext.Provider value={{ analysisId, setAnalysisId, skills, setSkills: updateSkills }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (context === undefined) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
}
