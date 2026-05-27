import { create } from 'zustand'

const useEditorStore = create((set, get) => ({
  // Selected template
  selectedTemplate: null,
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  // Active theme
  activeTheme: 'cream',
  setActiveTheme: (theme) => set({ activeTheme: theme }),

  // Text field values
  textFields: {
    headline: '',
    subheadline: '',
    body: '',
    cta: 'Learn More',
    date: '',
    personName: '',
    personRole: '',
  },
  setTextField: (field, value) => set((state) => ({
    textFields: { ...state.textFields, [field]: value }
  })),

  // Selected assets
  selectedHeadshot: null,
  setSelectedHeadshot: (headshot) => set({ selectedHeadshot: headshot }),

  // Custom uploaded photo (dataURL or blob URL)
  customHeadshotUrl: null,
  setCustomHeadshotUrl: (url) => set({ customHeadshotUrl: url }),

  selectedLogo: null,
  setSelectedLogo: (logo) => set({ selectedLogo: logo }),

  selectedBadge: null,
  setSelectedBadge: (badge) => set({ selectedBadge: badge }),

  // Reset editor state
  resetEditor: () => set({
    activeTheme: 'cream',
    textFields: { headline: '', subheadline: '', body: '', cta: 'Learn More', date: '', personName: '', personRole: '' },
    selectedHeadshot: null,
    customHeadshotUrl: null,
    selectedLogo: null,
    selectedBadge: null,
  }),
}))

export default useEditorStore
