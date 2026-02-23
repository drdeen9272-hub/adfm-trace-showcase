import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

const PhoneMockup = ({ children, className }: PhoneMockupProps) => {
  return (
    <div className={cn("relative mx-auto", className)} style={{ width: 300, height: 600 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2.5rem] border-4 border-foreground/80 bg-foreground/5 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/80 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="absolute inset-1 top-2 rounded-[2rem] bg-card overflow-hidden overflow-y-auto">
          {children}
        </div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-foreground/30 rounded-full" />
    </div>
  );
};

export default PhoneMockup;
