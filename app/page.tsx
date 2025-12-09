import AgentProfileWrapper from "@/components/AgentProfileWrapper";
import LeftSidebar from "@/components/left-sidebar";
import MobileMenu from "@/components/mobile-menu";

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <MobileMenu />
      <div className="flex gap-10 md2:pt-0 pt-12">
        <div className="hidden md2:block">
          <LeftSidebar isMobile={false} />
        </div>
        <AgentProfileWrapper />
      </div>
    </>
  );
}
