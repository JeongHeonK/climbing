import MeetingForm from "./MeetingForm";

const initialValue = {
  title: "",
  description: "",
  lat: "",
  lng: "",
  date: new Date(),
};

export default function NewGatheringPageScene() {
  const gathering = initialValue;

  return (
    <MeetingForm
      title={gathering.title}
      description={gathering.description}
      lat={gathering.lat}
      lng={gathering.lng}
      date={gathering.date}
    />
  );
}
