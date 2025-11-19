import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields before submitting.");
      return;
    }

    alert("🌿 Your message has been sent successfully!");

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0f1a14] text-[#e6d9b5] px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
        Contact Us 🌿
      </h1>

      <p className="text-center text-[#b9b08d] max-w-2xl mx-auto mb-12 text-lg">
        Have a question or need plant advice? We're always here to help you grow
        your green space.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#132219] p-10 rounded-2xl 
                   border border-[#29382f] shadow-lg shadow-black/40"
      >
        <div className="mb-5">
          <label className="block mb-2 text-[#c3b893]">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0f1a14] border border-[#2c3e34]
                       text-[#e6d9b5] focus:border-[#c3b27d] outline-none transition"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-[#c3b893]">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0f1a14] border border-[#2c3e34]
                       text-[#e6d9b5] focus:border-[#c3b27d] outline-none transition"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-[#c3b893]">Message</label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0f1a14] border border-[#2c3e34]
                       text-[#e6d9b5] focus:border-[#c3b27d] outline-none transition"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="
            w-full py-3 mt-3 
            bg-[#1f3a2d] 
            text-[#e6d9b5] 
            border border-[#2b4a38]
            rounded-xl 
            hover:border-[#c3b27d] 
            hover:bg-[#2b4a38] 
            transition
            cursor-pointer
          "
        >
          Send Message
        </button>
      </form>

      <div className="text-center mt-14 text-[#b9b08d]">
        <p>Email: floralworld@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p className="mt-2 opacity-80">We usually respond within 24 hours 🌱</p>
      </div>
    </div>
  );
}
