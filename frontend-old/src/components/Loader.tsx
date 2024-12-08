export default function Loader() {
    return (
      <div className="flex items-center justify-center h-full pt-[200px] bg-transparent">
        <div className="relative">
          <div className="w-16 h-16 border-8 border-t-8 border-purple-300 border-opacity-60 rounded-full animate-pulse"></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold"></span>
        </div>
      </div>
    );
}
  