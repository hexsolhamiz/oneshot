import React, { useState } from 'react';
import { User as UserIcon, Mail, Calendar, Flag, MapPin, Edit2, X, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import axiosInstance from '@/services/auth';
import { toast } from 'sonner';

interface FormData {
  firstName: string;
  lastName: string;
  position: string;
  age: number;
  dateOfBirth: string;
  nationality: string;
}

interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  data?: FormData;
}

export default function ProfileSection() {
  const user = useSelector((state: RootState) => state.user.user);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.user.firstName || '',
    lastName: user?.user.lastName || '',
    position: user?.user.playerProfile?.position || '',
    age: user?.user.playerProfile?.age || 0,
    dateOfBirth: user?.user.playerProfile?.dateOfBirth || '',
    nationality: user?.user.playerProfile?.nationality || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) || 0 : value
    }));

    if (name === 'date_of_birth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setFormData((prev: FormData) => ({
        ...prev,
        age: calculatedAge
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
   
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    console.log(formData);
    try {
      // Using PATCH request with axios instance
      const response = await axiosInstance.patch<UpdateProfileResponse>(
        `/players/${user?.user.playerProfile.id}`,
        formData
      );

      if (response.status === 201) {
        setSuccess(true);
        setIsEditing(false);

        // Clear success message after 3 seconds
        toast.success("Player Updated Successfully")
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      if (err instanceof Error) {
        setError(err.message || 'An error occurred while updating profile');
      } else {
        setError('An error occurred while updating profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    setFormData({
      firstName: user?.user.playerProfile.firstName || '',
      lastName: user?.user.playerProfile.lastName || '',
      position: user?.user.playerProfile?.position || '',
      age: user?.user.playerProfile?.age || 0,
      dateOfBirth: user?.user.playerProfile?.dateOfBirth || '',
      nationality: user?.user.playerProfile?.nationality || ''
    });
    setIsEditing(false);
    setError(null);
  };

  const profileImage: string = user?.user.playerProfile?.imageUrl || user?.user.imageUrl || '/icons/users.png';

  // Guard clause for when user is not loaded
  if (!user) {
    return (
      <div className="min-h-screen py-4 px-4 flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Profile updated successfully!</p>
          </div>
        )}

       

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-primary p-4 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1 shadow-lg flex-shrink-0">
                  <Image
                    src={profileImage || "/icons/users.png"}
                    alt="Player"
                    className="w-full h-full rounded-full object-cover"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-white text-center sm:text-left w-full sm:w-auto">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 px-3 py-1 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 px-3 py-1 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {user?.user.playerProfile.firstName} {user?.user.playerProfile.lastName}
                      </h1>
                      <p className="text-white/90 text-base sm:text-lg mt-1">{user?.user.playerProfile.position}</p>
                    </>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="profileForm"
                    disabled={loading}
                    className="w-full sm:w-auto bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>

            <form id="profileForm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Email */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800 truncate">{user.user.email}</p>
                  </div>
                </div>

                {/* Position */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Position</p>
                    {isEditing ? (
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="GK">Goalkeeper</option>
                        <option value="DEF">Defender</option>
                        <option value="MID">Midfielder</option>
                        <option value="WING">Winger</option>
                        <option value="STR">Striker</option>
                      </select>
                    ) : (
                      <p className="font-medium text-gray-800">{user.user.playerProfile?.position}</p>
                    )}
                  </div>
                </div>

                {/* Age */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Age</p>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                        min={16}
                        max={50}
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{user.user.playerProfile?.age} years</p>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {user.user.playerProfile?.dateOfBirth && new Date(user.user.playerProfile.dateOfBirth).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Nationality */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Flag className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Nationality</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nationality"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{user.user.playerProfile?.nationality}</p>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-800">{user.user.role}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}