import AudioBlogSection from "./_/components/AudioBlogSection";
import BlogCommentsSlider from "./_/components/BlogCommentsSlider";
import BlogSlider from "./_/components/BlogSlider";
import BlogStatsSection from "./_/components/BlogStatsSection";
import CourseSection from "./_/components/CourseSection";
import FAQSection from "./_/components/FAQSection";
import HeroSection from "./_/components/HeroSection";
import PersonalBlogSection from "./_/components/PersonalBlogSection";
import PremiumPlans from "./_/components/PremiumPlans";
import TopBloggers from "./_/components/TopBloggers";
import WeeklyPoll from "./_/components/WeeklyPoll";

export const metadata = {
  title: "خانه",
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Personal Blog Section  */}
      <PersonalBlogSection />

      {/* Blog Slider Section */}
      <BlogSlider />

      {/* Top Bloggers Section*/}
      <TopBloggers />

      {/* Premium Plans Section */}
      <PremiumPlans />

      {/* Audio section */}
      <AudioBlogSection />

      {/* Course Section */}
      <CourseSection />

      {/* Blog Comments Slider */}
      <BlogCommentsSlider />

      {/* Blog Stats Section */}
      <BlogStatsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Weekly Poll */}
      <WeeklyPoll />
    </div>
  );
};


// Disable static generation
export const dynamic = "force-dynamic";

export default Home;


