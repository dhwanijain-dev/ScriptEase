import { create } from 'zustand'

interface PatientInfo {
  name: string
  age: number
}

interface DoctorInfo {
  name: string
  title: string
  license: string
  phone: string
  address: string
}

interface Medicine {
  name: string
  dosage: string
  duration: string
}

interface PrescriptionData {
  medicines: Medicine[]
  advice: string
}

interface PrescriptionState {
  patientInfo: PatientInfo
  doctorInfo: DoctorInfo
  prescriptionData: PrescriptionData
  isRecording: boolean
  isProcessing: boolean
  setPatientInfo: (info: PatientInfo) => void
  setDoctorInfo: (info: DoctorInfo) => void
  updatePrescriptionData: (data: PrescriptionData) => void
  setIsRecording: (isRecording: boolean) => void
  setIsProcessing: (isProcessing: boolean) => void
  startRecording: () => void
  stopRecording: () => void
  savePrescription: () => void
}

export const usePrescriptionStore = create<PrescriptionState>((set) => ({
  patientInfo: {
    name: 'John Doe',
    age: 30,
  },
  doctorInfo: {
    name: 'Dr. John Smith',
    title: 'MD',
    license: '12345',
    phone: '(555) 123-4567',
    address: '123 Medical Center Dr, Suite 100',
  },
  prescriptionData: {
    medicines: [],
    advice: '',
  },
  isRecording: false,
  isProcessing: false,

  setPatientInfo: (info) => set({ patientInfo: info }),
  setDoctorInfo: (info) => set({ doctorInfo: info }),
  updatePrescriptionData: (data) => set({ prescriptionData: data }),
  setIsRecording: (isRecording) => set({ isRecording }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),

  startRecording: () => {
    set({ isRecording: true })
    // Backend integration: Start voice recording
  },

  stopRecording: () => {
    set({ isRecording: false, isProcessing: true })
    // Backend integration: Stop recording and process voice
    // Simulating API call with the new data format
    setTimeout(() => {
      set({
        prescriptionData: {
          medicines: [
            {
              name: 'Paracetamol',
              dosage: '500mg',
              duration: '3 times a day for 5 days'
            },
            {
              name: 'Amoxicillin',
              dosage: '250mg',
              duration: '2 times a day for 7 days'
            }
          ],
          advice: 'Take medicines after meals. Complete the full course of antibiotics.'
        },
        isProcessing: false,
      })
    }, 2000)
  },

  savePrescription: () => {
    // Backend integration: Save prescription
  },
})) 