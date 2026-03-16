// app/instruments/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function InstrumentsList() {
  const supabase = await createClient();
  
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select("*");
  
  console.log("Supabase response:", { instruments, error });
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-red-800 font-semibold mb-2">Error loading instruments:</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Instruments Collection</h1>
      
      {!instruments || instruments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No instruments found in the database.</p>
          <p className="text-sm text-gray-400 mt-2">Add some instruments to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {instruments.map((instrument) => (
            <div 
              key={instrument.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {instrument.name || 'Unnamed Instrument'}
              </h3>
              {instrument.type && (
                <p className="text-sm text-gray-600 mt-1">Type: {instrument.type}</p>
              )}
              {instrument.description && (
                <p className="text-gray-700 mt-2">{instrument.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InstrumentsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Suspense fallback={
          <div className="bg-white shadow rounded-lg p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        }>
          <InstrumentsList />
        </Suspense>
      </div>
    </div>
  );
}