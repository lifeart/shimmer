import {
  App,
  component,
  fragment,
  Owner,
  Services,
  text,
} from "../../../src/index";
import { Nav } from "../nav";
import { page, PageHooks, RenderOptions, StaticOptions } from "../page";
import { el } from "../utils";
import NewMessageInput from "./part3/new-message-input";
import ReceivedMessage from "./part3/received-message";
import SentMessage from "./part3/sent-message";
import { SubNav } from "./subnav";

interface TutorialState {}

export class TutorialPage implements PageHooks<TutorialState> {
  construct(_owner: Owner<Services>): TutorialState {
    return {};
  }
  render(
    _state: TutorialState,
    { owner }: StaticOptions,
    { cursor }: RenderOptions
  ): App {
    let doc = owner.service("doc");

    return doc.render(Template(owner)(), cursor);
  }
}

export const Main = page(() => new TutorialPage());

const Template = component((owner: Owner) => () => {
  return fragment(
    Nav(owner)(),
    SubNav(owner)(),
    el("div", { class: "tutorial" }, Page(owner)())
  );
});

const Page = component((owner: Owner) => () => {
  return fragment(
    el(
      "div",
      { class: "info" },
      el(
        "a",
        {
          href:
            "https://guides.emberjs.com/release/components/component-arguments-and-html-attributes/",
        },
        text("Component Arguments and HTML Attributes")
      ),
      text(" / "),
      el(
        "a",
        {
          href:
            "https://guides.emberjs.com/release/components/conditional-content/",
        },
        text("Conditional Content")
      )
    ),
    el(
      "div",
      { class: "messages" },
      ReceivedMessage(owner)(),
      SentMessage(owner)(),
      NewMessageInput(owner)()
    )
  );
});
