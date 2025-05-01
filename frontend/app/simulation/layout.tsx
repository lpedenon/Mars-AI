// // app/simulation/layout.tsx
// "use client";

// import { ReactNode } from "react";
// // import { UnityProvider } from "@/components/unity-provider";
// import { SharedUnityContext } from "@/components/shared-unity-context";
// import { useMyUnityContext } from "@/components/unitycontext";

// export default function SimulationLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const unity = useMyUnityContext();
//   return (
//     // <UnityProvider>
//     <SharedUnityContext.Provider value={unity}>
//       {children}
//     </SharedUnityContext.Provider>
//     // </UnityProvider>
//   );
// }
// app/simulation/layout.tsx
"use client";

import { ReactNode } from "react";
import { useMyUnityContext } from "@/components/unitycontext";
import { SharedUnityContext } from "@/components/shared-unity-context";

export default function SimulationLayout({ children }: { children: ReactNode }) {
  const unity = useMyUnityContext();

  // Avoid rendering anything until Unity context is ready
  if (!unity) {
    return null; // or a <Loader />
  }

  return (
    <SharedUnityContext.Provider value={unity}>
      {children}
    </SharedUnityContext.Provider>
  );
}
