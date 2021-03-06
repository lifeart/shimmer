import { def, each, text } from "@shimmer/dsl";
import { Pure } from "@shimmer/reactive";
import MessageData from "./message";

interface MessageData {
  username: string;
  active: boolean;
  localTime?: string;
  content: string;
}

const messages: MessageData[] = [
  {
    username: "Tomster",
    active: true,
    localTime: "4:56pm",
    content: `
      <p>
        Hey Zoey, have you had a chance to look at the EmberConf
        brainstorming doc I sent you?
      </p>
    `,
  },
  {
    username: "Zoey",
    active: true,
    content: `
      <p>Hey!</p>

      <p>
        I love the ideas! I'm really excited about where this year's
        EmberConf is going, I'm sure it's going to be the best one yet.
        Some quick notes:
      </p>

      <ul>
        <li>
          Definitely agree that we should double the coffee budget this
          year (it really is impressive how much we go through!)
        </li>
        <li>
          A blimp would definitely make the venue very easy to find, but
          I think it might be a bit out of our budget. Maybe we could
          rent some spotlights instead?
        </li>
        <li>
          We absolutely will need more hamster wheels, last year's line
          was <em>way</em> too long. Will get on that now before rental
          season hits its peak.
        </li>
      </ul>

      <p>Let me know when you've nailed down the dates!</p>
    `,
  },
];

export default def(({ $ }) => {
  return each(
    messages,
    () => Math.random(),
    (message) =>
      $(MessageData, {
        args: {
          username: Pure.of(() => message.now.username),
          userIsActive: Pure.of(() => message.now.active),
          userLocalTime: Pure.of(() => message.now.localTime),
          isCurrentUser: true,
        },
        blocks: {
          default: text(Pure.of(() => message.now.content)),
        },
      })
  );
});
