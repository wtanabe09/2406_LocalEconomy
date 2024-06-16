export async function GET() {
  const apiKey = 'gUKHh6vlsexr25VIUjkbScSM7BGjtwIwqfit6Q1z';
  const response = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      method: "GET",
      headers: {
        'X-API-KEY':apiKey,
        'Content-Type':'application/json;charset=UTF-8'
      }
    }
  );
  const prefectures = await response.json();
  return Response.json({ prefectures });
}