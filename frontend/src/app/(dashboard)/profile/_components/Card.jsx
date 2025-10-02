import { toPersianDigits } from "@/utils/numberFormatter";
import {
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  comments: ChatBubbleBottomCenterTextIcon,
  users: UserGroupIcon,
  posts: NewspaperIcon,
};

export default function Card({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className="group rounded-2xl bg-secondary-50 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-3 text-secondary-600">
          {Icon && (
            <Icon className="h-6 w-6 text-secondary-400 transition group-hover:text-secondary-500" />
          )}
          <h3 className=" font-semibold tracking-tight">{title}</h3>
        </div>
      </div>

      <div className="px-5 pb-6 pt-4">
        <p className="text-center text-3xl font-bold text-secondary-700">
          {toPersianDigits(value)}
        </p>
      </div>
    </div>
  );
}
