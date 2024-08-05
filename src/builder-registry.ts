/* eslint-disable no-restricted-properties */
"use client";

import { builder, Builder } from "@builder.io/react";

import Breadcrumb from "./components/breadcrumb/index";
import Counter from "./components/Counter/Counter";
import Footer from "./components/footer_component/index";
import Header from "./components/header_component";
import HeaderMenu from "./components/menu-header/index";
import Topbar from "./components/topbar/index";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(Topbar, {
  name: "Topbar",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(Footer, {
  name: "Footer",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});
Builder.registerComponent(Header, {
  name: "Header",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(HeaderMenu, {
  name: "HeaderMenu",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});
Builder.registerComponent(Breadcrumb, {
  name: "Breadcrumb",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});
