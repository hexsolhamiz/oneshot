"use client"
import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Eye, Clock, Loader2, AlertCircle } from 'lucide-react';
import { Booking } from '@/types/booking';
import { useGetBookingsByPlayerIdQuery } from '@/store/slices/player-slice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const TrialsSection = () => {
    const [selectedBooking, setSelectedBooking] = useState<Booking>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);

    const { data: bookings, isLoading, error } = useGetBookingsByPlayerIdQuery(user?.user.playerProfile.id || "");

    const handleViewDetails = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsDialogOpen(true);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">Loading Trials</h2>
                        <p className="text-slate-500">Please wait while we fetch your bookings...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        const errorMessage = (() => {
            if ('status' in error) {
                // FetchBaseQueryError
                if ('error' in error) {
                    return error.error;
                }
                if ('data' in error && typeof error.data === 'object' && error.data !== null) {
                    return JSON.stringify(error.data, null, 2);
                }
                return `Error: ${error.status}`;
            }
            // SerializedError
            return error.message || 'Failed to fetch your bookings';
        })();

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">Error Loading Trials</h2>
                        <p className="text-slate-500 mb-4 whitespace-pre-wrap font-mono text-xs max-w-2xl mx-auto">
                            {errorMessage}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors font-medium"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Empty state
    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <Calendar className="w-12 h-12 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">No Trials Found</h2>
                        <p className="text-slate-500">You haven&apos;t registered for any trials yet.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">My Trials</h1>
                    <p className="text-slate-600">View and manage your trial bookings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white border-primary rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 overflow-hidden"
                        >
                            <div className="bg-primary p-4">
                                <div className="flex items-center justify-between text-white">
                                    <span className="text-xs font-light">Booking #{booking.id}</span>

                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-800">{booking.event.venue}</p>
                                        <p className="text-sm text-slate-500">{booking.event.city}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <p className="text-slate-700">{booking.session} Session</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <p className="text-lg font-bold text-slate-800">Rs. {booking.totalAmount}</p>
                                </div>

                                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Group {booking.groupNumber}</span>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500 mb-2">Services:</p>
                                    <div className="space-y-1">
                                        {booking.services.map((service, idx) => (
                                            <p key={idx} className="text-sm text-slate-700">• {service.serviceName}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleViewDetails(booking)}
                                        className="flex-1 hover:cursor-pointer bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dialog */}
            {isDialogOpen && selectedBooking && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-primary p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold">Trial Details</h2>
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-blue-100">Booking ID: {selectedBooking.id}</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-500 mb-1">Venue</p>
                                    <p className="font-semibold text-slate-800">{selectedBooking.event.venue}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-500 mb-1">City</p>
                                    <p className="font-semibold text-slate-800">{selectedBooking.event.city}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-500 mb-1">Session</p>
                                    <p className="font-semibold text-slate-800">{selectedBooking.session}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-500 mb-1">Group Number</p>
                                    <p className="font-semibold text-slate-800">Group {selectedBooking.groupNumber}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-800 mb-3 text-lg">Services Booked</h3>
                                <div className="space-y-2">
                                    {selectedBooking.services.map((service, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-700">{service.serviceName}</span>
                                            <span className="font-semibold text-slate-800">Rs. {service.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t-2 border-primary pt-4">
                                <div className="flex items-center justify-between text-lg">
                                    <span className="font-semibold text-slate-700">Total Amount</span>
                                    <span className="font-bold text-green-600 text-2xl">Rs. {selectedBooking.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};