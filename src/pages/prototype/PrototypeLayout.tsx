import { Navigate, Outlet } from "react-router";
import { BottomNavigation } from "../../components/BottomNavigation";
import { PhoneFrame } from "../../components/PhoneFrame";
import { PrototypeStateProvider, usePrototypeState } from "../../app/PrototypeState";

// Wraps every prototype screen in the phone frame and applies accessibility settings.
export function PrototypeLayout() {
  return (
    <PrototypeStateProvider>
      <PhoneFrame>
        <PhoneScreen />
      </PhoneFrame>
    </PrototypeStateProvider>
  );
}

function PhoneScreen() {
  const { settings } = usePrototypeState();
  return (
    <div
      className="app"
      data-text-size={settings.textSize}
      data-high-contrast={settings.highContrast || undefined}
      data-reduced-motion={settings.reducedMotion || undefined}
    >
      <Outlet />
    </div>
  );
}

// Home, History, Learn, and Settings show the bottom navigation.
// Task flows (checks, results) hide it so the user focuses on one task (spec §8).
export function TabLayout() {
  return (
    <>
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNavigation />
    </>
  );
}

export function TaskLayout() {
  return (
    <main className="app-main">
      <Outlet />
    </main>
  );
}

export function PrototypeIndex() {
  const { onboarded } = usePrototypeState();
  return <Navigate to={onboarded ? "/prototype/home" : "/prototype/onboarding/1"} replace />;
}
