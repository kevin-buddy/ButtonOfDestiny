import { FloatingHearts }    from "@/components/FloatingHearts";
import { InteractiveDateFlow } from "@/components/InteractiveDateFlow";

export default async function HomePage() {
  const apiUrl = process.env.API_URL as string;
  const token = process.env.AUTH_TOKEN as string;
  let config = null;

  if (token) {
    const response = await fetch(`${apiUrl}/buttonofdestiny`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.status === 200) {
      const result = await response.json();
      if (result.data) {
        config = result.data;
      }
    }
  }

  if (!config) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-rose-500">
        Invitation not found!
      </div>
    );
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      {/* Ambient gradient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,209,226,0.6) 0%, rgba(255,245,248,0.9) 60%, #fff5f8 100%)",
        }}
      />

      {/* Decorative components that don't need state can stay here */}
      <FloatingHearts />

      {/* Pass the server-fetched config into the Client Component */}
      <InteractiveDateFlow config={config} />
    </main>
  );
}