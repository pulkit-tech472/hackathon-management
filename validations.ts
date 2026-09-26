src/app/api/teams/join/route.tsimport { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  problemStatements: z.string().min(10, "Problem statements required"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  maxTeamSize: z.number().min(1).max(10),
  bannerUrl: z.string().url().optional(),
});

export const joinTeamSchema = z.object({
  joinCode: z.string().length(6, "Join code must be exactly 6 characters"),
});

export const submitProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  githubUrl: z.string().url("Must be a valid GitHub URL"),
  liveDemoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  pitchDeckUrl: z.string().url("Must be a valid PDF/Deck URL"),
  eventId: z.string(),
  teamId: z.string(),
});