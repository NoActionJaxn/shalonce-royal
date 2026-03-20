import { useState } from "react";
import Container from "~/components/Container";
import Page from "~/components/Page";
import WrestlingBookingForm from "~/components/WrestlingBookingForm";
import MusicPerformanceForm from "~/components/MusicPerformanceForm";
import MediaAppearanceForm from "~/components/MediaAppearanceForm";

type ContactTab = "wrestling" | "music" | "media";

const tabs: { id: ContactTab; label: string }[] = [
  { id: "wrestling", label: "Wrestling bookings" },
  { id: "music", label: "Music performances" },
  { id: "media", label: "Media appearances" },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<ContactTab>("wrestling");

  return (
    <Page>
      <Container className="py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
          <p className="text-sm text-slate-600">
            For wrestling bookings, music performances, and media appearances, please choose the
            appropriate tab below and fill out the form with as much detail as possible.
          </p>
        </header>

        <div className="space-y-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-sm font-medium">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      "relative rounded-full px-4 py-2 transition-colors " +
                      (isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-700 hover:bg-white")
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {activeTab === "wrestling" && <WrestlingBookingForm />}
            {activeTab === "music" && <MusicPerformanceForm />}
            {activeTab === "media" && <MediaAppearanceForm />}
          </div>
        </div>
      </Container>
    </Page>
  );
}
