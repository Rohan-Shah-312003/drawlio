export interface Player {
  id: string
  name: string
  score: number
  isDrawing: boolean
  isReady?: boolean
}

export interface Message {
  id: string
  player: string
  text: string
  isGuess?: boolean
  isCorrect?: boolean
  timestamp: number
}

export interface GameState {
  roomId: string
  roomName: string
  players: Player[]
  messages: Message[]
  currentDrawer?: string
  currentWord?: string
  timeLeft: number
  round: number
  totalRounds: number
  status: "waiting" | "selecting" | "drawing" | "roundEnd" | "gameEnd"
}

// Initial game state factory
export function createInitialGameState(roomId: string, roomName: string): GameState {
  return {
    roomId,
    roomName,
    players: [],
    messages: [],
    timeLeft: 0,
    round: 0,
    totalRounds: 3,
    status: "waiting",
  }
}

// In a real app, this would be managed by the server
// For now, we'll use this to simulate game state updates
export function updateGameState(state: GameState, updates: Partial<GameState>): GameState {
  return {
    ...state,
    ...updates,
  }
}

