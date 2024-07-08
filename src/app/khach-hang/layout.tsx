import type { ReactNode } from "react";
import { headers } from "next/headers";
import Container from "@component/Container";
import Footer from "@component/footer_component";
import Grid from "@component/grid/Grid";
import { Header } from "@component/header_component";
import { MobileNavigationBar } from "@component/mobile-navigation";
import Sticky from "@component/sticky";
import { getAllProductGroups, getCustomer, getMenuNodes } from "@utils/server";

import { StyledAppLayout } from "./styles";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const customerId = new URLSearchParams(
    headers().get("x-url")?.split("?").at(-1),
  ).get("customer");
  const [allcustomer, menuNodes, customer] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
    customerId ? getCustomer(customerId) : undefined,
  ]);

  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={300}>
        <Header
          allProductGroups={allcustomer}
          menuNodes={menuNodes}
          customer={customer}
        />
      </Sticky>

      <MobileNavigationBar />

      <Container
        my="2rem"
        className="flex min-h-[calc(100vh-428px-112px-64px)] flex-col"
      >
        <Grid container spacing={6} className="lg:w-[1280px] lg:px-10">
          <Grid
            item
            md={12}
            xs={25}
            className="xl:!w-4/4 !w-full !px-3 !py-0 lg:!w-[1280px] lg:!px-6"
          >
            <div>{children}</div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
