const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export async function serverFetch(endpoint: string) {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Fetch failed");

    return await res.json();
  } catch (error) {
    console.error("Server fetch error:", endpoint, error);

    // Return safe fallback so build never crashes
    return { data: [] };
  }
}
