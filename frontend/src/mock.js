// Mock data for Local LLM Studio

export const mockModels = [
  {
    id: 'llama-3-8b',
    name: 'Llama 3 8B Instruct Q4_0',
    source: 'Hugging Face',
    tags: ['Chat', 'Fast', 'Recommended'],
    downloadSize: '4.2 GB',
    ramNeeded: '6 GB',
    compatibility: 'great',
    installed: true,
    type: 'chat',
    size: 'medium'
  },
  {
    id: 'gemma-7b',
    name: 'Gemma 7B Instruct Q4_K_M',
    source: 'Hugging Face',
    tags: ['Chat', 'High quality'],
    downloadSize: '3.8 GB',
    ramNeeded: '5 GB',
    compatibility: 'great',
    installed: false,
    type: 'chat',
    size: 'medium'
  },
  {
    id: 'codellama-13b',
    name: 'Code Llama 13B Q4_0',
    source: 'Hugging Face',
    tags: ['Coding', 'Specialized'],
    downloadSize: '7.3 GB',
    ramNeeded: '10 GB',
    compatibility: 'good',
    installed: false,
    type: 'coding',
    size: 'large'
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B Instruct v0.2',
    source: 'Hugging Face',
    tags: ['Chat', 'Fast', 'Efficient'],
    downloadSize: '4.1 GB',
    ramNeeded: '6 GB',
    compatibility: 'great',
    installed: true,
    type: 'chat',
    size: 'medium'
  },
  {
    id: 'phi-3-mini',
    name: 'Phi-3 Mini 4K Instruct',
    source: 'Hugging Face',
    tags: ['Chat', 'Fast', 'Compact'],
    downloadSize: '2.3 GB',
    ramNeeded: '4 GB',
    compatibility: 'great',
    installed: false,
    type: 'chat',
    size: 'small'
  },
  {
    id: 'llama-70b',
    name: 'Llama 3 70B Instruct Q4_0',
    source: 'Hugging Face',
    tags: ['Chat', 'High quality', 'Large'],
    downloadSize: '39 GB',
    ramNeeded: '48 GB',
    compatibility: 'heavy',
    installed: false,
    type: 'chat',
    size: 'large'
  }
];

export const mockChats = [
  {
    id: 'chat-1',
    title: 'Python async best practices',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'What are the best practices for using async/await in Python?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'Here are the key best practices for using async/await in Python:\n\n1. **Use `asyncio.run()` for entry points**\n   ```python\n   import asyncio\n   \n   async def main():\n       await some_async_function()\n   \n   asyncio.run(main())\n   ```\n\n2. **Avoid blocking operations** - Use async versions of I/O operations\n\n3. **Use `asyncio.gather()` for concurrent tasks**\n   ```python\n   results = await asyncio.gather(\n       task1(),\n       task2(),\n       task3()\n   )\n   ```\n\n4. **Handle exceptions properly** with try/except blocks\n\n5. **Use async context managers** when available (`async with`)\n\nThese practices will help you write efficient asynchronous Python code!',
        timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString()
      }
    ]
  },
  {
    id: 'chat-2',
    title: 'Explain quantum computing',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'Can you explain quantum computing in simple terms?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: 'Quantum computing uses the principles of quantum mechanics to process information. Here\'s a simple explanation:\n\n**Classical vs Quantum**\n- Classical computers use bits (0 or 1)\n- Quantum computers use qubits (can be 0, 1, or both simultaneously)\n\n**Key Concepts:**\n1. **Superposition** - Qubits can exist in multiple states at once\n2. **Entanglement** - Qubits can be correlated in ways impossible for classical bits\n3. **Interference** - Quantum states can amplify correct answers and cancel wrong ones\n\n**Why it matters:**\nQuantum computers can solve certain problems exponentially faster than classical computers, particularly in:\n- Cryptography\n- Drug discovery\n- Optimization problems\n- Machine learning\n\nThink of it like trying every path through a maze simultaneously, rather than one at a time!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 45).toISOString()
      }
    ]
  },
  {
    id: 'chat-3',
    title: 'Recipe for chocolate cake',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'Give me a simple chocolate cake recipe',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      },
      {
        id: 'msg-6',
        role: 'assistant',
        content: 'Here\'s a delicious and simple chocolate cake recipe:\n\n**Ingredients:**\n- 1¾ cups all-purpose flour\n- 2 cups sugar\n- ¾ cup cocoa powder\n- 2 tsp baking soda\n- 1 tsp baking powder\n- 1 tsp salt\n- 2 eggs\n- 1 cup strong coffee (cooled)\n- 1 cup milk\n- ½ cup vegetable oil\n- 1 tsp vanilla extract\n\n**Instructions:**\n1. Preheat oven to 350°F (175°C)\n2. Mix all dry ingredients in a large bowl\n3. Add eggs, coffee, milk, oil, and vanilla\n4. Beat for 2 minutes until smooth\n5. Pour into greased 9x13 pan\n6. Bake for 30-35 minutes\n7. Let cool before frosting\n\nEnjoy your homemade chocolate cake!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60).toISOString()
      }
    ]
  }
];

export const deviceInfo = {
  ram: '16 GB',
  vram: '6 GB',
  recommendation: 'You can run up to 7B–14B quantized models comfortably'
};

export const defaultSettings = {
  theme: 'light',
  language: 'en',
  defaultModel: 'llama-3-8b',
  maxRamUsage: 75,
  preferSmaller: true,
  gpuAcceleration: true,
  storageUsed: '8.3 GB',
  storageAvailable: '245 GB',
  anonymousStats: false
};
