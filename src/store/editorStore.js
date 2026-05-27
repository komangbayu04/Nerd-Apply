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
  },
  setTextField: (field, value) => set((state) => ({
    textFields: { ...state.textFields, [field]: value }
  })),

  // Selected assets
  selectedHeadshot: null,
  setSelectedHeadshot: (headshot) => set({ selectedHeadshot: headshot }),

  selectedLogo: null,
  setSelectedLogo: (logo) => set({ selectedLogo: logo }),

  selectedBadge: null,
  setSelectedBadge: (badge) => set({ selectedBadge: badge }),

  // Canvas fabric instance ref
  fabricCanvas: null,
  setFabricCanvas: (canvas) => set({ fabricCanvas: canvas }),

  // Reset editor state
  resetEditor: () => set({
    activeTheme: 'cream',
    textFields: { headline: '', subheadline: '', body: '', cta: 'Learn More', date: '' },
    selectedHeadshot: null,
    selectedLogo: null,
    selectedBadge: null,
  }),
}))

export default useEditorStore
