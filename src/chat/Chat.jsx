import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";

const Chat = () => {
  const axios = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  // Session data coming from Login as state
  const [session, setSession] = useState(
    location.state?.chatSessions?.[0] || null
  );
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  console.log("Chat session from state:", session);

  // Auto scroll
  // const scrollToBottom = () => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !session) return;

    // Add user message to state
    const userMsg = { id: Date.now(), sender: "User", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await axios.post("/chat/", {
        session_id: session.session_id,
        content: userMsg.content,
      });

      // AI messages from backend
      const aiMessages =
        res.data.messages?.filter((m) => m.sender === "AI") || [];

      // Merge user + AI messages
      setMessages([...updatedMessages, ...aiMessages]);
    } catch (err) {
      console.error("Message send error:", err);
    }
  };

  return (
    <div className="w-full bg-linear-to-br from-green-50 via-white to-green-50">
      <div className="min-h-screen w-9/12 mx-auto p-6 flex flex-col justify-between">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-green-700">
            Introducing Monica
          </h1>
          <p className="text-sm text-green-800 mt-1">
            Ask me about lifestyle, wellbeing, or legal support...
          </p>
        </div>

        {/* Chat area */}
        <div className="flex-1 mt-12 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs p-3 rounded-xl shadow ${
                msg.sender === "User"
                  ? "ml-auto bg-green-200 text-green-900"
                  : "bg-gray-200 text-gray-700"
              }`}>
              {msg.sender === "AI" && (
                <p className="font-semibold text-gray-800 mb-1">ConvergeAI</p>
              )}
              <p className="text-sm">{msg.content}</p>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input bar */}
        <div className="w-full mt-10 flex items-center bg-green-100 rounded-full px-6 py-3 shadow-inner">
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-green-400 hover:bg-green-500 text-white rounded-full px-3.5 py-2 shadow">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
