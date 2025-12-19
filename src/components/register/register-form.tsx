"use client"
import React, { useState } from 'react'
import { StepProgress } from './step-progress'
import { Button } from '../ui/button'
import { Calendar, ChevronDown, ChevronLeft, Loader2 } from 'lucide-react'
import { RegisterMid } from './register-mid'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useGetEventByIdQuery } from '@/store/slices/admin-slice'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'
import axiosInstance from '@/services/auth'


const steps = [
  { title: "Player Information", content: "Enter your basic player details" },
  { title: "Team Selection", content: "Choose your preferred team" },
  { title: "Payment Details", content: "Complete your payment information" },
  { title: "Confirmation", content: "Review and confirm your registration" },
]

const addOns = [
  {
    id: 1,
    title: "Highlight Video Package",
    description: "Get your professional highlight video edited and ready to share with scouts and clubs.",
    price: 49.99,
    image: "/addons/highlight.png",
    isLink: false,
  },
  {
    id: 2,
    title: "Pro Photos",
    description:
      "Receive high-quality action and profile shots from your trial session — perfect for your football CV and social media.",
    price: 39.99,
    image: "/addons/photos.png",
    isLink: false,
  },
  {
    id: 3,
    title: "Pro Player Pack (Bundle)",
    description: "Bundle offer — includes highlight video, pro photos, and player CV creation at a discounted rate.",
    price: 99.99,
    image: "/addons/pro.png",
    isLink: false,
  },
  {
    id: 4,
    title: "Football CV",
    description: "Stand out with a professionally designed CV showcasing your stats, background, and achievements.",
    price: 29.99,
    image: "/addons/cv.png",
    isLink: false,
  },
]

const RegisterForm = () => {
  const { id } = useParams() as { id: string }
  const router = useRouter();
  const { data } = useGetEventByIdQuery(id)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([4])
  const [selectedSession, setSelectedSession] = useState<'AM' | 'PM' | ''>('')
  const user = useSelector((state: RootState) => state.user.user)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const toggleAddOn = (id: number) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const REGISTRATION_FEE = Number(data?.standardPrice) || 49;

  // Calculate add-ons
  const selectedAddOnItems = addOns.filter((addon) => selectedAddOns.includes(addon.id));

  const addOnsTotal = selectedAddOnItems.reduce(
    (sum, addon) => sum + Number(addon.price || 0),
    0
  );

  // Final total (always a number)
  const total = REGISTRATION_FEE + addOnsTotal;

  // Safe formatting
  const formattedTotal = total.toFixed(2);
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }


  const formData = React.useMemo(() => ({
    playerName: `${user?.user.playerProfile.firstName || ''} ${user?.user.playerProfile.lastName || ''}`.trim() || "Player Name",
    city: data?.city || "Manchester",
    date: data?.eventDate
      ? new Date(data.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : "12 November 2025",
    position: user?.user.playerProfile.position || "Midfielder",
  }), [user, data])

// new state added

  const [loading, setLoading] = useState(false)
  const handlePaymentSubmit = async () => {
    setLoading(true)
    if (!agreedToTerms) {
      toast('Please agree to the terms and conditions')
      setLoading(false);
      return
    }

    if (!selectedSession) {
      toast('Please select a session time (AM/PM)')
      setLoading(false)
      return
    }

    // Prepare the booking data
    const bookingData = {
      playerId: user?.user.playerProfile.id,
      eventId: id,
      session: selectedSession,
      totalAmount: parseFloat(formattedTotal),
      services: selectedAddOnItems.map(addon => ({
        serviceId: addon.id,
        serviceName: addon.title,
        price: addon.price
      })),
      registrationFee: REGISTRATION_FEE,
      addOnsTotal: addOnsTotal
    }

    console.log(bookingData);

    try {
      const response = await axiosInstance.post("/booking", bookingData)
      if (response.status === 201) {
        toast.success("Booking Succesfully Created")
        setLoading(false)
        router.push("/")
      }

      else {
        toast.error("Failed to create booking")
        setLoading(false)
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Failed to process booking. Please try again.')
      setLoading(false)
    }
  }
  return (
    <div className='min-h-[600px] w-full'>
      <StepProgress currentStep={currentStep} totalSteps={steps.length} stepTitle={steps[currentStep - 1].title} />

      {currentStep === 1 && (
        <div className="max-w-4xl mx-auto space-y-6 py-12 px-1">
          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-semibold  text-primary">YOUR INFO</h2>
            <p className="text-black text-sm max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare nunc eu felis eleifend porttitor.
              Praesent eu rutrum sem. Pellentesque rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit
              amet vehicula non.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                disabled={true}
                type="text"
                value={`${user?.user.playerProfile.firstName} ${user?.user.playerProfile.lastName}`}
                placeholder="Full Name"
                className="w-full px-6 py-4 rounded-full border-2 border-black focus:border-primary focus:outline-none text-gray-700"
              />
              <div className="relative">
                <input
                  disabled={true}
                  type="text"
                  value={
                    user?.user.playerProfile.age
                  } placeholder="Date of Birth"
                  className="w-full px-6 py-4 rounded-full border-2 border-black focus:border-primary focus:outline-none text-gray-700 pr-12"
                />
                <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                disabled={true}
                value={user?.user.email}
                type="email"
                placeholder="Email Address"
                className="w-full px-6 py-4 rounded-full border-2 border-black focus:border-primary focus:outline-none text-gray-700"
              />
              <input
                disabled={true}
                type="tel"
                value={user?.user.playerProfile.phoneNumber}
                placeholder="Contact Number"
                className="w-full px-6 py-4 rounded-full border-2 border-black focus:border-primary focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleNext}
              className="w-full hover:cursor-pointer max-w-md py-6 rounded-full bg-primary hover:from-purple-800 hover:via-purple-600 hover:to-purple-800 text-white font-semibold text-lg shadow-lg"
            >
              Next: Confirm Trial
            </Button>
          </div>
        </div>
      )}



      {
        currentStep === 2 && (
          <div>
            <div className="max-w-4xl space-y-6 py-8 mx-auto">
              {/* Header */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-primary tracking-wide">SELECT YOUR TRIAL</h2>
                <p className="text-gray-600 text-sm max-w-xl mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare nunc eu felis eleifend porttitor.
                  Praesent eu rutrum sem. Pellentesque rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit
                  amet vehicula non.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Row 1 - Location, Date, Spots */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Location Dropdown - Purple filled */}
                  <div className="relative">
                    <input
                      type="text"
                      value={data?.city}
                      readOnly
                      className="w-full px-6 py-4 rounded-full border-2 bg-primary text-white border-gray-200 text-primary font-medium text-center cursor-pointer focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Date Field */}
                  <div className="relative">
                    <input
                      type="text"
                      value={
                        data?.eventDate
                          ? new Date(data?.eventDate).toISOString().split("T")[0]
                          : ""
                      }
                      readOnly
                      className="w-full px-6 py-4 rounded-full border-2 border-gray-200 text-primary font-medium text-center cursor-pointer focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Spots Left */}
                  <div className="relative">
                    <input
                      type="text"
                      value={`${140 - Number(data?.participants) | 0} Spots Left`}
                      readOnly
                      className="w-full px-6 py-4 rounded-full border-2 border-gray-200 text-primary font-medium text-center cursor-default focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2 - Session Time, Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Session Time Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value as 'AM' | 'PM')}
                      className="w-full px-6 py-4 rounded-full border-2 border-gray-200 text-gray-700 appearance-none cursor-pointer pr-12 focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Session Time: AM / PM</option>
                      <option value="AM">AM Session</option>
                      <option value="PM">PM Session</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                  </div>

                  {/* Position Dropdown */}
                  <div className="relative">
                    <input
                      type="text"
                      value={`Position - ${user?.user.playerProfile.position} `}
                      readOnly
                      className="w-full px-6 py-4 rounded-full border-2 border-gray-200 text-primary font-medium text-center cursor-pointer focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="py-6 px-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="py-6 px-8 hover:cursor-pointer rounded-full bg-primary to-purple-900 hover:from-purple-800 hover:via-purple-600 hover:to-purple-800 text-white font-semibold text-lg shadow-lg"
                >
                  Next: Add-Ons
                </Button>
              </div>
            </div>
          </div>
        )
      }


      {
        currentStep === 3 && (

          <div className="max-w-6xl mx-auto py-12 space-y-6 px-4">
            {/* Header */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-primary tracking-wide">
                ENHANCE YOUR TRIAL EXPERIENCE
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                Enhance Your Trial Experience and showcase your best work by opting for one of our professional{" "}
                media packages designed to make your performance stand out.
              </p>
            </div>

            {/* Add-ons List */}
            <div className="space-y-4">
              {addOns.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    className={`
            flex flex-col md:flex-row 
            md:items-center gap-3 p-0 rounded-lg border-l-4 
            transition-all
            
            ${isSelected
                        ? "border-l-primary border-r-purple-200 border-t-purple-200 border-b-purple-200 bg-gradient-to-r from-purple-100 via-purple-50 to-white"
                        : "border-l-primary border-r-gray-200 border-t-gray-200 border-b-gray-200 bg-white"
                      }
          `}
                  >
                    {/* Image */}
                    <div className="w-full p-0 md:w-[120px] h-32 md:h-24 relative overflow-hidden rounded-md">
                      <Image
                        src={addon.image || "/placeholder.svg"}
                        alt={addon.title}
                        className="object-cover w-full h-full"
                        width={120}
                        height={100}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3
                        className={`font-bold text-primary ${addon.isLink ? "underline" : ""
                          }`}
                      >
                        {addon.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-snug">
                        {addon.description}
                      </p>
                    </div>

                    {/* Price + Select */}
                    <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-2 text-right">
                      {/* Price */}
                      <span className="font-bold text-primary text-lg">
                        £{Number(addon.price).toFixed(2)}
                      </span>

                      {/* Select + Checkbox */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleAddOn(addon.id)}
                          className="text-primary hover:cursor-pointer border-l-primary border-r-primary"
                        >
                          Select
                        </button>

                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleAddOn(addon.id)}
                          className="w-5 h-5 border-2 border-gray-300 rounded accent-primary cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="py-5 px-8 hover:cursor-pointer rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="py-5 px-8 hover:cursor-pointer rounded-full bg-gradient-to-r from-purple-900 via-primary to-purple-900 hover:from-purple-800 hover:via-purple-600 hover:to-purple-800 text-white font-semibold text-lg shadow-lg"
              >
                Next: Payment
              </Button>
            </div>
          </div>

        )
      }


      {
        currentStep === 4 && (
          <div className="space-y-6  mx-2 my-12 max-w-6xl lg:mx-auto">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold  text-primary tracking-wide">SECURE YOUR SPOT</h2>
              <p className="text-black font-semibold">You&apos;re almost done!</p>
              <p className="text-gray-600 text-sm">Confirm your details and complete your payment securely.</p>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="min-h-[400px] flex flex-col-reverse items-center lg:flex-row gap-2">
              {/* Left Side - Payment Methods */}
              <Card className="h-full w-full lg:w-[65%] py-14 flex items-center border-gray-200 rounded-2xl shadow-sm border-2 border-t-primary border-l-primary">
                <CardContent className="flex flex-col items-center justify-center lg:flex-row gap-2 p-6 space-y-6 ">
                  <div className='w-full lg:w-[50%] flex flex-col justify-center gap-4'>
                    <h3 className="text-2xl font-bold text-primary">PAYMENT METHODS</h3>

                    {/* SSL Security Notice */}
                    <div className="flex items-start gap-2">
                      <p className="text-gray-600 text-sm">
                        All payments are protected by SSL encryption and processed through trusted gateways.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        className="mt-1 border-gray-400"
                      />
                      <label htmlFor="terms" className="text-gray-600 text-sm cursor-pointer">
                        I agree to the{" "}
                        <a href="#" className="text-primary underline font-medium">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary underline font-medium">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    {/* Proceed Button */}
                    <Button
                      className="w-full py-6 rounded-full bg-primary hover:cursor-pointer hover:bg-gray-800 text-white font-semibold text-lg"
                      disabled={!agreedToTerms}
                      onClick={handlePaymentSubmit}
                    >
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                      ) : (
                        "Proceed to Payment"
                      )}                    </Button>
                  </div>
                  {/* Payment Illustration */}
                  <div className="w-full lg:w-[50%] flex justify-center py-4">
                    <Image
                      src="/payment/payment.png"
                      alt="Secure payment illustration"
                      className="w-64 h-64 object-contain"
                      width={200}
                      height={200}
                    />
                  </div>

                  {/* Terms Checkbox */}

                </CardContent>
              </Card>

              {/* Right Side - Registration Summary */}
              <Card className="w-full h-full lg:w-[35%] border-2 p-0 border-primary rounded-2xl shadow-sm overflow-hidden">
                <CardHeader className="bg-primary py-4 px-6">
                  <CardTitle className="text-white font-semibold  text-center">
                    Your Registration Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 space-y-4">
                  {/* Player Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Player Name:</span>
                      <span className="font-bold text-primary">{formData.playerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="font-bold text-primary">{formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-bold text-primary">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Position:</span>
                      <span className="font-bold text-primary">{formData.position}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    {/* Registration Fee */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Fee:</span>
                      <span className="font-bold text-primary">£{data?.standardPrice}</span>
                    </div>

                    {/* Selected Add-Ons */}
                    {selectedAddOnItems.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-gray-600">Add-Ons:</span>
                        {selectedAddOnItems.map((addon) => (
                          <div key={addon.id} className="flex justify-between pl-4">
                            <span className="text-gray-500 text-sm">- {addon.title}</span>
                            <span className="font-bold text-primary">£{addon.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t-2 border-purple-200 pt-4">
                    <div className="flex justify-between items-center bg-purple-50 rounded-lg px-4 py-3">
                      <span className="text-primary font-semibold">TOTAL:</span>
                      <span className="font-bold text-primary text-xl">£{formattedTotal}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Previous Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="py-6 px-8 hover:cursor-pointer rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
            </div>
          </div>
        )
      }
      <RegisterMid />

    </div>
  )
}

export default RegisterForm