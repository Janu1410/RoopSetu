import { HeroBanner } from "@/components/ui/HeroBanner";

// Mock data for the article
const articleData = {
  title: "10 Essential Tips for Long-Lasting Bridal Makeup",
  subtitle:
    "Ensure your makeup looks flawless from the morning prep to the final dance.",
  backgroundImage:
    "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2000&auto=format&fit=crop",
  author: {
    name: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    date: "Sep 20, 2026",
    readTime: "5 min read",
  },
  content: `
    ## Start with a Blank Canvas
    Before you even think about primer, your skin needs to be perfectly prepped. A solid skincare routine leading up to the big day is non-negotiable. On the morning of your wedding, gently cleanse, exfoliate, and apply a lightweight, hydrating moisturizer. Allow your skincare to fully absorb for at least 15 minutes before starting your makeup.

    ## Primer is Your Best Friend
    A high-quality primer acts as a barrier between your skin and your makeup, giving your foundation something to grip onto. If you have oily skin, opt for a mattifying primer in the T-zone. For dry skin, a hydrating or illuminating primer will work wonders. Don't forget an eyeshadow primer to prevent creasing!

    ## Layering is Key
    The secret to longevity is layering lightweight products rather than applying one thick layer. Apply foundation in thin, even layers, building coverage only where needed. Set liquid and cream products with a light dusting of translucent powder.

    > **Pro Tip:** Use a setting spray between layers, not just at the very end. Spraying after foundation, again after powder, and a final time at the end locks everything in place.

    ## Waterproof Everything
    Weddings are emotional. Tears of joy, sweat from dancing, and humidity can all wreak havoc on your makeup. Waterproof mascara and eyeliner are essential. Consider using a waterproof sealant for your eyeliner if you're prone to smudging.

    ## The Perfect Pout
    To ensure your lipstick lasts through the "I dos" and the first kiss, start by exfoliating your lips. Apply a lip liner over the entire lip, followed by a long-wearing matte lipstick. Blot with a tissue, dust lightly with translucent powder, and apply a second coat of lipstick.

    *By following these essential steps, you can relax and enjoy your special day knowing your makeup will look just as stunning in the final photos as it did when you first applied it.*
  `,
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In a real app, you would fetch the article data based on params.id

  return (
    <article className="min-h-screen bg-white">
      <HeroBanner
        title={articleData.title}
        subtitle={articleData.subtitle}
        backgroundImageUrl={articleData.backgroundImage}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-10 pb-10 border-b border-gray-100">
          <img
            src={articleData.author.avatar}
            alt={articleData.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-900 font-medium">
              {articleData.author.name}
            </p>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <span>{articleData.author.date}</span>
              <span>&bull;</span>
              <span>{articleData.author.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Content - Styled for readability */}
        <div className="prose prose-lg prose-pink max-w-none text-gray-700 leading-relaxed">
          {articleData.content.split("\\n\\n").map((paragraph, index) => {
            if (paragraph.trim().startsWith("##")) {
              return (
                <h2
                  key={index}
                  className="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight"
                >
                  {paragraph.replace("##", "").trim()}
                </h2>
              );
            }
            if (paragraph.trim().startsWith(">")) {
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-pink-500 pl-6 py-2 my-8 bg-pink-50 rounded-r-lg italic text-gray-800"
                >
                  {paragraph
                    .replace(">", "")
                    .replace(/\\*\\*(.*?)\\*\\*/g, "<strong>$1</strong>")
                    .trim()}
                </blockquote>
              );
            }
            if (
              paragraph.trim().startsWith("*") &&
              paragraph.trim().endsWith("*")
            ) {
              return (
                <p
                  key={index}
                  className="italic text-gray-600 mt-8 text-center"
                >
                  {paragraph.replace(/\\*/g, "").trim()}
                </p>
              );
            }
            return (
              <p key={index} className="mb-6">
                {paragraph.trim()}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
