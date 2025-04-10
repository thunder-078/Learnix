// app/layout.js

export const metadata = {
  title: "Your App",
  description: "Minimal layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
