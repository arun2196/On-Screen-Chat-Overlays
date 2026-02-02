// ============================
// IMAGE TRIGGERS (static cards / gifs)
// ============================
const IMAGE_TRIGGERS = {
  "!sandwich":
    "https://media.discordapp.net/attachments/1467076736201261087/1467076781281640479/Derp_1.png?ex=697f1139&is=697dbfb9&hm=6ba48a41c0f3b677f1c4072ab4bfa208530958890976b840745e292a5009a438&=&format=webp&quality=lossless",
  "!emperor":
    "https://media.discordapp.net/attachments/1467076736201261087/1467106298934988820/for-the-emperor-hammer-and-bolter-ezgif.com-optimize.gif?ex=697f2cb7&is=697ddb37&hm=bdf7f1d4f37ae0b091be2874f216e1263721c82bd2f1734b51f5527b3cf946e2&=",
  "!redfox":
    "https://media.discordapp.net/attachments/1467076736201261087/1467133895425392735/1_1.png?ex=697f466a&is=697df4ea&hm=b5c6e100dc3d71446883b48ba0064a9d326477a9735be85cc337f6a6051f9e68&=&format=webp&quality=lossless",
  "!hurwey":
    "https://media.discordapp.net/attachments/1467076736201261087/1467149409203650789/1.png?ex=697f54dd&is=697e035d&hm=a1743555192c103104afaedbee6f9e0ec0a1a4e9b79c6522b8bc7f61aa9e5c8b&=&format=webp&quality=lossless&width=550&height=178",
  "!petri":
    "https://media.discordapp.net/attachments/1467076736201261087/1467170117250187275/truck-anime-truck.gif?ex=697f6826&is=697e16a6&hm=b69548fd6705f1c46e46a1698843395512846e60503c6f16d82508c3694bc9f0&=",
  "!lurk":
    "https://media.discordapp.net/attachments/1467076736201261087/1467170911827263572/cappy-cappy-nft.gif?ex=697f68e4&is=697e1764&hm=61e11e0aaff33cc3d8c040cbe6b12b03b7e1afa3fc4b942783c59734c91737ed&=&width=466&height=350",
};

// ============================
// IMAGE COOLDOWN
// ============================
const IMAGE_COOLDOWN_MS = 30_000;
const lastImageAt = new Map();

// ============================
// BADGE / PERMISSION HELPERS
// ============================
function hasBadge(tags, badgeName) {
  const badges = String(tags?.badges || "").toLowerCase(); // e.g. "vip/1,subscriber/6"
  return badges.split(",").some((b) => b.trim().startsWith(`${badgeName.toLowerCase()}/`));
}

function isAllowedToTrigger(data) {
  const tags = data?.tags || {};

  const isBroadcaster = String(tags?.badges || "").toLowerCase().includes("broadcaster/");
  const isSub = String(tags?.subscriber) === "1" || hasBadge(tags, "subscriber");
  const isVip = hasBadge(tags, "vip");

  // return isBroadcaster || isMod || isVip || isSub;  // (mods+vip+subs)
  return isBroadcaster || isVip || isSub;              // (vip+subs only)
}

// ============================
// COMMAND NORMALIZATION
// ============================
function normalizeCmd(text) {
  return String(text || "").trim().toLowerCase().split(/\s+/)[0];
}

function canFireImage(cmd) {
  const now = Date.now();
  const last = lastImageAt.get(cmd) || 0;

  if (now - last < IMAGE_COOLDOWN_MS) return false;

  lastImageAt.set(cmd, now);
  return true;
}

function imageFromText(text) {
  const cmd = normalizeCmd(text);
  const url = IMAGE_TRIGGERS[cmd];

  if (!url) return null;
  if (!canFireImage(cmd)) return null;

  return {
    html: `<img class="trigger-image" src="${url}" alt="" aria-hidden="true">`,
    meta: { count: 0, emotesOnly: false, isImage: true },
  };
}

// ============================
// WIDGET STATE
// ============================
let totalMessages = 0;
let messagesLimit = 0;
let nickColor = "user";
let removeSelector;
let addition;
let customNickColor;
let channelName;
let provider;

let animationIn = "bounceIn";
let animationOut = "bounceOut";
let hideAfter = 60;
let hideCommands = "no";
let ignoredUsers = [];

// ============================
// MAIN EVENT HANDLER
// ============================
window.addEventListener("onEventReceived", function (obj) {
  // ----------------------------
  // Widget button testing hook
  // ----------------------------
  if (obj.detail.event.listener === "widget-button") {
    if (obj.detail.event.field === "testMessage") {
      const emulated = new CustomEvent("onEventReceived", {
        detail: {
          listener: "message",
          event: {
            service: "twitch",
            data: {
              time: Date.now(),
              tags: {
                "badge-info": "",
                badges: "moderator/1,partner/1",
                color: "#5B99FF",
                "display-name": "StreamElements",
                emotes: "25:46-50",
                flags: "",
                id: "43285909-412c-4eee-b80d-89f72ba53142",
                mod: "1",
                "room-id": "85827806",
                subscriber: "0",
                "tmi-sent-ts": "1579444549265",
                turbo: "0",
                "user-id": "100135110",
                "user-type": "mod",
              },
              nick: channelName,
              userId: "100135110",
              displayName: channelName,
              displayColor: "#5B99FF",
              badges: [
                {
                  type: "moderator",
                  version: "1",
                  url: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
                  description: "Moderator",
                },
                {
                  type: "partner",
                  version: "1",
                  url: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
                  description: "Verified",
                },
              ],
              channel: channelName,
              text: "Howdy! My name is Bill and I am here to serve Kappa",
              isAction: !1,
              emotes: [
                {
                  type: "twitch",
                  name: "Kappa",
                  id: "25",
                  gif: !1,
                  urls: {
                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0",
                  },
                  start: 46,
                  end: 50,
                },
              ],
              msgId: "43285909-412c-4eee-b80d-89f72ba53142",
            },
            renderedText:
              'Howdy! My name is Bill and I am here to serve <img src="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/25/3.0 4x" title="Kappa" class="emote">',
          },
        },
      });

      window.dispatchEvent(emulated);
    }
    return;
  }

  // ----------------------------
  // Delete events
  // ----------------------------
  if (obj.detail.listener === "delete-message") {
    const msgId = obj.detail.event.msgId;
    $(`.message-row[data-msgid=${msgId}]`).remove();
    return;
  }

  if (obj.detail.listener === "delete-messages") {
    const sender = obj.detail.event.userId;
    $(`.message-row[data-sender=${sender}]`).remove();
    return;
  }

  // ----------------------------
  // Only handle chat messages
  // ----------------------------
  if (obj.detail.listener !== "message") return;

  const data = obj.detail.event.data;

  // Hide commands unless it's one of our image triggers
  if (data.text.startsWith("!") && hideCommands === "yes") {
    const cmd = normalizeCmd(data.text);
    if (IMAGE_TRIGGERS[cmd] && !isAllowedToTrigger(data)) return;
  }

  if (ignoredUsers.indexOf(data.nick) !== -1) return;

  // ----------------------------
  // Build message HTML + meta
  // ----------------------------
  const imagePayload = imageFromText(data.text);

  let message;
  let meta;

  if (imagePayload) {
    message = imagePayload.html;
    meta = imagePayload.meta;
  } else {
    message = attachEmotes(data);
    meta = emoteMetaFromHtml(message);
  }

  // ----------------------------
  // Badges HTML
  // ----------------------------
  let badges = "";

  if (provider === "mixer") {
    data.badges.push({ url: data.avatar });
  }

  for (let i = 0; i < data.badges.length; i++) {
    const badge = data.badges[i];
    badges += `<img alt="" src="${badge.url}" class="badge"> `;
  }

  // Pick a badge URL to show in the bottom-right corner of the bubble
  const cornerBadgeUrl = getCornerBadgeUrl(data.badges);

  // ----------------------------
  // Username HTML
  // ----------------------------
  let username = `${data.displayName}:`;

  if (nickColor === "user") {
    const color =
      data.displayColor !== ""
        ? data.displayColor
        : "#" + md5(username).substr(26);
    username = `<span style="color:${color}">${username}</span>`;
  }

  if (nickColor === "custom") {
    const color = customNickColor;
    username = `<span style="color:${color}">${username}</span>`;
  }

  // ----------------------------
  // Render
  // ----------------------------
  addMessage(
    username,
    badges,
    message,
    data.isAction,
    data.userId,
    data.msgId,
    meta,
    cornerBadgeUrl
  );
});

// ============================
// WIDGET LOAD
// ============================
window.addEventListener("onWidgetLoad", function (obj) {
  const fieldData = obj.detail.fieldData;

  animationIn = fieldData.animationIn;
  animationOut = fieldData.animationOut;
  hideAfter = fieldData.hideAfter;
  messagesLimit = fieldData.messagesLimit;
  nickColor = fieldData.nickColor;
  customNickColor = fieldData.customNickColor;
  hideCommands = fieldData.hideCommands;

  channelName = obj.detail.channel.username;

  fetch(
    `https://api.streamelements.com/kappa/v2/channels/${obj.detail.channel.id}/`
  )
    .then((response) => response.json())
    .then((profile) => {
      provider = profile.provider;
    });

  if (fieldData.alignMessages === "block") {
    addition = "prepend";
    removeSelector = `.message-row:nth-child(n+${messagesLimit + 1})`;
  } else {
    addition = "append";
    removeSelector = `.message-row:nth-last-child(n+${messagesLimit + 1})`;
  }

  ignoredUsers = fieldData.ignoredUsers
    .toLowerCase()
    .replace(" ", "")
    .split(",");
});

// ============================
// EMOTES
// ============================
function attachEmotes(message) {
  let text = html_encode(message.text);
  const data = message.emotes;

  if (typeof message.attachment !== "undefined") {
    if (typeof message.attachment.media !== "undefined") {
      if (typeof message.attachment.media.image !== "undefined") {
        text = `${message.text}<img src="${message.attachment.media.image.src}">`;
      }
    }
  }

  return text.replace(/([^\s]*)/gi, function (_m, key) {
    const result = data.filter((emote) => html_encode(emote.name) === key);

    if (typeof result[0] === "undefined") return key;

    const url = result[0].urls[4] || result[0].urls[2] || result[0].urls[1];

    if (provider === "twitch") {
      return `<img class="emote" src="${url}"/>`;
    }

    if (typeof result[0].coords === "undefined") {
      result[0].coords = { x: 0, y: 0 };
    }

    const x = parseInt(result[0].coords.x);
    const y = parseInt(result[0].coords.y);

    let width = "{emoteSize}px";
    let height = "auto";

    if (provider === "mixer") {
      if (result[0].coords.width) width = `${result[0].coords.width}px`;
      if (result[0].coords.height) height = `${result[0].coords.height}px`;
    }

    return `<div class="emote" style="width: ${width}; height:${height}; display: inline-block; background-image: url(${url}); background-position: -${x}px -${y}px;"></div>`;
  });
}

function html_encode(str) {
  return String(str || "").replace(/[<>"^]/g, function (ch) {
    return "&#" + ch.charCodeAt(0) + ";";
  });
}

/**
 * Decide which badge should appear as the bottom-right "sticker"
 * Priority:
 * 1) subscriber badge (most common)
 * 2) fallback to last badge
 */
function getCornerBadgeUrl(badgesArr) {
  if (!Array.isArray(badgesArr) || badgesArr.length === 0) return "";

  const sub = badgesArr.find(
    (b) => (b.type || "").toLowerCase() === "subscriber"
  );
  if (sub && sub.url) return sub.url;

  const last = badgesArr[badgesArr.length - 1];
  return last && last.url ? last.url : "";
}

function addMessage(
  username,
  badges,
  message,
  isAction,
  uid,
  msgId,
  meta,
  cornerBadgeUrl
) {
  totalMessages += 1;

  let msgClass = "msg-mixed";

  if (meta && meta.emotesOnly) {
    msgClass = "msg-emotes-only";
    if (meta.count >= 4) msgClass += " msg-emotes-many";
  }

  if (meta && meta.isImage) {
    msgClass = "msg-image";
  }

  let actionClass = "";
  if (isAction) actionClass = "action";

  const cornerBadgeHtml = cornerBadgeUrl
    ? `<img class="corner-badge" src="${cornerBadgeUrl}" alt="" aria-hidden="true">`
    : "";

  const element = $.parseHTML(`
    <div data-sender="${uid}" data-msgid="${msgId}" class="message-row {animationIn} animated" id="msg-${totalMessages}">
      <div class="user-box ${actionClass}">${badges}${username}</div>
      <div class="user-message ${actionClass} ${msgClass}">${message}${cornerBadgeHtml}</div>
    </div>
  `);

  if (addition === "append") {
    if (hideAfter !== 999) {
      $(element)
        .appendTo(".main-container")
        .delay(hideAfter * 1000)
        .queue(function () {
          $(this)
            .removeClass(animationIn)
            .addClass(animationOut)
            .delay(1000)
            .queue(function () {
              $(this).remove();
            })
            .dequeue();
        });
    } else {
      $(element).appendTo(".main-container");
    }
  } else {
    if (hideAfter !== 999) {
      $(element)
        .prependTo(".main-container")
        .delay(hideAfter * 1000)
        .queue(function () {
          $(this)
            .removeClass(animationIn)
            .addClass(animationOut)
            .delay(1000)
            .queue(function () {
              $(this).remove();
            })
            .dequeue();
        });
    } else {
      $(element).prependTo(".main-container");
    }
  }

  if (totalMessages > messagesLimit) removeRow();
}

function removeRow() {
  if (!$(removeSelector).length) return;

  if (animationOut !== "none" || !$(removeSelector).hasClass(animationOut)) {
    if (hideAfter !== 999) {
      $(removeSelector).dequeue();
    } else {
      $(removeSelector)
        .addClass(animationOut)
        .delay(1000)
        .queue(function () {
          $(this).remove().dequeue();
        });
    }
    return;
  }

  $(removeSelector).animate(
    { height: 0, opacity: 0 },
    "slow",
    function () {
      $(removeSelector).remove();
    }
  );
}

function emoteMetaFromHtml(html) {
  const count = (html.match(/class="emote"/g) || []).length;

  const withoutEmotes = html
    .replace(/<img[^>]*class="emote"[^>]*>/g, "")
    .replace(/<div[^>]*class="emote"[^>]*>[\s\S]*?<\/div>/g, "")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, "")
    .trim();

  const emotesOnly = count > 0 && withoutEmotes.length === 0;
  return { count, emotesOnly };
}
