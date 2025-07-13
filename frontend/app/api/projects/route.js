// Proxy API pour contourner les problèmes CORS
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();
    
    // Copier tous les paramètres de la requête
    for (const [key, value] of searchParams) {
      params.append(key, value);
    }
    
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/projects${params.toString() ? '?' + params.toString() : ''}`;
    
    const response = await fetch(backendUrl);
    
    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    return Response.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
  } catch (error) {
    // Fallback avec données mock
    const mockData = [
      {
        id: 1,
        title: "Portfolio Personnel (Mock)",
        description: "Portfolio moderne avec animations et backend API",
        status: "completed",
        featured: true,
        category: "fullstack",
        demo_url: null,
        github_url: "https://github.com/fidel/portfolio",
        image_url: null,
        technologies: [
          { id: 1, name: "React", color: "#61dafb" },
          { id: 2, name: "Next.js", color: "#000000" },
          { id: 3, name: "FastAPI", color: "#009688" }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    return Response.json(mockData, { status: 200 });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}