import { Order, Orderer } from "@src/types/order";
import { Product } from "@src/types/product";
import { IncomingWebhook } from "@slack/webhook";

const WEBHOOK_URI = process.env.REACT_APP_WEBHOOK_URI;
const webhook = new IncomingWebhook(WEBHOOK_URI);

export const sendSlackMessage = (
  orderer: Orderer,
  orders: Order[],
  total: number,
  optionKeys: (product: Product) => string[]
) => {
  webhook.send({
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${orderer.name}님 주문정보`,
        },
      },
      { type: "divider" },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `\n>*${orderer.name}*\n>${orderer.phone}\n>${orderer.isShipping ? orderer.address : "현장 결제"}\n>${
              orderer.donation
            }`,
          },
          {
            type: "mrkdwn",
            text: orders
              .map(
                (o) =>
                  `\n>*${o.product.name}* (${optionKeys(o.product)
                    .map((k) => o.options[k])
                    .join(" / ")}) ${o.options.quantity}개`
              )
              .join("\n>"),
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `총 금액: *₩${total}* ${orderer.isShipping ? "(배송비 포함)" : ""}`,
        },
      },
    ],
  });
};
