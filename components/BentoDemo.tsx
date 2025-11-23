import { FileTextIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { BellIcon, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedBeamMultipleOutputDemo from "@/components/AnimatedBeamDemo";
import AnimatedListDemo from "@/components/AnimatedListDemo";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";

const gradedAssignments = [
  {
    name: "Biology Essay",
    subject: "Biology",
    grade: "A+",
    score: "95/100",
    body: "Excellent analysis of cellular respiration. Clear diagrams and well-structured arguments.",
  },
  {
    name: "Physics Problem Set",
    subject: "Physics",
    grade: "A",
    score: "88/100",
    body: "Strong understanding of Newton's laws. Minor calculation errors in question 3.",
  },
  {
    name: "Chemistry Lab Report",
    subject: "Chemistry",
    grade: "B+",
    score: "82/100",
    body: "Good experimental procedure. Consider adding more detailed observations.",
  },
  {
    name: "English Composition",
    subject: "English",
    grade: "A-",
    score: "90/100",
    body: "Compelling narrative with strong vocabulary. Watch for comma splices.",
  },
  {
    name: "Math Calculus Quiz",
    subject: "Mathematics",
    grade: "A+",
    score: "98/100",
    body: "Exceptional work on derivatives and integrals. Perfect methodology.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Instant Grading",
    description: "Get your assignments graded in seconds with detailed feedback.",
    href: "#",
    cta: "Try it now",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {gradedAssignments.map((assignment, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {assignment.name}
                </figcaption>
                <p className="text-xs text-gray-500 dark:text-gray-400">{assignment.subject}</p>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {assignment.grade}
              </span>
            </div>
            <blockquote className="mt-2 text-xs text-gray-600 dark:text-gray-300">
              {assignment.body}
            </blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Real-Time Feedback",
    description: "Receive instant notifications when your work is graded and reviewed.",
    href: "#",
    cta: "View feedback",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: BookOpen,
    name: "Multi-Subject Support",
    description: "Biology, Physics, Chemistry, English, Math, and more. All graded accurately.",
    href: "#",
    cta: "See subjects",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
    Icon: TrendingUp,
    name: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "View stats",
    background: (
      <div className="absolute inset-0 flex items-start justify-center pt-16 px-6 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_60%,transparent_100%)]">
        <div className="flex w-full max-w-[200px] flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-gray-500 dark:text-gray-400">This Week</span>
              <span className="font-bold text-green-600 dark:text-green-400">+12%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-500/50"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-gray-500 dark:text-gray-400">Accuracy</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">92%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-gray-500 dark:text-gray-400">Completed</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">47/50</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

