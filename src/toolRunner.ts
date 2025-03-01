import type OpenAI from "openai";

const getWeather = () => "Very cold, -20°C";

export const runTool = async (toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall, userMessage: string) => {

    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
    }

    switch (toolCall.function.name) {
        case "get_weather":
            return getWeather();
        default:
            throw new Error(`Unknown tool: ${toolCall.function.name}`);
    }
};
