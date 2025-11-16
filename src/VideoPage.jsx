import { useParams } from "react-router-dom";
import VideoComponent from "./VideoComponent";

export default function VideoPage() {
  const { id } = useParams();
  return <VideoComponent movieId={id} />;
}
