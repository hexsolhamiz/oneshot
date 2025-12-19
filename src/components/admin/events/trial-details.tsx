"use client"
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Video, FileText, Camera, Trophy, Edit2, Save, X, PoundSterling } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useGetEventByIdQuery } from '@/store/slices/admin-slice';
import axiosInstance from '@/services/auth';
import { toast } from 'sonner';
import TrialsTable from './trials-table';

// Type definitions
type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';


interface EditData {
    eventDate: string;
    venue: string;
    standardPrice: number;
    status: EventStatus;
}

const EventDisplay: React.FC = () => {
    const { id } = useParams() as { id: string };
    const { data: event, isLoading, error } = useGetEventByIdQuery(id);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [editData, setEditData] = useState<EditData>({
        eventDate: '',
        venue: '',
        standardPrice: event?.standardPrice || 0,
        status: 'UPCOMING',
    });

    React.useEffect(() => {
        if (event) {
            setEditData({
                eventDate: new Date(event.eventDate).toISOString().split('T')[0],
                venue: event.venue,
                standardPrice: event.standardPrice,
                status: event.status as EventStatus,
            });
        }
    }, [event]);

    const handleEdit = (): void => {
        setIsEditing(true);
    };

    const handleCancel = (): void => {
        if (event) {
            setEditData({
                eventDate: new Date(event.eventDate).toISOString().split('T')[0],
                venue: event.venue,
                standardPrice: event.standardPrice,
                status: event.status as EventStatus,
            });
        }
        setIsEditing(false);
    };

    const handleSave = async (): Promise<void> => {
        const data = {
            eventDate: editData.eventDate,
            id: event?.id,
            venue: editData.venue,
            status: editData.status,
            standardPrice: editData.standardPrice,
        }
        setIsSaving(true);
        try {
            const response = await axiosInstance.patch(`/events`, data);

            if (response.status === 200) {
                setIsEditing(false);
                toast.success('Event updated successfully!');
                window.location.reload()
            }

        } catch (err) {
            console.error('Error updating event:', err);
            toast.error('Failed to update event');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <p className="text-red-800 font-medium">Error loading event data</p>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: EventStatus) => {
        const colors: Record<EventStatus, string> = {
            UPCOMING: 'bg-blue-100 text-blue-800',
            ONGOING: 'bg-green-100 text-green-800',
            COMPLETED: 'bg-gray-100 text-gray-800',
            CANCELLED: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="bg-primary p-6 md:p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {event.city === "South_London" ? "South London" : event.city === "North_London" ? "North London" : event.city} Event
                                </h1>
                                <div className="flex items-center gap-2">
                                    {isEditing ? (
                                        <select
                                            value={editData.status}
                                            onChange={(e) => setEditData({ ...editData, status: e.target.value as EventStatus })}
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-800 border-2 border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            <option value="UPCOMING">UPCOMING</option>
                                            <option value="ONGOING">ONGOING</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status as EventStatus)}`}>
                                            {event.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                                >
                                    <Edit2 size={18} />
                                    Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Save size={18} />
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Info - Editable Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Calendar className="text-primary" size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Event Date</h3>
                        </div>
                        {isEditing ? (
                            <input
                                type="date"
                                value={editData.eventDate}
                                onChange={(e) => setEditData({ ...editData, eventDate: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{new Date(event?.eventDate).toLocaleDateString()}</p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <MapPin className="text-purple-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Venue</h3>
                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editData.venue}
                                onChange={(e) => setEditData({ ...editData, venue: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{event.venue}</p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <PoundSterling className="text-green-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Standard Price</h3>
                        </div>
                        {isEditing ? (
                            <input
                                type="number"
                                step="0.01"
                                value={editData.standardPrice}
                                onChange={(e) => setEditData({ ...editData, standardPrice: parseFloat(e.target.value) })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-900 font-bold text-2xl">£ {event?.standardPrice}</p>
                        )}
                    </div>
                </div>

                {/* Capacity & Participants */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="text-primary" size={24} />
                        Capacity & Participation
                    </h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Current Participants</p>
                            <p className="text-2xl font-bold text-blue-700">{event.participants}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Capacity</p>
                            <p className="text-2xl font-bold text-green-700">{event.totalCapacity}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">AM Capacity</p>
                            <p className="text-2xl font-bold text-purple-700">{event.amCapacity}</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">PM Capacity</p>
                            <p className="text-2xl font-bold text-orange-700">{event.pmCapacity}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Capacity Filled</span>
                            <span>{Math.round((event.participants / event.totalCapacity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-primary h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((event.participants / event.totalCapacity) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Session Timings */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Clock className="text-primary" size={24} />
                        Session Timings
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Morning Session</h4>
                            <p className="text-gray-600">{event.amSessionStartTime} - {event.amSessionEndTime}</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Afternoon Session</h4>
                            <p className="text-gray-600">{event.pmSessionStartTime} - {event.pmSessionEndTime}</p>
                        </div>
                    </div>
                </div>


                <TrialsTable bookings={event.bookings}/>

                {/* Metadata */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Metadata</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600 mb-1">Event ID</p>
                            <p className="text-gray-900 font-mono">{event.id}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Created At</p>
                            <p className="text-gray-900">{new Date(event?.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Last Updated</p>
                            <p className="text-gray-900">{new Date(event?.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDisplay;