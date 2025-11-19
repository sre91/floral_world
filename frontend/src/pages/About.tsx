export default function About() {
  return (
    <div className="min-h-screen bg-[#0f1a14] text-[#e6d9b5] px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
        About Floral World 🌿
      </h1>

      <p className="text-center text-[#b9b08d] max-w-2xl mx-auto mb-12 text-lg">
        We believe nature brings peace, joy, and beauty to every home. Floral
        World was created to make plant shopping simple, elegant, and inspiring
        — whether you're a beginner or an expert gardener.
      </p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
          className="bg-[#132219] border border-[#29382f]
                        rounded-2xl p-8 shadow-lg shadow-black/40"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#e6d9b5]">
            🌱 Our Mission
          </h2>
          <p className="text-[#c3b893] leading-relaxed">
            Our mission is to bring the beauty of nature closer to your home.
            Every plant is selected with love and care, ensuring the highest
            quality and freshness when it arrives at your doorstep.
          </p>
        </div>

        <div
          className="bg-[#132219] border border-[#29382f]
                        rounded-2xl p-8 shadow-lg shadow-black/40"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#e6d9b5]">
            🌿 Why Choose Us?
          </h2>
          <ul className="space-y-3 text-[#c3b893]">
            <li>✔ Premium handpicked plants</li>
            <li>✔ Safe & sustainable packaging</li>
            <li>✔ Fast delivery across regions</li>
            <li>✔ Friendly support team</li>
            <li>✔ 100% health guarantee</li>
          </ul>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#e6d9b5]">
          Bringing Nature Home 🌸
        </h2>
        <p className="text-[#c3b893] max-w-xl mx-auto">
          Whether you're building a cozy plant corner or transforming your
          entire space into a green sanctuary, we are here to support your plant
          journey with quality and care.
        </p>
      </div>
    </div>
  );
}
