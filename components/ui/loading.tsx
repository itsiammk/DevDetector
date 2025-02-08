export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-gray-900 ">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }