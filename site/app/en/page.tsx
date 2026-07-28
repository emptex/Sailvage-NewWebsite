import type { Metadata } from "next";
import SailvagePage from "../sailvage-page";

export const metadata: Metadata = {
  title: "Sailvage | Studio EmpteX",
  description:
    "You are a newly hired UASA field agent assigned to a marine ecosystem restoration project. But you soon discover it is no ordinary environmental mission.",
};

export default function EnglishHome() {
  return <SailvagePage locale="en" />;
}
