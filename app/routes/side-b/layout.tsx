import { Outlet } from "react-router";
import PageContainer from "~/components/PageContainer";

export function Layout() {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}

export default function Root() {
  return;
}
