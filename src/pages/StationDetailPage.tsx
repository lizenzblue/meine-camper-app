import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Header, StationDetail, Loading } from "../components";
import { stationsService } from "../services/stationsService";
import { useAsyncData } from "../hooks/useAsyncData";
import type { Station } from "../types";

export function StationDetailPage() {
  const { stationId } = useParams<{ stationId: string }>();
  const navigate = useNavigate();
  const {
    data: selectedStation,
    loading,
    error,
    executeAsync,
  } = useAsyncData<Station | null>(null);

  useEffect(() => {
    if (!stationId) {
      return;
    }

    executeAsync(() => stationsService.getStationById(stationId));
  }, [stationId, executeAsync]);

  if (!stationId) {
    return <Navigate to="/" replace />;
  }

  const handleChangeStation = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <>
        <Header onChangeStation={handleChangeStation} />
        <Loading message="Loading station details..." />
      </>
    );
  }

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
