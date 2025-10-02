import {Spinner} from "@/ui/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center gap-2">
      <span className="text-lg md:text-xl text-secondary-500 ">
        درحال بارگزاری اطلاعات 
      </span>
      <Spinner />
    </div>
  );
}

export default Loading;
