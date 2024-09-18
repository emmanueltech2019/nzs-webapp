const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="bg-[--background-color]">
            {children}
        </div>
    )
}
export default layout