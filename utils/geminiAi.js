
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey ="AIzaSyAkLKfxgdG8i9SJuqFf_HdoaWCy3KMSGnU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// async function run() {
export const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
            role: "user",
            parts: [
                { text: "" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"question\": \"Describe your experience with React.js, including any specific libraries or frameworks you've worked with.\",\n    \"answer\": \"I have two years of experience developing React applications. I am proficient in core React concepts like components, props, state, and lifecycle methods. I've also worked with popular libraries like Redux for state management, React Router for navigation, and styled-components for styling. I've built both single-page applications and complex web interfaces using React, demonstrating my ability to handle diverse project needs.\"\n  },\n  {\n    \"question\": \"Explain the difference between `props` and `state` in React.\",\n    \"answer\": \"Props and state are both essential for managing data in React components. Props are read-only values passed from a parent component to a child component. They are used to configure the child component's behavior and appearance. State, on the other hand, is internal data managed within the component itself. It can change over time, triggering re-renders of the component to reflect the updated state.\"\n  },\n  {\n    \"question\": \"How would you optimize a React application for performance?\",\n    \"answer\": \"Performance optimization is crucial for a good user experience. I would use techniques like memoization to prevent unnecessary re-renders, implement lazy loading to improve initial page load times, and use tools like React Profiler to identify performance bottlenecks. I would also strive to minimize the use of complex state management structures and ensure efficient data fetching strategies to keep the application responsive.\"\n  },\n  {\n    \"question\": \"Describe a challenging React project you worked on and how you overcame the challenges.\",\n    \"answer\": \"In a recent project, I had to build a dynamic data visualization tool with complex user interactions. The challenge was ensuring smooth performance and responsiveness while handling large datasets. I overcame this by implementing a combination of techniques, including virtualization for rendering large lists efficiently, memoization for optimizing complex calculations, and a well-structured data fetching strategy to avoid performance bottlenecks. The result was a highly performant and interactive tool that met all user requirements.\"\n  },\n  {\n    \"question\": \"What are some of the latest trends or advancements in React development that you are interested in?\",\n    \"answer\": \"I'm constantly exploring new trends in React. I'm particularly interested in server-side rendering with Next.js for improved SEO and performance, as well as the growing adoption of React hooks for managing state and side effects. I also keep up with the latest updates and best practices from the React community to ensure my skills remain current.\"\n  }\n]\n```" },
            ],
        },
    ],
});
