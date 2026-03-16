// app/instruments/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function InstrumentsList() {
  const supabase = await createClient();
  
  // Add error handling
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select("*");
  
  // Log for debugging (you'll see this in your terminal)
  console.log("Supabase response:", { instruments, error });
  
  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <h2>Error loading instruments:</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Instruments</h1>
      {!instruments || instruments.length === 0 ? (
        <p>No instruments found in the database.</p>
      ) : (
        <pre>{JSON.stringify(instruments, null, 2)}</pre>
      )}
    </div>
  );
}

export default function InstrumentsPage() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsList />
    </Suspense>
  );
}