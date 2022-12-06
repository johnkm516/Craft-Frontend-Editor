import { Providers } from './providers'
import EmotionRootStyleRegistry from './RootStyleRegistry';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          <main>
              <Providers>
                <EmotionRootStyleRegistry>
                  {children}
                </EmotionRootStyleRegistry>
              </Providers>
          </main>
        </body>
      </html>
    );
  }

