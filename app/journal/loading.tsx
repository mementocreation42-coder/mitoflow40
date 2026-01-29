export default function Loading() {
    return (
        <div className="max-w-[1000px] mx-auto px-4 py-12 md:py-24">
            <div className="text-center mb-8">
                <div className="h-12 w-64 mx-auto bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-6 w-48 mx-auto bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="h-12 mb-12 bg-gray-200 rounded animate-pulse" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-full flex flex-col">
                        <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-4 animate-pulse" />
                        <div className="flex-1">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                            <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3" />
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
