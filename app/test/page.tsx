import TestLoading from "@/components/test-loading"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Loading Screen Test</h1>
        <TestLoading />
      </div>
    </div>
  )
}
