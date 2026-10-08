export const families = [
  {
    id: "groom",
    title: "Groom's Parents",
    fatherLabel: "Father",
    father: "Bhabani Prasad Patnaik",
    motherLabel: "Mother",
    mother: "Sabita Patnaik",
  },
  {
    id: "bride",
    title: "Bride's Parents",
    fatherLabel: "Father",
    father: "Bichitrananda Parija",
    motherLabel: "Mother",
    mother: "Jyotirmayee Parija",
  },
] as const;

export const rsvpContacts = [
  {
    id: "groom",
    title: "RSVP · Groom",
    names: [
      "Bhabani Prasad Patnaik",
      "Sabita Patnaik",
      "Monalisa Patnaik",
      "& Patnaik Family",
    ],
    phones: [{ display: "9337136916", tel: "+919337136916" }],
  },
  {
    id: "bride",
    title: "RSVP · Bride",
    names: [
      "Jyotirmayee Parija",
      "Sushri Pragnya Parija",
      "Bhabani Shankar Parija & Family",
    ],
    phones: [
      { display: "8018607847", tel: "+918018607847" },
      { display: "9178663299", tel: "+919178663299" },
    ],
  },
] as const;
