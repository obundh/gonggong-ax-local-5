import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const imageUrl = `${origin}/series5-og.png`;

  return {
    title: "공공 AX 로컬 5 - 문서 리소스 추출기",
    description: "ZIP 패키지 문서 33종 | 브라우저 로컬 리소스 분류·추출",
    applicationName: "문서 리소스 추출기",
    alternates: {
      canonical: origin,
    },
    openGraph: {
      title: "문서 리소스 추출기",
      description: "ZIP 패키지 문서 33종 | 이미지 · 미디어 · 첨부 · 문서 구조",
      type: "website",
      url: origin,
      images: [
        {
          url: imageUrl,
          width: 1536,
          height: 1024,
          alt: "문서 리소스 추출기",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "문서 리소스 추출기",
      description: "ZIP 패키지 문서 33종 | 브라우저 로컬 처리",
      images: [imageUrl],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f2f4ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
