import api from "./api";
import type { Job } from "../types/job";

export async function getJobs() {
    const response = await api.get("/jobs");
    return response.data;
}

export async function createJob(jobData: Omit<Job, "_id" | "user" | "status" | "createdAt" | "updatedAt">) {
    const response = await api.post("/jobs", jobData);
    return response.data;
}

export async function updateJob(id: string, status: string) {
    const response = await api.put(`/jobs/${id}`, {status});
    return response.data;
}

export async function deleteJob(id: string) {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
}