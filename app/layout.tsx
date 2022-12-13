import { Providers } from './providers'
import StyledComponentsRegistry from './StyledComponentsRegistry';

//const StyledComponentsRegistry = lazy(() => import('./StyledComponentsRegistry'));

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
                  <StyledComponentsRegistry>
                    {children}
                  </StyledComponentsRegistry>
              </Providers>
          </main>
        </body>
      </html>
    );
  }

