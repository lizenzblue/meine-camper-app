import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle, ContentWrapper, ErrorBoundary } from "./components";
import { StationListPage, StationDetailPage } from "./pages";
import { BookingProvider } from "./contexts";
import { APP_CONFIG } from "./constants";

export default function App() {
  useEffect(() => {
    document.title = APP_CONFIG.TITLE;
  }, []);

  return (
    <BookingProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <GlobalStyle />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<StationListPage />} />
              <Route
                path="/station/:stationId"
                element={<StationDetailPage />}
              />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<StationListPage />} />
            </Routes>
          </ContentWrapper>
        </ErrorBoundary>
      </BrowserRouter>
    </BookingProvider>
  );
}
