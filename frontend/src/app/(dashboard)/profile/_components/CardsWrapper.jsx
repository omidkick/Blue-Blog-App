import { fetchCardData } from "@/services/data";
import Card from "./Card";

async function CardsWrapper() {
  const { numberOfUsers, numberOfComments, numberOfPosts } =
    await fetchCardData();

  // Latency(For test)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="نظرات" value={numberOfComments} type="comments" />
      <Card title="پست‌ها" value={numberOfPosts} type="posts" />
    </div>
  );
}

export default CardsWrapper;
