import { BlogsCard } from "./blogs-card";

export const LatestArticles = () => {
  const articles = [
    {
      title: "Top 3 Drills to Boost Your Speed Before a Trial",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta nisl sed pretium sodales. Donec ut elit vitae enim mollis euismod suspendisse pellentesque...",
      image: "/blogs/blog1.png",
    },
    {
      title: "Next Trials Announced: 2025 UK Schedule",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta nisl sed pretium sodales. Donec ut elit vitae enim mollis euismod suspendisse pellentesque...",
      image: "/blogs/blog2.png",
    },
    {
      title: "5 Ways to Stand Out at Your Next Football Trial",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta nisl sed pretium sodales. Donec ut elit vitae enim mollis euismod suspendisse pellentesque...",
      image: "/blogs/blog3.png",
    },
  ];

  return (
    <div className="min-h-[600px] py-16 max-w-7xl mx-auto w-full flex flex-col items-center">
      <h1 className="text-primary text-5xl">Latest Articles</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar
        blandit elit, vel sagittis eros posuere nec. In hac habitasse platea
        dictumst. Pellentesque volutpat nulla et diam dignissim tempor.
      </p>
      <div className="grid grid-cols-1 pt-12 pb-4 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-4 px-2 ">
        {articles.map((blog, index) => {
          return (
            <BlogsCard
              key={index}
              title={blog.title}
              description={blog.description}
              image={blog.image}
            />
          );
        })}
      </div>
    </div>
  );
};
