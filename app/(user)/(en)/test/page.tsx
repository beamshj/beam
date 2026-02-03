export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Tailwind Arbitrary Value Test</h1>

     <div className="container">
        {/* Standard classes - should work */}
        <div className="mt-[75px] bg-blue-500 w-32 h-32 mb-4">
          Standard: mt-4
        </div>

        {/* Arbitrary values - testing */}
        <div className="mt-[48px] bg-red-500 w-[200px] h-[100px]">
          Arbitrary: mt-[48px]
        </div>
     </div>
    </div>
  );
}