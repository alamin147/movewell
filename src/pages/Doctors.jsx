import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { CalendarIcon, Clock, Video, X } from "lucide-react"
import BottomNavigation from "../components/bottom-navigation"
import ImagePlaceholder from "../components/image-placeholder"
import { useAppointments } from "../context/appointment-context"
import { format } from "date-fns"

// Define doctors with name info that will be used by ImagePlaceholder
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Physiotherapist",
    available: ["10:00", "11:00", "14:00", "15:00"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Specialist",
    available: ["09:00", "13:00", "16:00", "17:00"]
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Physical Therapist",
    available: ["09:30", "12:30", "14:30", "16:30"]
  }
];

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [notes, setNotes] = useState("")
  const { appointments, bookAppointment, removeAppointment } = useAppointments()

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      return;
    }
    
    const appointment = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
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
                Book Video Consultation
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
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatAppointmentDate(appointment.date)} at {appointment.time}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => removeAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
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