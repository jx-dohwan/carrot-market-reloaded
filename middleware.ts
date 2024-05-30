import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("hello");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
// 웹사이트의 모든 request하나마다 middleware가 실행된다.