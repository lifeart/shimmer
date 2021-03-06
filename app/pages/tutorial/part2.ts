import type { App, Owner, Services } from "@shimmer/core";
import { def, fragment, text } from "@shimmer/dsl";
import { Nav } from "../nav";
import { page, PageHooks, RenderOptions, StaticOptions } from "../page";
import { el } from "../utils";
import NewMessageInput from "./part2/new-message-input";
import ReceivedMessage from "./part2/received-message";
import SentMessage from "./part2/sent-message";
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

    return doc.render(Template(undefined, owner.$), cursor);
  }
}

export const Main = page(() => new TutorialPage());

const Template = def(({ $ }) => {
  return fragment($(Nav), $(SubNav), el("div", { class: "tutorial" }, $(Page)));
});

const Page = def(({ $ }) => {
  return fragment(
    el(
      "div",
      { class: "info" },
      el(
        "a",
        {
          href:
            "https://guides.emberjs.com/release/components/introducing-components/",
        },
        text("Introducing Components")
      )
    ),
    el(
      "div",
      { class: "messages" },
      $(ReceivedMessage),
      $(SentMessage),
      $(NewMessageInput)
    )
  );
});
