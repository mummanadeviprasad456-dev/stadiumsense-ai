import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock SpeechSynthesis
class MockSpeechSynthesisUtterance {
  text: string = ''
  lang: string = 'en-US'
  rate: number = 1
  pitch: number = 1
  volume: number = 1
  onstart: (() => void) | null = null
  onend: (() => void) | null = null
  onerror: (() => void) | null = null
  constructor(text?: string) {
    if (text) this.text = text
  }
}

const mockSpeechSynthesis = {
  speak: vi.fn((utterance: SpeechSynthesisUtterance) => {
    if (utterance.onstart) utterance.onstart({} as SpeechSynthesisEvent)
    setTimeout(() => {
      if (utterance.onend) utterance.onend({} as SpeechSynthesisEvent)
    }, 10)
  }),
  cancel: vi.fn(),
  paused: false,
  pending: false,
  speaking: false,
}

globalThis.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance as unknown as typeof SpeechSynthesisUtterance
Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
  writable: true,
})

// Mock SpeechRecognition
class MockSpeechRecognition {
  lang: string = 'en-US'
  interimResults: boolean = false
  maxAlternatives: number = 1
  onresult: ((e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null = null
  onerror: (() => void) | null = null
  onend: (() => void) | null = null
  start = vi.fn()
  stop = vi.fn()
}

Object.defineProperty(window, 'SpeechRecognition', {
  value: MockSpeechRecognition,
  writable: true,
})

Object.defineProperty(window, 'webkitSpeechRecognition', {
  value: MockSpeechRecognition,
  writable: true,
})

// Mock Alert
window.alert = vi.fn()
