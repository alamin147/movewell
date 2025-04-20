import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { CalendarIcon, Clock, Video, X, Phone } from "lucide-react"
// import { Mic, Video } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import ImagePlaceholder from "../components/image-placeholder"
import { useAppointments } from "../context/appointment-context"
import { format } from "date-fns"
import { Link } from "react-router-dom"

// Import doctors data from JSON file
import doctorsData from "../data/doctors.json"

// Import doctor profile images
import drSarahImg from "../assets/doctors/doc-1.jpeg"
import drMichaelImg from "../assets/doctors/doc-2.jpeg"
import drEmilyImg from "../assets/doctors/doc-3.jpeg"

// Create an image map for the doctors
const doctorImageMap = {
  1: drSarahImg,
  2: drMichaelImg,
  3: drEmilyImg
}

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [notes, setNotes] = useState("")
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [currentCall, setCurrentCall] = useState(null)
  const { appointments, bookAppointment, removeAppointment } = useAppointments()
  
  // Load doctors from JSON file
  const [doctors, setDoctors] = useState([])
  
  // Load doctors from JSON when component mounts
  useEffect(() => {
    // Add profile images to the doctors data
    const doctorsWithImages = doctorsData.doctors.map(doctor => ({
      ...doctor,
      profileImage: doctorImageMap[doctor.id]
    }));
    setDoctors(doctorsWithImages);
  }, [])

  // Check if appointment is happening now (for demo purposes, consider any appointment from today as "now")
  const isAppointmentNow = (appointment) => {
    const today = new Date().toISOString().split('T')[0];
    return appointment.date === today;
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      return;
    }
    
    const appointment = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorImage: selectedDoctor.profileImage,
      date: selectedDate,
      time: selectedTime,
      notes: notes
    };
    
    const success = bookAppointment(appointment);
    
    if (success) {
      // Reset the form
      setShowBookingForm(false);
      setSelectedDoctor(null);
      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
    }
  }

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const startBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const startVideoCall = (appointment) => {
    setCurrentCall(appointment);
    setShowVideoCall(true);
  };

  const endVideoCall = () => {
    setShowVideoCall(false);
    setCurrentCall(null);
  };

  if (showVideoCall && currentCall) {
    return (
      <div className="flex flex-col h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            Call with {currentCall.doctorName}
          </h1>
          <div className="text-white bg-gray-700 px-2 py-1 rounded text-sm">
            00:05:32
          </div>
        </header>

        {/* Main video area */}
        <main className="flex-1 relative">
          {/* Doctor video (large) */}
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <ImagePlaceholder 
                width={800} 
                height={600} 
                text={currentCall.doctorName} 
                imageSrc={currentCall.doctorImage}
              />
            </div>
          </div>
          
          {/* User video (small overlay) */}
          <div className="absolute bottom-4 right-4 w-32 h-48 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
            <ImagePlaceholder 
              width={128} 
              height={192} 
              text="You" 
            />
          </div>
        </main>

        {/* Controls */}
        <footer className="bg-gray-800 p-4">
          <div className="flex items-center justify-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full p-3 h-14 w-14 bg-gray-700 hover:bg-gray-600"
            >
              <Mic className="h-6 w-6 text-white" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full p-3 h-14 w-14 bg-gray-700 hover:bg-gray-600"
            >
              <Video className="h-6 w-6 text-white" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full p-3 h-14 w-14 bg-red-600 hover:bg-red-700"
              onClick={endVideoCall}
            >
              <Phone className="h-6 w-6 text-white" />
            </Button>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Doctor Appointments</h1>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20">
        {showBookingForm ? (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Book Appointment</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowBookingForm(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImagePlaceholder 
                    width={48} 
                    height={48} 
                    text={selectedDoctor?.name} 
                    imageSrc={selectedDoctor?.profileImage}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedDoctor?.name}</h3>
                  <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Available Times</Label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDoctor?.available.map((time, i) => (
                    <Button
                      key={i}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="justify-center"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input 
                  id="notes" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific concerns or issues..."
                />
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
              >
                <Video className="h-5 w-5 mr-2" /> Book Video Consultation
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <section className="space-y-3">
              <h2 className="text-lg font-medium">Your Appointments</h2>
              {appointments.length === 0 ? (
                <Card className="p-4 text-center text-gray-500">
                  No upcoming appointments
                </Card>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImagePlaceholder 
                            width={48} 
                            height={48} 
                            text={appointment.doctorName} 
                            imageSrc={appointment.doctorImage || doctorImageMap[appointment.doctorId]}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatAppointmentDate(appointment.date)} at {appointment.time}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {isAppointmentNow(appointment) && (
                            <Button 
                              variant="default" 
                              size="sm"
                              className="flex items-center bg-green-600 hover:bg-green-700"
                              onClick={() => startVideoCall(appointment)}
                            >
                              <Phone className="h-3 w-3 mr-1" /> Join Call
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center"
                            onClick={() => removeAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium">Available Specialists</h2>
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <ImagePlaceholder 
                          width={56} 
                          height={56} 
                          text={doctor.name} 
                          imageSrc={doctor.profileImage}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      </div>
                      <Button 
                        className="flex items-center bg-blue-600 hover:bg-blue-700"
                        onClick={() => startBooking(doctor)}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Book
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <BottomNavigation currentPath="/doctors" />
    </div>
  )
}