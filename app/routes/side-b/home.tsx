import Page from "~/components/Page";
import Container from "~/components/Container";

export default function HomeRoute() {
  return (
    <Page className="flex items-center justify-center">
      <Container>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Side B</h1>
          <h2 className="text-2xl">Under Construction</h2>
          <p className="text-slate-600">Please check back soon.</p>
        </div>
      </Container>
    </Page>
  );
}
