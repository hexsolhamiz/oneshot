"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/user-schema";
import z from "zod";
import { useState } from "react";
import { Mail, Phone, User, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import axiosInstance from "@/services/auth";
import { toast } from "sonner";
import { nationalities } from "@/data/nationalites";

type SignupFormData = z.infer<typeof signupSchema>;

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: undefined,
      password: "",
      age: undefined,
      nationality: "",
      city: undefined,
      dob: "",
      profileImage: undefined,
      preferredPosition: undefined,
    },
  });

  const nextStep = async () => {
    const valid = await signupForm.trigger([
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
    ]);

    if (valid) setStep(2);
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oneshot"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload image");
    }
  };

  const submitFinal = signupForm.handleSubmit(async (data) => {
    // Check age requirement
    if (data.age && data.age < 16) {
      toast.error("You must be at least 16 years old to register on this platform.");
      return;
    }

    setLoading(true);

    try {
      let profileImageUrl = undefined;

      // Upload image to Cloudinary if provided
      if (data.profileImage instanceof File) {
        setUploadingImage(true);
        try {
          profileImageUrl = await uploadImageToCloudinary(data.profileImage);
          console.log(profileImageUrl);
          if (!profileImageUrl) {
            toast.error("Failed to retrieve uploaded image URL.");
            throw new Error("Image upload returned no URL");
          }
        } catch (error) {
          toast.error("Failed to upload profile image. Please try again.");
          setLoading(false);
          setUploadingImage(false);
          return;
        }
        setUploadingImage(false);
      }

      // Prepare data for backend with proper field mapping
      const submitData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        age: data.age,
        nationality: data.nationality,
        city: data.city,
        dob: data.dob,
        preferredPosition: data.preferredPosition,
        imageUrl: profileImageUrl,
        role: "PLAYER",
      };

      console.log("Submitting data:", submitData);

      const response = await axiosInstance.post("/users/signup", submitData);
      
      if (response.status === 201) {
        toast.success("Registration successful! Please log in.");
        signupForm.reset();
        setStep(1);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const errorMessage = axiosError.response?.data?.message || "Registration failed. Please try again.";
        toast.error(errorMessage);
      } else if (error && typeof error === 'object' && 'request' in error) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <Form {...signupForm}>
        <div className="space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="grid text-xs grid-cols-2 gap-4">
                <FormField
                  control={signupForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="First name"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Last Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Last name"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid text-xs grid-cols-2 gap-4">
                <FormField
                  control={signupForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your Phone Number"
                            className="pl-10"
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid text-xs grid-cols-1 gap-4">
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent "
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="button" onClick={nextStep} className="w-full mt-4">
                Next
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {/* Age */}
              <FormField
                control={signupForm.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Age (minimum 16)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(value);
                          
                          // Show warning if age is below 16
                          if (!isNaN(value) && value < 16) {
                            toast.error("You must be at least 16 years old to use this platform.");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {field.value && field.value < 16 && (
                      <p className="text-xs text-red-500 mt-1">
                        You must be at least 16 years old to register.
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Nationality */}
              <FormField
                control={signupForm.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nationality</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-xs w-full">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>

                        <SelectContent>
                         {nationalities.map((nat) => (
                          <SelectItem
                            className="text-xs"
                            key={nat.code}
                            value={nat.nationality}
                          >
                            {nat.nationality}
                          </SelectItem>
                        ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs w-full">City</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-xs w-full">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem className="text-xs" value="Manchester">Manchester</SelectItem>
                          <SelectItem className="text-xs" value="Liverpool">Liverpool</SelectItem>
                          <SelectItem className="text-xs" value="Leeds">Leeds</SelectItem>
                          <SelectItem className="text-xs" value="Nottingham">Nottingham</SelectItem>
                          <SelectItem className="text-xs" value="Newcastle">Newcastle</SelectItem>
                          <SelectItem className="text-xs" value="North_London">North London</SelectItem>
                          <SelectItem className="text-xs" value="South_London">South London</SelectItem>
                          <SelectItem className="text-xs" value="Bristol">Bristol</SelectItem>
                          <SelectItem className="text-xs" value="Birmingham">Birmingham</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DOB Calendar */}
              <FormField
                control={signupForm.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Profile Image */}
              <FormField
                control={signupForm.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                    {uploadingImage && (
                      <p className="text-xs text-blue-500 mt-1">Uploading image...</p>
                    )}
                  </FormItem>
                )}
              />

              {/* Preferred Position */}
              <FormField
                control={signupForm.control}
                name="preferredPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Preferred Position
                    </FormLabel>
                    <FormControl>
                      <div className="w-full flex justify-center gap-2">
                        {["GK", "DEF", "MID", "WING", "STR"].map((pos) => (
                          <Button
                            type="button"
                            key={pos}
                            variant={
                              field.value === pos ? "default" : "outline"
                            }
                            onClick={() => field.onChange(pos)}
                            className="px-4 py-2"
                          >
                            {pos}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button 
                type="button"
                onClick={submitFinal}
                className="w-full"
                disabled={loading || uploadingImage}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
                className="w-full"
                disabled={loading}
              >
                Back
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};