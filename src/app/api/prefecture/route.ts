export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_PREF;
  const response = await fetch(
    apiUrl!, {
      method: "GET",
      headers: {
        'X-API-KEY':apiKey!,
        'Content-Type':'application/json;charset=UTF-8'
      }
    }
  );
  console.log("in prefecture api " + response);
  const prefectures = await response.json();
  return Response.json({ prefectures });
}