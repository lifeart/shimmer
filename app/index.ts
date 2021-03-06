import type { App, Owner } from "@shimmer/core";
import type { Cursor } from "@shimmer/dom";
import type { UrlDetails } from "./router";
import { Router, RoutesWithOwner } from "./router";

function route(owner: Owner): RoutesWithOwner {
  return async function route(url: UrlDetails, cursor: Cursor): Promise<App> {
    switch (url.path) {
      case "/index": {
        let page = await import("./pages/index");
        return page.Main(owner)(cursor);
      }
      case "/material": {
        let page = await import("./pages/material");
        return page.Main(owner)(cursor);
      }
      case "/tutorial": {
        switch (url.params["part"]) {
          case "1":
          case undefined: {
            let page = await import("./pages/tutorial/part1");
            return page.Main(owner)(cursor);
          }
          case "2": {
            let page = await import("./pages/tutorial/part2");
            return page.Main(owner)(cursor);
          }
          case "3": {
            let page = await import("./pages/tutorial/part3");
            return page.Main(owner)(cursor);
          }
          case "4": {
            let page = await import("./pages/tutorial/part4");
            return page.Main(owner)(cursor);
          }
          case "5": {
            let page = await import("./pages/tutorial/part5");
            return page.Main(owner)(cursor);
          }
          default: {
            let page = await import("./pages/error");
            return page.Main(owner)(cursor);
          }
        }
      }

      case "/state": {
        let page = await import("./pages/state/index");
        return page.Main(owner)(cursor);
      }

      default: {
        let page = await import("./pages/fallback");
        return page.Main(owner)(cursor);
      }
    }
  };
}

Router.startForBrowser(route);
