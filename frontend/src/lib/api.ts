const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
    uploadResume: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${API_BASE_URL}/upload-resume`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) throw new Error("Upload failed");
        return response.json();
    },

    analyzeSkills: async (analysis_id: string) => {
        const response = await fetch(`${API_BASE_URL}/analyze-skills`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ analysis_id }),
        });
        if (!response.ok) throw new Error("Analysis failed");
        return response.json();
    },

    getGapAnalysis: async (analysis_id: string, target_role: string) => {
        const response = await fetch(`${API_BASE_URL}/gap-analysis`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ analysis_id, target_role }),
        });
        if (!response.ok) throw new Error("Gap analysis failed");
        return response.json();
    },

    getSuggestions: async (analysis_id: string) => {
        const response = await fetch(`${API_BASE_URL}/career-suggestions/${analysis_id}`);
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        return response.json();
    },

    getHistory: async (user_id: string = "guest") => {
        const response = await fetch(`${API_BASE_URL}/analysis-history/${user_id}`);
        if (!response.ok) throw new Error("Failed to fetch history");
        return response.json();
    },
};
