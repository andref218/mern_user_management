import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ text = "Loading...", size = 32, inline = false }) => {
  if (inline) {
    return (
      <Loader2 className="animate-spin" style={{ width: size, height: size }} />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Loader2
        className={`animate-spin mb-3`}
        style={{ width: size, height: size }}
      />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
