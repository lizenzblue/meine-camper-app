import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Header, StationDetail, Loading } from "../components";
import { stationsService } from "../services/stationsService";
import type { Station } from "../types";

export function StationDetailPage() {
  const { stationId } = useParams<{ stationId: string }>();
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch station data
  useEffect(() => {
    if (!stationId) {
      return;
    }

    let isMounted = true;

    const fetchStation = async () => {
      try {
        setLoading(true);
        setError(null);
        const station = await stationsService.getStationById(stationId);

        if (isMounted) {
          setSelectedStation(station);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load station details");
          console.error("Error fetching station:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStation();

    return () => {
      isMounted = false;
    };
  }, [stationId]);

  // Redirect to home if no stationId
  if (!stationId) {
    return <Navigate to="/" replace />;
  }

  const handleChangeStation = () => {
    navigate("/");
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Header onChangeStation={handleChangeStation} />
        <Loading message="Loading station details..." />
      </>
    );
  }

  // Error state
  if (error || !selectedStation) {
    return (
      <>
        <Header onChangeStation={handleChangeStation} />
        <div
          style={{
            color: "#e53e3e",
            padding: "16px",
            textAlign: "center",
            background: "#fed7d7",
            borderRadius: "8px",
            margin: "16px 0",
            border: "1px solid #feb2b2",
          }}
        >
          {error || "Station not found"}
        </div>
      </>
    );
  }

  // Success state
  return (
    <>
      <Header
        stationName={selectedStation.name}
        stationId={selectedStation.id}
        onChangeStation={handleChangeStation}
      />
      <StationDetail station={selectedStation} />
    </>
  );
}
