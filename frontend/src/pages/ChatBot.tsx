import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "🌿 Hello! Ask me anything about plants." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await res.json();
      const botMsg: Message = {
        sender: "bot",
        text: data.answer || "🌿 I couldn’t find an answer.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to server." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a14] text-[#e6d9b5] flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-center">
        Floral World AI Chat 🌿
      </h1>

      <div
        className="
          w-full max-w-2xl 
          bg-[#132219] 
          border border-[#2a3c32] 
          rounded-2xl 
          shadow-lg shadow-black/40 
          p-4 
          h-[550px] 
          overflow-y-auto 
          mb-6
        "
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                px-4 py-3 
                rounded-xl max-w-[75%] text-sm leading-relaxed
                ${
                  msg.sender === "user"
                    ? "bg-[#2b4a38] text-[#e6d9b5] border border-[#c3b27d]"
                    : "bg-[#0f1a14] text-[#c3b893] border border-[#2a3c32]"
                }
                shadow-md
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full max-w-2xl flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="
            grow 
            px-4 py-3 
            rounded-xl 
            bg-[#132219] 
            border border-[#2a3c32] 
            text-[#e6d9b5] 
            focus:border-[#c3b27d] 
            outline-none 
            transition
          "
          placeholder="Ask me about your plants..."
        />

        <button
          onClick={sendMessage}
          className="
            px-6 py-3 
            bg-[#1f3a2d] 
            text-[#e6d9b5] 
            border border-[#2b4a38] 
            rounded-xl 
            hover:bg-[#2b4a38] 
            hover:border-[#c3b27d] 
            transition
            cursor-pointer
          "
        >
          Send
        </button>

        <button
          onClick={() => navigate("/home")}
          className="
          
          px-3 py-3 
          bg-[#1f3a2d] 
          text-[#e6d9b5] 
          border border-[#2b4a38]
          rounded-xl 
          hover:bg-[#2b4a38] 
          hover:border-[#c3b27d] 
          transition
          cursor-pointer
          shadow-md
        "
        >
          🏡
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
