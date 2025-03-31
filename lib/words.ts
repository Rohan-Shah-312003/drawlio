// Word categories for the game
export const wordCategories = {
  animals: [
    "dog",
    "cat",
    "elephant",
    "giraffe",
    "lion",
    "tiger",
    "zebra",
    "monkey",
    "penguin",
    "kangaroo",
    "koala",
    "panda",
    "dolphin",
    "shark",
    "whale",
    "octopus",
    "butterfly",
    "spider",
    "eagle",
    "owl",
  ],
  objects: [
    "chair",
    "table",
    "lamp",
    "computer",
    "phone",
    "television",
    "book",
    "pencil",
    "scissors",
    "clock",
    "watch",
    "camera",
    "umbrella",
    "glasses",
    "backpack",
    "key",
    "door",
    "window",
    "mirror",
    "bottle",
  ],
  food: [
    "pizza",
    "hamburger",
    "spaghetti",
    "sandwich",
    "taco",
    "sushi",
    "apple",
    "banana",
    "orange",
    "grapes",
    "watermelon",
    "cake",
    "cookie",
    "ice cream",
    "chocolate",
    "coffee",
    "tea",
    "milk",
    "bread",
    "cheese",
  ],
  actions: [
    "running",
    "swimming",
    "jumping",
    "dancing",
    "singing",
    "eating",
    "sleeping",
    "reading",
    "writing",
    "drawing",
    "painting",
    "cooking",
    "laughing",
    "crying",
    "smiling",
    "waving",
    "climbing",
    "falling",
    "flying",
    "driving",
  ],
  mixed: [], // Will be populated with words from all categories
}

// Populate the mixed category
wordCategories.mixed = [
  ...wordCategories.animals,
  ...wordCategories.objects,
  ...wordCategories.food,
  ...wordCategories.actions,
]

// Get random words from a category
export function getRandomWords(category: keyof typeof wordCategories, count: number): string[] {
  const words = [...wordCategories[category]]
  const result: string[] = []

  for (let i = 0; i < count; i++) {
    if (words.length === 0) break

    const randomIndex = Math.floor(Math.random() * words.length)
    result.push(words[randomIndex])
    words.splice(randomIndex, 1)
  }

  return result
}

