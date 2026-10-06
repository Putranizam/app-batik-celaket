import { NextResponse, type NextRequest } from "next/server";

// Rute umum yang dilindungi autentikasi
const generalProtectedRoutes = [
  "/profil",
  "/pengaturan-akun",
  "/pesanan",
  "/checkout",
];

// Rute khusus admin
const adminProtectedRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = adminProtectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isGeneralProtectedRoute = generalProtectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const sessionCookie = request.cookies.get("session_user")?.value;
  const tokenCookie = request.cookies.get("token")?.value;

  let sessionData: { id?: string; role?: string } | null = null;
  if (sessionCookie) {
    try {
      sessionData = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      sessionData = { role: sessionCookie };
    }
  }

  // 1. Cek rute khusus Admin (/admin/*)
  if (isAdminRoute) {
    // Jika tidak ada sesi sama sekali -> redirect ke /login
    if (!sessionData && !tokenCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role checking untuk rute Admin:
    // Hanya role SUPER_ADMIN atau admin yang boleh mengakses.
    // Jika role USER biasa mencoba masuk ke /admin -> redirect ke /beranda
    const userRole = (sessionData?.role || "").toUpperCase();
    const isSuperAdmin = userRole === "SUPER_ADMIN" || userRole === "ADMIN";

    if (!isSuperAdmin) {
      // Role USER dilarang akses /admin, arahkan kembali ke /beranda
      return NextResponse.redirect(new URL("/beranda", request.url));
    }
  }

  // 2. Cek rute terproteksi umum pembeli (/profil, /pesanan, dsb)
  if (isGeneralProtectedRoute) {
    if (!sessionData && !tokenCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua request path kecuali:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, dan assets publik
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
