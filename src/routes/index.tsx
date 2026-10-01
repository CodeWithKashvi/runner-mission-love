import { createFileRoute } from "@tanstack/react-router";
import { MissionExperience } from "../components/mission/MissionExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priyanshu // Mission 05" },
      { name: "description", content: "A classified fifth-month anniversary mission from Kashvi to Priyanshu." },
      { property: "og:title", content: "Priyanshu // Mission 05" },
      { property: "og:description", content: "A classified fifth-month anniversary mission from Kashvi to Priyanshu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MissionExperience />;
}
