import TawkToChat from "@/components/Tawk";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="bg-[--background-color]">
            {children}
            {/* <TawkToChat/> */}
        </div>
    )
}
export default layout