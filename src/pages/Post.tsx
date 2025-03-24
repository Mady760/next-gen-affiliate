import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Tag, Share2, Bookmark, ThumbsUp, User } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

const postData = {
  title: 'The Ultimate Guide to Affiliate Marketing in 2023',
  slug: 'ultimate-guide-affiliate-marketing',
  author: {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1570295999680-5e2718d97922?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  publishDate: '2023-08-15',
  readTime: '12 min read',
  category: 'Affiliate Marketing',
  tags: ['affiliate marketing', 'online business', 'marketing strategy'],
  content: `
    <p>Affiliate marketing has become a popular way for individuals and businesses to generate revenue online. In this comprehensive guide, we'll explore the ins and outs of affiliate marketing, providing you with the knowledge and strategies you need to succeed in 2023.</p>
    
    <h2>What is Affiliate Marketing?</h2>
    <p>Affiliate marketing is a performance-based marketing strategy where you earn a commission for promoting someone else's products or services. As an affiliate, you find a product you enjoy, promote it to others, and earn a piece of the profit for each sale you make.</p>
    
    <h2>Why Choose Affiliate Marketing?</h2>
    <ul>
      <li>Low Startup Costs: You don't need to create your own product.</li>
      <li>Flexibility: Work from anywhere with an internet connection.</li>
      <li>Passive Income: Earn money even while you sleep.</li>
      <li>Wide Range of Products: Promote products you're passionate about.</li>
    </ul>
    
    <h2>Key Strategies for Success</h2>
    <ol>
      <li>Choose the Right Niche: Select a niche that aligns with your interests and has a profitable market.</li>
      <li>Build a Website: Create a professional website or blog to showcase your content and affiliate links.</li>
      <li>Create High-Quality Content: Provide valuable and informative content that resonates with your audience.</li>
      <li>Promote Products Strategically: Use various marketing channels to promote your affiliate products, such as social media, email marketing, and paid advertising.</li>
      <li>Track and Optimize: Monitor your results and make data-driven decisions to improve your performance.</li>
    </ol>
    
    <h2>Conclusion</h2>
    <p>Affiliate marketing can be a lucrative way to earn money online. By following the strategies outlined in this guide and staying up-to-date with the latest trends, you can increase your chances of success in the world of affiliate marketing.</p>
  `,
  featuredImage: 'https://images.unsplash.com/photo-1587828240443-3196c8414173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFmZmlsaWF0ZSUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
};

const Post = () => {
  const { slug } = useParams();

  if (!slug || slug !== postData.slug) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <img src={postData.author.avatar} alt={postData.author.name} className="w-6 h-6 rounded-full mr-2" />
              <span>{postData.author.name}</span>
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(postData.publishDate).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>{postData.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {postData.tags.map((tag) => (
                <Button key={tag} variant="secondary" size="sm">
                  {tag}
                </Button>
              ))}
            </div>
          </header>

          <img src={postData.featuredImage} alt={postData.title} className="w-full rounded-lg mb-6" />

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: postData.content }} />

          <footer className="mt-12 py-4 border-t border-border flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                <ThumbsUp className="w-5 h-5 mr-2" />
                Like
              </Button>
              <Button variant="ghost">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button variant="ghost">
                <Bookmark className="w-5 h-5 mr-2" />
                Save
              </Button>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{postData.author.name}</span>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Post;
