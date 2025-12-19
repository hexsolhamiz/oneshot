import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 200; // 200KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const signupSchema = z.object({
  // Step 1
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.number().optional(),
  password: z.string().min(6, "Minimum 6 characters"),
  
  // Step 2
  age: z.number().min(10, "Minimum age 10").max(25, "Maximum age 25"),
  nationality: z.string().min(2, "Enter valid nationality"),

  city: z.enum([
    "Manchester", "Liverpool", "Leeds", "Nottingham", "Newcastle",
    "North_London", "South_London", "Bristol", "Birmingham",
  ]),

  dob: z.string().min(1, "Choose a valid date"),

  profileImage: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max size is 200KB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only jpg or png allowed"
    ),

  preferredPosition: z.enum(["GK", "DEF", "MID", "WING", "STR"]),
})


export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})