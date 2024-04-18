import { cn } from "@/lib/utils";

interface CalloutProps {
    children?: React.ReactNode,
    type: "default" | "warning" | "danger",
}

export function Callout({
    children,
    type = "default",
    ...props
}: CalloutProps) {
    return <div className={cn("my-6 items-start rounded-md border border-l-4 p-4 w-full dark:mark-w-none", {
        "border-red-900 bg-red-50 dark:prose": type === "danger",
        "border-yello-900 bg-yellow-50 dark:prose": type === "warning",
    })}
        {...props}
    >
        <div className="">{children}</div>
    </div>
}