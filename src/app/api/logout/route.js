// /app/api/logout/route.js
export async function POST() {
    // Clear server-side session if implemented, else just return success
    return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
  }
  