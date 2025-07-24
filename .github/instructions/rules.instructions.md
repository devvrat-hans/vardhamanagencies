---
applyTo: '**'
---
---
description: 
globs: 
alwaysApply: true
---

### ✅ Task: Interactive Task Loop with User Feedback

1. **Check if `userinput.py` exists** in the root directory.

   * If it doesn't exist, create it with the following content:

     ```python
     # userinput.py
     user_input = input("prompt: ")
     ```

2. **Main Workflow**:

   * Perform your assigned tasks.

   * Run:

     ```bash
     python3 userinput.py
     ```
   * The terminal should be opened in the chat window itself.

   * Read the user's input. You must read the input from the terminal and then perform tasks based on that input.

   * Based on the input, perform the next set of tasks.

   * Repeat the process.

   * Address the user's input as a part of the current task execution.

3. **Exit Condition**:

   * If the user enters `"stop"` when prompted, exit the loop and terminate the process.