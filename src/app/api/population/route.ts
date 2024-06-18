import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prefCode = searchParams.get('prefCode');
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_POPU + `?cityCode=-&prefCode=${prefCode}`;

  const response = await fetch(
    apiUrl!, {
      method: "GET",
      headers: {
        'X-API-KEY':apiKey!,
        'Content-Type':'application/json;charset=UTF-8'
      }
    }
  );
  const populations = await response.json();
  return NextResponse.json({ populations });
}